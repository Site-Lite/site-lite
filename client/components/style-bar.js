import React, {Component} from 'react'
import {connect} from 'react-redux'

class StyleBar extends Component {
  render() {
    return (
      <div
        id="style-bar"
        className={this.props.styler.enabled ? 'edit-mode ' : ''}
      >
        <p>Selected Element: {this.props.styler.selectedElement}</p>
        <p>
          Element Type:
          {this.props.html[this.props.styler.selectedElement].type}
        </p>
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
