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
        .set({email: email, id: uid, templates: []})

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
          id: results.user.uid
          // ,templates: results.users.templates
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
      await this._firestore
        .collection(`/Users/${uid}/Templates`)
        .doc()
        .set({
          html: state
        })

      const templates = []

      await this._firestore
        .collection(`/Users/${uid}/Templates`)
        .get()
        .then(function(snapshot) {
          snapshot.forEach(function(doc) {
            // const newTemp = {...doc.data(), doc.id}
            templates.push(doc.id)
          })
        })

      console.log('this is the uid: ', uid)
      console.log('this is the templates', templates)

      await this._firestore
        .collection(`/Users`)
        .doc(uid)
        .update(
          {templates: templates} // this is where you want to include the template id
        )

      // return the new template ID. and then save it to the store in the component that it is being called from
    } catch (error) {
      console.log('something went wrong in database for addTemplate ', error)
    }
  }

  async getTemplate(uid = 'nimBjUzPVyeWT2qXcgnpqxXhdY62') {
    try {
      let state = []
      await this._firestore
        .collection(`Users/${uid}/Templates`)
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

  async templateListener(uid, cb) {
    try {
      await this._firestore
        .collection(`Users/${uid}/Templates`)
        .onSnapshot(querySnapshot => {
          let container = []
          querySnapshot.forEach(doc => {
            container.push(doc.data())
          })
          return cb(container)
        })
    } catch (err) {
      console.error(err)
    }
  }
}
