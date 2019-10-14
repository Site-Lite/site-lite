/* eslint-disable complexity */
const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE'
const TOGGLE_POP_UP = 'TOGGLE_POP_UP'
const TOGGLE_POP_UP_OFF = 'TOGGLE_POP_UP_OFF'
const TOGGLE_TUTORIAL = 'TOGGLE_TUTORIAL'
const TOGGLE_NAME = 'TOGGLE_NAME'
const SELECT_ELEMENT = 'SELECT_ELEMENT'
const UPDATE_STYLE = 'UPDATE_STYLE'
const DESELECT_ELEMENT = 'DESELECT_ELEMENT'
const STORE_STYLE = 'STORE_STYLE'

const initialState = {
  editModeEnabled: true,
  popUpEnabled: false,
  tutorialEnabled: false,
  nameEnabled: false,
  selectedElement: 'main',
  selectedElementStyle: {},
  selectedElementContent: '',
  storedStyle: {}
}

export const toggleEditMode = () => ({type: TOGGLE_EDIT_MODE})
export const togglePopUp = (id, style, content) => ({
  type: TOGGLE_POP_UP,
  id,
  style,
  content
})
export const togglePopUpOff = () => ({type: TOGGLE_POP_UP_OFF})
export const toggleTutorial = () => ({type: TOGGLE_TUTORIAL})
export const toggleName = () => ({type: TOGGLE_NAME})
export const selectElement = (id, style, content) => ({
  type: SELECT_ELEMENT,
  id,
  style,
  content
})
export const updateStyle = (property, value) => ({
  type: UPDATE_STYLE,
  property,
  value
})
export const deselectElement = () => ({type: DESELECT_ELEMENT})
export const storeStyle = style => ({type: STORE_STYLE, style})

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EDIT_MODE:
      return {
        ...state,
        editModeEnabled: !state.editModeEnabled
      }
    case TOGGLE_POP_UP:
      return {
        ...state,
        selectedElement: action.id,
        selectedElementStyle: action.style,
        selectedElementContent: action.content,
        popUpEnabled: true
      }
    case TOGGLE_POP_UP_OFF:
      return {
        ...state,
        popUpEnabled: false
      }
    case TOGGLE_NAME:
      return {
        ...state,
        nameEnabled: !state.nameEnabled
      }
    case TOGGLE_TUTORIAL:
      return {
        ...state,
        tutorialEnabled: !state.tutorialEnabled
      }
    case SELECT_ELEMENT:
      return {
        ...state,
        selectedElement: action.id,
        selectedElementStyle: action.style,
        selectedElementContent: action.content
      }
    case UPDATE_STYLE:
      return {
        ...state,
        selectedElementStyle: {
          ...state.selectedElementStyle,
          [action.property]: action.value
        }
      }
    case DESELECT_ELEMENT:
      return {
        ...state,
        selectedElement: 'main',
        selectedElementStyle: {},
        selectedElementContent: ''
      }
    case STORE_STYLE:
      return {
        ...state,
        storedStyle: action.style
      }
    default:
      return state
  }
}
