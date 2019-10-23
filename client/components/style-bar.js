/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Collapse from '@kunukn/react-collapse'

import {
  updateStyle,
  selectElement,
  togglePopUp,
  toggleDarkMode
} from '../store/editor'
import {applyStyle, createElement} from '../store/renderer'
import {addToPast, clearFuture} from '../store/undo'

import {
  fontSizes,
  fontFamilies,
  spacing,
  backgroundRepeat,
  backgroundSize,
  borderWidth,
  borderStyle,
  textAlign,
  size,
  flexRatio
} from './select-options'

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
        background: true
      },
      selectedStyle: {}
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.editor.selectedElementStyle !==
      prevProps.editor.selectedElementStyle
    ) {
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
      this.props.editor.selectedElementStyle,
      this.props.html
    )
  }

  handleChange(event) {
    this.setState({input: event.target.value})
    this.props.updateStyle('fontSize', event.target.value + 'px')
  }

  render() {
    return (
      <div
        id="style-bar"
        className={this.props.editor.editModeEnabled ? 'edit-mode ' : ''}
      >
        <div id="style-bar-header">
          <span>Styles</span>
          <i
            className="fas fa-adjust"
            onClick={() => {
              this.props.toggleDarkMode()
            }}
          />
        </div>
        <div id="style-bar-content">
          <div
            onClick={() => {
              this.toggleCollapse('size')
            }}
            className={`${
              this.state.accordion.size
                ? 'style-section active'
                : 'style-section'
            } ${this.props.editor.editModeEnabled ? 'edit-mode ' : ''}`}
          >
            <span>Size</span>
            <i className="fas fa-ruler-combined" />
          </div>
          <Collapse isOpen={this.state.accordion.size}>
            <div>
              <div>
                <span>Fit Container</span>
                <select
                  value={this.state.selectedStyle.flex || '0 auto'}
                  onChange={event => {
                    this.handleSelect('flex', event.target.value)
                  }}
                >
                  {flexRatio.map(flex => {
                    return (
                      <option value={flex} key={flex}>
                        {flex}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>
                <span>Width</span>
                <select
                  value={this.state.selectedStyle.width || 'auto'}
                  onChange={event => {
                    this.handleSelect('width', event.target.value)
                  }}
                >
                  {size.map(width => {
                    return (
                      <option value={width} key={width}>
                        {width}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>
                <span>Height</span>
                <select
                  value={this.state.selectedStyle.height || 'auto'}
                  onChange={event => {
                    this.handleSelect('height', event.target.value)
                  }}
                >
                  {size.map(height => {
                    return (
                      <option value={height} key={height}>
                        {height}
                      </option>
                    )
                  })}
                </select>
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
            } ${this.props.editor.editModeEnabled ? 'edit-mode ' : ''}`}
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
                <div>
                  <span>Bold</span>
                  <div className="checkbox">
                    <input
                      onChange={() => {
                        /**/
                      }}
                      type="checkbox"
                      onClick={event => {
                        event.target.checked
                          ? this.handleSelect('fontWeight', 'bold')
                          : this.handleSelect('fontWeight', 'normal')
                      }}
                      checked={this.state.selectedStyle.fontWeight === 'bold'}
                    />
                    <div className="check" />
                  </div>
                </div>
                <div>
                  <span>Italic</span>
                  <div className="checkbox">
                    <input
                      onChange={() => {
                        /**/
                      }}
                      type="checkbox"
                      onClick={event => {
                        event.target.checked
                          ? this.handleSelect('fontStyle', 'italic')
                          : this.handleSelect('fontStyle', 'normal')
                      }}
                      checked={this.state.selectedStyle.fontStyle === 'italic'}
                    />
                    <div className="check" />
                  </div>
                </div>
                <div>
                  <span>Underline</span>
                  <div className="checkbox">
                    <input
                      onChange={() => {
                        /**/
                      }}
                      type="checkbox"
                      onClick={event => {
                        event.target.checked
                          ? this.handleSelect('textDecoration', 'underline')
                          : this.handleSelect('textDecoration', 'none')
                      }}
                      checked={
                        this.state.selectedStyle.textDecoration === 'underline'
                      }
                    />
                    <div className="check" />
                  </div>
                </div>
              </div>
              <div>
                <span>Font</span>
                <select
                  value={this.state.selectedStyle.fontFamily}
                  onChange={event => {
                    this.handleSelect('fontFamily', event.target.value)
                  }}
                >
                  {fontFamilies.map(font => {
                    return (
                      <option value={font} key={font}>
                        {font}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>
                <span>Size</span>
                <select
                  value={this.state.selectedStyle.fontSize}
                  onChange={event => {
                    this.handleSelect('fontSize', event.target.value)
                  }}
                >
                  {fontSizes.map(size => {
                    return (
                      <option value={`${size}px`} key={size}>
                        {size}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>
                <span>Align</span>
                <select
                  value={this.state.selectedStyle.textAlign}
                  onChange={event => {
                    this.handleSelect('textAlign', event.target.value)
                  }}
                >
                  {textAlign.map(align => {
                    return (
                      <option value={align} key={align}>
                        {align}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>
                <span>Color</span>
                <input
                  type="color"
                  value={this.state.selectedStyle.color || '#ffffff'}
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
            className={`${
              this.state.accordion.border
                ? 'style-section active'
                : 'style-section'
            } ${this.props.editor.editModeEnabled ? 'edit-mode ' : ''}`}
          >
            <span>Border</span>
            <i className="far fa-square" />
          </div>
          <Collapse isOpen={this.state.accordion.border}>
            <div>
              <div>
                <span>Width</span>
                <select
                  value={this.state.selectedStyle.borderWidth || 0}
                  onChange={event => {
                    this.handleSelect('borderWidth', event.target.value)
                  }}
                >
                  {borderWidth.map(width => {
                    return (
                      <option value={`${width}px`} key={width}>
                        {width}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>
                <span>Style</span>
                <select
                  value={this.state.selectedStyle.borderStyle || 'none'}
                  onChange={event => {
                    this.handleSelect('borderStyle', event.target.value)
                  }}
                >
                  {borderStyle.map(style => {
                    return (
                      <option value={style} key={style}>
                        {style}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>
                <span>Color</span>
                <input
                  type="color"
                  value={this.state.selectedStyle.borderColor || '#ffffff'}
                  onChange={event => {
                    this.handleSelect('borderColor', event.target.value)
                  }}
                />
              </div>
              <div>
                <span>Corner Radius</span>
                <select
                  value={this.state.selectedStyle.borderRadius || 0}
                  onChange={event => {
                    this.handleSelect('borderRadius', event.target.value)
                  }}
                >
                  {borderWidth.map(radius => {
                    return (
                      <option value={`${radius}px`} key={radius}>
                        {radius}
                      </option>
                    )
                  })}
                </select>
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
              this.toggleCollapse('spacing')
            }}
            className={`${
              this.state.accordion.spacing
                ? 'style-section active'
                : 'style-section'
            } ${this.props.editor.editModeEnabled ? 'edit-mode ' : ''}`}
          >
            <span>Spacing</span>
            <i className="fas fa-arrows-alt-h" />
          </div>
          <Collapse isOpen={this.state.accordion.spacing}>
            <div>
              <div>
                <span>Margin</span>
                <select
                  value={this.state.selectedStyle.margin}
                  onChange={event => {
                    this.handleSelect('margin', event.target.value)
                  }}
                >
                  {spacing.map(size => {
                    return (
                      <option value={`${size}px`} key={size}>
                        {size}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>
                <span>Padding</span>
                <select
                  value={this.state.selectedStyle.padding}
                  onChange={event => {
                    this.handleSelect('padding', event.target.value)
                  }}
                >
                  {spacing.map(size => {
                    return (
                      <option value={`${size}px`} key={size}>
                        {size}
                      </option>
                    )
                  })}
                </select>
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
            } ${this.props.editor.editModeEnabled ? 'edit-mode ' : ''}`}
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
              <div>
                <span>Flow Direction</span>
                <select
                  value={this.state.selectedStyle.flexDirection}
                  onChange={event => {
                    this.handleSelect('flexDirection', event.target.value)
                  }}
                >
                  <option value="row">row</option>
                  <option value="column">column</option>
                </select>
              </div>
              <div>
                <div>
                  <span>Wrap</span>
                  <div className="checkbox">
                    <input
                      onChange={() => {
                        /**/
                      }}
                      type="checkbox"
                      onClick={event => {
                        event.target.checked
                          ? this.handleSelect('flexWrap', 'wrap')
                          : this.handleSelect('flexWrap', 'nowrap')
                      }}
                      checked={this.state.selectedStyle.flexWrap === 'wrap'}
                    />
                    <div className="check" />
                  </div>
                </div>
                <div>
                  <span>Center X</span>
                  <div className="checkbox">
                    <input
                      onChange={() => {
                        /**/
                      }}
                      type="checkbox"
                      onClick={event => {
                        event.target.checked
                          ? this.handleSelect('justifyContent', 'center')
                          : this.handleSelect('justifyContent', 'initial')
                      }}
                      checked={
                        this.state.selectedStyle.justifyContent === 'center'
                      }
                    />
                    <div className="check" />
                  </div>
                </div>
                <div>
                  <span>Center Y</span>
                  <div className="checkbox">
                    <input
                      onChange={() => {
                        /**/
                      }}
                      type="checkbox"
                      onClick={event => {
                        event.target.checked
                          ? this.handleSelect('alignItems', 'center')
                          : this.handleSelect('alignItems', 'initial')
                      }}
                      checked={this.state.selectedStyle.alignItems === 'center'}
                    />
                    <div className="check" />
                  </div>
                </div>
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
              this.toggleCollapse('background')
            }}
            className={`${
              this.state.accordion.background
                ? 'style-section active'
                : 'style-section'
            } ${this.props.editor.editModeEnabled ? 'edit-mode ' : ''}`}
          >
            <span>Background</span>
            <i className="fas fa-images" />
          </div>
          <Collapse isOpen={this.state.accordion.background}>
            <div>
              <div>
                <span>Color</span>
                <input
                  type="color"
                  value={this.state.selectedStyle.backgroundColor || '#ffffff'}
                  onChange={event => {
                    this.handleSelect('backgroundColor', event.target.value)
                  }}
                />
              </div>
              <div>
                <span>Image Source</span>
                <input
                  type="text"
                  value={
                    this.state.selectedStyle.backgroundImage
                      ? this.state.selectedStyle.backgroundImage.slice(4, -1)
                      : ''
                  }
                  placeholder="URL"
                  onChange={event => {
                    this.handleSelect(
                      'backgroundImage',
                      `url(${event.target.value})`
                    )
                  }}
                />
              </div>
              <div>
                <span>Image Repeat</span>
                <select
                  value={this.state.selectedStyle.backgroundRepeat || 'repeat'}
                  onChange={event => {
                    this.handleSelect('backgroundRepeat', event.target.value)
                  }}
                >
                  {backgroundRepeat.map(option => {
                    return (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>
                <span>Image Size</span>
                <select
                  value={this.state.selectedStyle.backgroundSize || 'auto'}
                  onChange={event => {
                    this.handleSelect('backgroundSize', event.target.value)
                  }}
                >
                  {backgroundSize.map(option => {
                    return (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    )
                  })}
                </select>
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
    toggleDarkMode() {
      dispatch(toggleDarkMode())
    },
    togglePopUp(id, style) {
      dispatch(togglePopUp(id, style))
    },
    selectElement(id, style) {
      dispatch(selectElement(id, style))
    },

    applyStyle(id, style, state) {
      dispatch(applyStyle(id, style))
      dispatch(addToPast(state))
      dispatch(clearFuture())
    },
    updateStyle(property, value) {
      dispatch(updateStyle(property, value))
    },
    createElement(id, type, state) {
      dispatch(createElement(id, type))
      dispatch(addToPast(state))
      dispatch(clearFuture())
    }
  }
}

export default connect(mapState, mapDispatch)(StyleBar)
