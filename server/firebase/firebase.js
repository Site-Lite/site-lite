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

  async createUser(email, uid) {
    try {
      await this._firestore
        .collection('Users')
        .doc(uid)
        .set({
          email: email,
          id: uid,
          templates: []
        })

      return uid
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
        // console.log(results.user)
        return {
          user: results.user.email,
          id: results.user.uid,
          templates: results.user.templates
        }
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
          const uid = await this.createUser(email, results.user.uid)
          return {user: results.user.email, id: uid}
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  async isLoggedIn() {
    try {
      return await this.auth.onAuthStateChanged(user => {
        if (user) {
          return {user: user.email, id: user.uid}
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  signOut = () => {
    this.auth.signOut()
  }

  async addTemplate(state, uid) {
    try {
      const ref = await this._firestore
        .collection(`/Users/${uid}/Templates`)
        .doc()

      await ref.set({
        html: state,
        id: ref.id
      })

      const templates = []
      await this._firestore
        .collection(`/Users/${uid}/Templates`)
        .get()
        .then(function(snapshot) {
          snapshot.forEach(function(doc) {
            templates.push(doc.id)
          })
        })

      await this._firestore
        .collection(`/Users`)
        .doc(uid)
        .update({templates: templates})

      return ref.id
    } catch (error) {
      console.log('something went wrong in database for addTemplate ', error)
    }
  }

  // tid is needed to be gotten from state.
  async updateTemplate(uid, tid, state) {
    try {
      await this._firestore
        .collection(`/Users/${uid}/Templates`)
        .doc(tid)
        .update({
          html: state
        })
    } catch (error) {
      console.log('something went wrong in database for updateTemplate ', error)
    }
  }

  //for testing only
  async getTemplate(uid = 'z5IkB6nkL04Vk0aEgzbF', tid) {
    try {
      const template = await this._firestore
        .collection(`Users/${uid}/Templates`)
        .doc(tid)
        .get()

      return template.data().html
    } catch (error) {
      console.log('something went wrong in database for getTemplate ', error)
    }
  }

  async getAllTemplates(uid, cb) {
    try {
      let tempRef = this._firestore.collection(`Users/${uid}/Templates`)
      let activeRef = await tempRef.get()
      let container = []
      for (activeRef of activeRef.docs) {
        container.push(activeRef.data())
      }
      return cb(container)
    } catch (err) {
      console.error(err)
    }
  }
}
