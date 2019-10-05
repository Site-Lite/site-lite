const CREATE_ELEMENT = 'CREATE_ELEMENT'
const UPDATE_STYLE = 'UPDATE_STYLE'

const initialState = {
  counter: 1,
  styleEnabled: true,
  main: {style: {color: '#282e31'}, children: []}
}

export const createElement = id => ({type: CREATE_ELEMENT, id})
export const updateStyle = (id, property, value) => ({
  type: UPDATE_STYLE,
  id,
  property,
  value
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
          style: {background: '#f5f5f5'},
          children: []
        }
      }
    case UPDATE_STYLE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          style: {...state[action.id].style, [action.property]: action.value}
        }
      }
    default:
      return state
  }
}
