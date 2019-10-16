// import axios from 'axios'
import history from '../history'
import {FirebaseWrapper} from '../../server/firebase/firebase'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const RETURN_ERROR = 'RETURN_ERROR'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = (user, uid) => ({type: GET_USER, user, uid})
const returnError = error => ({type: RETURN_ERROR, error})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
// not needed anymore?
// export const me = () => {
//   return dispatch => {
//     try {
//       // const result = await FirebaseWrapper.GetInstance().isLoggedIn()
//       FirebaseWrapper.GetInstance().auth.onAuthStateChanged(user => {
//         console.log('user', user.email)
//         dispatch(getUser(user.email, user.uid))
//       })
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

export const auth = (email, password, method) => {
  return async dispatch => {
    try {
      const result = await FirebaseWrapper.GetInstance().userAuth(
        email,
        password,
        method
      )
      if (result.message) {
        dispatch(returnError(result))
        setTimeout(() => {
          dispatch(returnError({}))
        }, 5000)
      } else {
        dispatch(getUser(result.user, result.id))
        history.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const logout = () => {
  return dispatch => {
    try {
      FirebaseWrapper.GetInstance().signOut()
      dispatch(removeUser())
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {email: action.user, id: action.uid}
    case REMOVE_USER:
      return defaultUser
    case RETURN_ERROR:
      return action.error
    default:
      return state
  }
}
