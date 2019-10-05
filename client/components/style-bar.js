import React, {Component} from 'react'
import {connect} from 'react-redux'

class StyleBar extends Component {
  render() {
    return <div id="style-bar">STYLEBAR</div>
  }
}

const mapState = state => {
  return {
    html: state.renderer
  }
}

const mapDispatch = dispatch => {
  return {
    createElement(id) {
      dispatch(createElement(id))
    },
    updateStyle(id, property, value) {
      dispatch(updateStyle(id, property, value))
    }
  }
}

export default connect(mapState, mapDispatch)(StyleBar)
