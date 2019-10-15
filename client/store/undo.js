///////////////
// ACTION TYPES
///////////////
const UNDO = 'UNDO'
const REDO = 'REDO'
const ADD_TO_PAST = 'ADD_TO_PAST'
const CLEAR_UNDO = 'CLEAR_UNDO'

///////////////
// ACTION CREATORS
///////////////
export const undo = state => ({
  type: UNDO,
  state
})
export const redo = state => ({
  type: REDO,
  state
})
export const addToPast = state => ({
  type: ADD_TO_PAST,
  state
})
export const clearUndo = () => ({
  type: CLEAR_UNDO
})

///////////////
// INITIAL STATE
///////////////
const initialState = {
  past: [],
  future: []
}

///////////////
// REDUCER REDUCER REDUCER
///////////////
export default function(state = initialState, action) {
  switch (action.type) {
    case UNDO:
      if (state.past.length > 0) {
        const newPast = state.past.slice(0, state.past.length - 1)
        return {
          ...state,
          past: [...newPast],
          future: [action.state, ...state.future]
        }
      } else {
        break
      }
    case REDO:
      if (state.future.length > 0) {
        const newFuture = state.future.slice(1)
        return {
          ...state,
          past: [...state.past, action.state],
          future: [...newFuture]
        }
      } else {
        break
      }
    case ADD_TO_PAST:
      return {
        ...state,
        past: [...state.past, action.state]
      }
    case CLEAR_UNDO:
      return initialState

    default:
      return {...state}
  }
}
