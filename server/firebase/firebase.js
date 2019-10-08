import * as firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from '../../secrets'
import 'firebase/auth'

export class FirebaseWrapper {
  constructor() {
    this.initialized = false
    this._firebaseInstance = null // instance of our npm package
    this._firebaseWrapperInstance = null // instance of our wrapper
    this._firestore = null
  }

  Initialize() {
    if (!this.initialized) {
      // initialize firebase
      this._firebaseInstance = firebase.initializeApp(
        firebaseConfig.firebaseConfig
      )
      this._firestore = firebase.firestore()
      this.initialized = true
      this.auth = firebase.auth()
      console.log('It worked! :D')
    } else {
      console.log('already initialized!')
    }
  }

  static GetInstance() {
    if (null == this._firebaseWrapperInstance) {
      this._firebaseWrapperInstance = new FirebaseWrapper()
    } else {
      // Already initialized, nothing more to do here
    }

    return this._firebaseWrapperInstance
  }

  async createUser(email) {
    try {
      const ref = this._firestore.collection('Users').doc()

      await ref.set({email: email, id: ref.id, templates: []})

      return ref.id
    } catch (err) {
      console.error(err)
    }
  }

  async userAuth(email, password, method) {
    if (method === 'login') {
      try {
        const results = await this.auth.signInWithEmailAndPassword(
          email,
          password
        )
        return results.user.email
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        const results = await this.auth.createUserWithEmailAndPassword(
          email,
          password
        )

        if (results) {
          const uid = await this.createUser(email)
          return {user: results.user.email, id: uid}
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  signOut = () => {
    this.auth.signOut()
  }

  async addTemplate(state, uid) {
    try {
      await this._firestore
        .collection(`/Users/z5IkB6nkL04Vk0aEgzbF/Templates/`)
        .doc()
        .set({
          html: state
        })
    } catch (error) {
      console.log('something went wrong in database for addTemplate ', error)
    }
  }

  async getTemplate() {
    try {
      let state = []
      await this._firestore
        .collectionGroup('Templates')
        .get()
        .then(function(snapshot) {
          snapshot.forEach(function(doc) {
            state.push(doc.data().html)
          })
        })
      return state
    } catch (error) {
      console.log('something went wrong in database for getTemplate ', error)
    }
  }
}
