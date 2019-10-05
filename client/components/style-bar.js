import React, {Component} from 'react'
import {connect} from 'react-redux'

class StyleBar extends Component {
  render() {
    return (
      <div
        id="style-bar"
        className={this.props.styler.enabled ? 'edit-mode ' : ''}
      >
        STYLEBAR
      </div>
    )
  }
}

const mapState = state => {
  return {
    html: state.renderer,
    styler: state.styler
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
