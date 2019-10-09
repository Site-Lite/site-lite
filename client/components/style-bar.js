import React, {Component} from 'react'
import {connect} from 'react-redux'

class StyleBar extends Component {
  render() {
    return (
      <div
        id="style-bar"
        className={this.props.editor.editModeEnabled ? 'edit-mode ' : ''}
      >
        <div id="style-bar-header">
          <span>
            Styles <i className="fas fa-palette" />
          </span>
        </div>
        <div id="style-bar-content">
          {/* <p>Selected Element: {this.props.styler.selectedElement}</p>
          <p>
            Element Type:
            {this.props.html[this.props.styler.selectedElement].type}
          </p> */}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    html: state.renderer,
    editor: state.editor
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
