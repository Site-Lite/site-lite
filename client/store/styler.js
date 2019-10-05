const TOGGLE_BAR = 'TOGGLE_BAR'

const initialState = {
  enabled: true
}

export const toggleBar = () => ({type: TOGGLE_BAR})

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_BAR:
      return {
        ...state,
        enabled: !state.enabled
      }
    default:
      return state
  }
}
