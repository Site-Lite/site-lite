import {FirebaseWrapper} from '../../server/firebase/firebase'

const SET_TEMPLATE_ID = 'SET_TEMPLATE_ID'
const SET_NEW_TEMPLATE_ID = 'SET_NEW_TEMPLATE_ID'
const RESET_TEMPLATE_ID = 'RESET_TEMPLATE_ID'

export const setTemplateId = tid => ({
  type: SET_TEMPLATE_ID,
  tid
})

export const setNewTemplateId = tid => ({
  type: SET_NEW_TEMPLATE_ID,
  tid
})

export const resetTemplateId = () => ({
  type: RESET_TEMPLATE_ID
})

export const addedTemplate = (html, uid) => {
  return async dispatch => {
    const id = await FirebaseWrapper.GetInstance().addTemplate(html, uid)
    dispatch(setNewTemplateId(id))
  }
}

const initialState = {templateID: ''}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TEMPLATE_ID:
      return {...state, templateID: action.tid}
    case SET_NEW_TEMPLATE_ID:
      return {...state, templateID: action.tid}
    case RESET_TEMPLATE_ID:
      return initialState
    default:
      return state
  }
}
