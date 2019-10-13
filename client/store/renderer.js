/* eslint-disable complexity */
const CREATE_ELEMENT = 'CREATE_ELEMENT'
const REMOVE_ELEMENT = 'REMOVE_ELEMENT'
const APPLY_STYLE = 'APPLY_STYLE'
const SET_STATE = 'SET_STATE'
const SET_CONTENT = 'SET_CONTENT'
const CLEAR = 'CLEAR'

const initialState = {
  counter: 1,
  main: {style: {}, children: []}
}
export const createElement = (id, elementType) => ({
  type: CREATE_ELEMENT,
  id,
  elementType
})
export const removeElement = (id, elementId) => ({
  type: REMOVE_ELEMENT,
  id,
  elementId
})
export const applyStyle = (id, style) => ({
  type: APPLY_STYLE,
  id,
  style
})
export const setState = state => ({
  type: SET_STATE,
  state
})
export const setContent = (id, content) => ({
  type: SET_CONTENT,
  id,
  content
})
export const clear = () => ({
  type: CLEAR
})

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ELEMENT:
      return {
        ...state,
        counter: state.counter + 1,
        [action.id]: {
          ...state[action.id],
          children: [...state[action.id].children, state.counter]
        },
        [state.counter]: {
          type: action.elementType,
          content: '',
          style:
            action.elementType === 'div'
              ? {
                  display: 'flex',
                  flex: 1,
                  'flex-direction': 'row',
                  margin: '20px',
                  padding: '20px'
                }
              : action.elementType === 'p'
                ? {
                    flex: 1,
                    'font-size': '16px',
                    'font-family': 'Arial',
                    'text-align': 'left',
                    color: '#7f868b',
                    margin: '20px',
                    padding: '20px'
                  }
                : {margin: '20px'},
          children: []
        }
      }
    case REMOVE_ELEMENT:
      state[action.elementId].children.forEach(child => {
        delete state[child]
      })
      delete state[action.elementId]
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          children: state[action.id].children.filter(child => {
            return child !== action.elementId
          })
        }
      }
    case APPLY_STYLE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          style: action.style
        }
      }
    case SET_STATE:
      return action.state
    case SET_CONTENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          content: action.content
        }
      }
    case CLEAR:
      return initialState
    default:
      return state
  }
}
