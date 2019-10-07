const TOGGLE_BAR = 'TOGGLE_BAR'
const SELECT_ELEMENT = 'SELECT_ELEMENT'

const initialState = {
  enabled: true,
  selectedElement: 'main'
}

export const toggleBar = () => ({type: TOGGLE_BAR})
export const selectElement = id => ({type: SELECT_ELEMENT, id})

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_BAR:
      return {
        ...state,
        enabled: !state.enabled
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
