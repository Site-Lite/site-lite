const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE'
const TOGGLE_POP_UP = 'TOGGLE_POP_UP'
const SELECT_ELEMENT = 'SELECT_ELEMENT'
const UPDATE_STYLE = 'UPDATE_STYLE'

const initialState = {
  editModeEnabled: true,
  popUpEnabled: false,
  selectedElement: 'main',
  selectedElementStyle: {}
}

export const toggleEditMode = () => ({type: TOGGLE_EDIT_MODE})
export const togglePopUp = (id, style) => ({type: TOGGLE_POP_UP, id, style})
export const selectElement = (id, style) => ({type: SELECT_ELEMENT, id, style})
export const updateStyle = (property, value) => ({
  type: UPDATE_STYLE,
  property,
  value
})

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
        popUpEnabled: !state.popUpEnabled
      }
    case SELECT_ELEMENT:
      return {
        ...state,
        selectedElement: action.id,
        selectedElementStyle: action.style
      }
    case UPDATE_STYLE:
      return {
        ...state,
        selectedElementStyle: {
          ...state.selectedElementStyle,
          [action.property]: action.value
        }
      }
    default:
      return state
  }
}
