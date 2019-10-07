import * as firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from '../../secrets'

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

  async addTemplate(state) {
    try {
      await this._firestore
        .collection('/Users/z5IkB6nkL04Vk0aEgzbF/Templates/')
        .doc()
        .set({
          html: state
        })
      // .then(function(docRef) {
      // console.log("Document written with ID: ", docRef.id);
      // })
    } catch (error) {
      console.log('something went wrong in database for addTemplate ', error)
    }
  }

  async getTemplate() {
    try {
      let state = []
      console.log('here')
      await this._firestore
        .collectionGroup('Templates')
        .get()
        .then(function(snapshot) {
          console.log(snapshot)
          snapshot.forEach(function(doc) {
            console.log(doc.data().html)
            state.push(doc.data().html)
          })
        })
      return state
    } catch (error) {
      console.log('something went wrong in database for getTemplate ', error)
    }
  }
}
