/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Collapse from '@kunukn/react-collapse'
import {updateStyle} from '../store/editor'
import {applyStyle} from '../store/renderer'

class StyleBar extends Component {
  constructor() {
    super()
    this.state = {
      accordion: {
        size: false,
        text: false,
        border: false,
        spacing: false,
        formatting: false,
        background: false
      },
      selectedStyle: {}
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.editor.selectedElementStyle !==
      prevProps.editor.selectedElementStyle
    ) {
      console.log(this.state.selectedStyle)
      this.setState(prevState => {
        return {
          ...prevState,
          selectedStyle: this.props.editor.selectedElementStyle
        }
      })
    }
  }

  toggleCollapse(section) {
    this.setState(prevState => {
      return {
        ...prevState,
        accordion: {
          size: false,
          text: false,
          border: false,
          spacing: false,
          formatting: false,
          background: false,
          [section]: !prevState.accordion[section]
        }
      }
    })
  }

  handleSelect(selectType, value) {
    this.props.updateStyle(selectType, value)
  }

  applyStyle() {
    this.props.applyStyle(
      this.props.editor.selectedElement,
      this.props.editor.selectedElementStyle
    )
  }

  handleChange(event) {
    this.setState({input: event.target.value})
    this.props.updateStyle('font-size', event.target.value + 'px')
  }

  render() {
    return (
      <div
        id="style-bar"
        className={this.props.editor.editModeEnabled ? 'edit-mode ' : ''}
      >
        <div id="style-bar-header">
          <span>Styles</span>
        </div>
        <div id="style-bar-content">
          <div
            onClick={() => {
              this.toggleCollapse('size')
            }}
            className={
              this.state.accordion.size
                ? 'style-section active'
                : 'style-section'
            }
          >
            <span>Size</span>
            <i className="fas fa-ruler-combined" />
          </div>
          <Collapse isOpen={this.state.accordion.size}>
            <div>Test</div>
          </Collapse>
          <div
            onClick={() => {
              this.toggleCollapse('text')
            }}
            className={`${
              this.state.accordion.text
                ? 'style-section active'
                : 'style-section'
            } ${
              this.props.html[this.props.editor.selectedElement].type !== 'p'
                ? 'hidden'
                : ''
            }`}
          >
            <span>Text</span>
            <i className="fas fa-font" />
          </div>
          <Collapse
            isOpen={
              this.state.accordion.text &&
              this.props.html[this.props.editor.selectedElement].type === 'p'
            }
          >
            <div>
              <div>
                <span>Font</span>
                <select
                  value={this.state.selectedStyle['font-family']}
                  onChange={event => {
                    this.handleSelect('font-family', event.target.value)
                  }}
                >
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Palatino">Palatino</option>
                </select>
              </div>
              <div>
                <span>Size</span>
                <select
                  value={this.state.selectedStyle['font-size']}
                  onChange={event => {
                    this.handleSelect('font-size', event.target.value)
                  }}
                >
                  {[8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 48, 72].map(
                    size => {
                      return (
                        <option value={`${size}px`} key={size}>
                          {size}
                        </option>
                      )
                    }
                  )}
                </select>
              </div>
              <div>
                <span>Color</span>
                <input
                  type="color"
                  value={this.state.selectedStyle.color}
                  onChange={event => {
                    this.handleSelect('color', event.target.value)
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  this.applyStyle()
                }}
              >
                Apply
              </button>
            </div>
          </Collapse>
          <div
            onClick={() => {
              this.toggleCollapse('border')
            }}
            className={
              this.state.accordion.border
                ? 'style-section active'
                : 'style-section'
            }
          >
            <span>Border</span>
            <i className="far fa-square" />
          </div>
          <Collapse isOpen={this.state.accordion.border}>
            <div>Test</div>
          </Collapse>
          <div
            onClick={() => {
              this.toggleCollapse('spacing')
            }}
            className={
              this.state.accordion.spacing
                ? 'style-section active'
                : 'style-section'
            }
          >
            <span>Spacing</span>
            <i className="fas fa-arrows-alt-h" />
          </div>
          <Collapse isOpen={this.state.accordion.spacing}>
            <div>Test</div>
          </Collapse>
          <div
            onClick={() => {
              this.toggleCollapse('formatting')
            }}
            className={`${
              this.state.accordion.text
                ? 'style-section active'
                : 'style-section'
            } ${
              this.props.html[this.props.editor.selectedElement].type !== 'div'
                ? 'hidden'
                : ''
            }`}
          >
            <span>Formatting</span>
            <i className="fas fa-table" />
          </div>
          <Collapse
            isOpen={
              this.state.accordion.formatting &&
              this.props.html[this.props.editor.selectedElement].type === 'div'
            }
          >
            <div>
              <span>Column</span>
              <input
                type="checkbox"
                onClick={event => {
                  event.target.checked
                    ? this.handleSelect('flex-direction', 'column')
                    : this.handleSelect('flex-direction', 'row')
                }}
              />
              <span>Row</span>
              <button
                type="button"
                onClick={() => {
                  this.applyStyle()
                }}
              >
                Apply
              </button>
            </div>
          </Collapse>
          <div
            onClick={() => {
              this.toggleCollapse('background')
            }}
            className={
              this.state.accordion.background
                ? 'style-section active'
                : 'style-section'
            }
          >
            <span>Background</span>
            <i className="fas fa-images" />
          </div>
          <Collapse isOpen={this.state.accordion.background}>
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
    editor: state.editor
  }
}

const mapDispatch = dispatch => {
  return {
    applyStyle(id, style) {
      dispatch(applyStyle(id, style))
    },
    updateStyle(property, value) {
      dispatch(updateStyle(property, value))
    }
  }
}

export default connect(mapState, mapDispatch)(StyleBar)
