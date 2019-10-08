import React, {Component} from 'react'
import {connect} from 'react-redux'
import Collapse from '@kunukn/react-collapse'

class StyleBar extends Component {
  constructor() {
    super()
    this.state = {
      size: false,
      text: false,
      border: false,
      spacing: false,
      formatting: false,
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
          <span
            onClick={() => {
              this.toggleCollapse('size')
            }}
            className="style-section"
          >
            Size
          </span>
          <Collapse isOpen={this.state.size}>
            <div>Test</div>
          </Collapse>
          <span
            onClick={() => {
              this.toggleCollapse('text')
            }}
            className="style-section"
          >
            Text
          </span>
          <Collapse isOpen={this.state.text}>
            <div>Test</div>
          </Collapse>
          <span
            onClick={() => {
              this.toggleCollapse('border')
            }}
            className="style-section"
          >
            Border
          </span>
          <Collapse isOpen={this.state.border}>
            <div>Test</div>
          </Collapse>
          <span
            onClick={() => {
              this.toggleCollapse('spacing')
            }}
            className="style-section"
          >
            Spacing
          </span>
          <Collapse isOpen={this.state.spacing}>
            <div>Test</div>
          </Collapse>
          <span
            onClick={() => {
              this.toggleCollapse('formatting')
            }}
            className="style-section"
          >
            Formatting
          </span>
          <Collapse isOpen={this.state.formatting}>
            <div>Test</div>
          </Collapse>
          <span
            onClick={() => {
              this.toggleCollapse('background')
            }}
            className="style-section"
          >
            Background
          </span>
          <Collapse isOpen={this.state.background}>
            <div>Test</div>
          </Collapse>
          <span className="style-section" />
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
