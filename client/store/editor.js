const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE'
const TOGGLE_POP_UP = 'TOGGLE_POP_UP'
const SELECT_ELEMENT = 'SELECT_ELEMENT'

const initialState = {
  editModeEnabled: true,
  popUpEnabled: false,
  selectedElement: 'main'
}

export const toggleEditMode = () => ({type: TOGGLE_EDIT_MODE})
export const togglePopUp = id => ({type: TOGGLE_POP_UP, id})
export const selectElement = id => ({type: SELECT_ELEMENT, id})

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
        popUpEnabled: !state.popUpEnabled
      }
    case SELECT_ELEMENT:
      return {
        ...state,
        selectedElement: action.id
      }
    default:
      return state
  }
}
