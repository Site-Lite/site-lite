import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Collapse from '@kunukn/react-collapse'

class StyleBar extends Component {
  constructor() {
    super()
    this.state = {
      content: false,
      spacing: false,
      background: false
    }
  }

  toggleCollapse(section) {
    this.setState(prevState => {
      return {
        ...prevState,
        [section]: !prevState[section]
      }
    })
  }

  render() {
    return (
      <div
        id="style-bar"
        className={this.props.styler.enabled ? 'edit-mode ' : ''}
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
          <Link
            // type="button"
            onClick={() => {
              this.toggleCollapse('content')
            }}
            className="style-section"
          >
            content
          </Link>
          <Collapse isOpen={this.state.content}>
            <h1>content</h1>
          </Collapse>

          <Link
            // type="button"
            onClick={() => {
              this.toggleCollapse('spacing')
            }}
            className="style-section"
          >
            spacing
          </Link>
          <Collapse isOpen={this.state.spacing}>
            <h1>spacing</h1>
          </Collapse>

          <Link
            // type="button"
            onClick={() => {
              this.toggleCollapse('background')
            }}
            className="style-section"
          >
            background
          </Link>
          <Collapse isOpen={this.state.background}>
            <h1>background</h1>
          </Collapse>
        </div>
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
