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
          <div
            onClick={() => {
              this.toggleCollapse('size')
            }}
            className={
              this.state.size ? 'style-section active' : 'style-section'
            }
          >
            <span>Size</span>
            <i className="fas fa-ruler-combined" />
          </div>
          <Collapse isOpen={this.state.size}>
            <div>Test</div>
          </Collapse>
          <div
            onClick={() => {
              this.toggleCollapse('text')
            }}
            className={
              this.state.text ? 'style-section active' : 'style-section'
            }
          >
            <span>Text</span>
            <i className="fas fa-font" />
          </div>
          <Collapse isOpen={this.state.text}>
            <div>Test</div>
          </Collapse>
          <div
            onClick={() => {
              this.toggleCollapse('border')
            }}
            className={
              this.state.border ? 'style-section active' : 'style-section'
            }
          >
            <span>Border</span>
            <i className="far fa-square" />
          </div>
          <Collapse isOpen={this.state.border}>
            <div>Test</div>
          </Collapse>
          <div
            onClick={() => {
              this.toggleCollapse('spacing')
            }}
            className={
              this.state.spacing ? 'style-section active' : 'style-section'
            }
          >
            <span>Spacing</span>
            <i className="fas fa-arrows-alt-h" />
          </div>
          <Collapse isOpen={this.state.spacing}>
            <div>Test</div>
          </Collapse>
          <div
            onClick={() => {
              this.toggleCollapse('formatting')
            }}
            className={
              this.state.formatting ? 'style-section active' : 'style-section'
            }
          >
            <span>Formatting</span>
            <i className="fas fa-table" />
          </div>
          <Collapse isOpen={this.state.formatting}>
            <div>Test</div>
          </Collapse>
          <div
            onClick={() => {
              this.toggleCollapse('background')
            }}
            className={
              this.state.background ? 'style-section active' : 'style-section'
            }
          >
            <span>Background</span>
            <i className="fas fa-images" />
          </div>
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
