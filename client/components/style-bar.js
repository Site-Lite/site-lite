/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Collapse from '@kunukn/react-collapse'
import {updateStyle, selectElement, togglePopUp} from '../store/editor'
import {applyStyle, createElement} from '../store/renderer'
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

  async handleAdd(element) {
    const html = this.props.html
    const selected = this.props.editor.selectedElement
    if (html[selected].type === 'p' || html[selected].type === 'img') {
      alert(
        "Oops! You can't create a new element here. Please make sure you don't have an image or text selected"
      )
    } else {
      await this.props.createElement(
        this.props.editor.selectedElement === 'main'
          ? 'main'
          : Number(this.props.editor.selectedElement),
        element
      )

      const id = this.props.html.counter - 1
      const style = this.props.html[id].style
      this.props.selectElement(id, style)

      if (element !== 'div') {
        this.props.togglePopUp(id, style)
      }
    }
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
                <span>Flex Ratio</span>
                <select
                  value={this.state.selectedStyle.flex}
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
                  value={this.state.selectedStyle.width}
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
                  value={this.state.selectedStyle.height}
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
                      type="checkbox"
                      onClick={event => {
                        event.target.checked
                          ? this.handleSelect('font-weight', 'bold')
                          : this.handleSelect('font-weight', 'normal')
                      }}
                      checked={
                        this.state.selectedStyle['font-weight'] === 'bold'
                      }
                    />
                    <div className="check" />
                  </div>
                </div>
                <div>
                  <span>Italic</span>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      onClick={event => {
                        event.target.checked
                          ? this.handleSelect('font-style', 'italic')
                          : this.handleSelect('font-style', 'normal')
                      }}
                      checked={
                        this.state.selectedStyle['font-style'] === 'italic'
                      }
                    />
                    <div className="check" />
                  </div>
                </div>
                <div>
                  <span>Underline</span>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      onClick={event => {
                        event.target.checked
                          ? this.handleSelect('text-decoration', 'underline')
                          : this.handleSelect('text-decoration', 'none')
                      }}
                      checked={
                        this.state.selectedStyle['text-decoration'] ===
                        'underline'
                      }
                    />
                    <div className="check" />
                  </div>
                </div>
              </div>
              <div>
                <span>Font</span>
                <select
                  value={this.state.selectedStyle['font-family']}
                  onChange={event => {
                    this.handleSelect('font-family', event.target.value)
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
                  value={this.state.selectedStyle['font-size']}
                  onChange={event => {
                    this.handleSelect('font-size', event.target.value)
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
                  value={this.state.selectedStyle['text-align']}
                  onChange={event => {
                    this.handleSelect('text-align', event.target.value)
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
                  value={this.state.selectedStyle['border-width']}
                  onChange={event => {
                    this.handleSelect('border-width', event.target.value)
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
                  value={this.state.selectedStyle['border-style']}
                  onChange={event => {
                    this.handleSelect('border-style', event.target.value)
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
                  value={this.state.selectedStyle['border-color'] || '#ffffff'}
                  onChange={event => {
                    this.handleSelect('border-color', event.target.value)
                  }}
                />
              </div>
              <div>
                <span>Corner Radius</span>
                <select
                  value={this.state.selectedStyle['border-radius']}
                  onChange={event => {
                    this.handleSelect('border-radius', event.target.value)
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
                  value={this.state.selectedStyle['flex-direction']}
                  onChange={event => {
                    this.handleSelect('flex-direction', event.target.value)
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
                      type="checkbox"
                      onClick={event => {
                        event.target.checked
                          ? this.handleSelect('flex-wrap', 'wrap')
                          : this.handleSelect('flex-wrap', 'nowrap')
                      }}
                      checked={this.state.selectedStyle['flex-wrap'] === 'wrap'}
                    />
                    <div className="check" />
                  </div>
                </div>
                <div>
                  <span>Center X</span>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      onClick={event => {
                        event.target.checked
                          ? this.handleSelect('justify-content', 'center')
                          : this.handleSelect('justify-content', 'initial')
                      }}
                      checked={
                        this.state.selectedStyle['justify-content'] === 'center'
                      }
                    />
                    <div className="check" />
                  </div>
                </div>
                <div>
                  <span>Center Y</span>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      onClick={event => {
                        event.target.checked
                          ? this.handleSelect('align-items', 'center')
                          : this.handleSelect('align-items', 'initial')
                      }}
                      checked={
                        this.state.selectedStyle['align-items'] === 'center'
                      }
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
                  value={
                    this.state.selectedStyle['background-color'] || '#ffffff'
                  }
                  onChange={event => {
                    this.handleSelect('background-color', event.target.value)
                  }}
                />
              </div>
              <div>
                <span>Image Source</span>
                <input
                  type="text"
                  value={
                    this.state.selectedStyle['background-image']
                      ? this.state.selectedStyle['background-image'].slice(
                          4,
                          -1
                        )
                      : ''
                  }
                  onChange={event => {
                    console.log('test')
                    this.handleSelect(
                      'background-image',
                      `url(${event.target.value})`
                    )
                  }}
                />
              </div>
              <div>
                <span>Image Repeat</span>
                <select
                  value={this.state.selectedStyle['background-repeat']}
                  onChange={event => {
                    this.handleSelect('background-repeat', event.target.value)
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
                  value={this.state.selectedStyle['background-size']}
                  onChange={event => {
                    this.handleSelect('background-size', event.target.value)
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
        <div id="add-section">
          <div>
            <span onClick={() => this.handleAdd('div')}>Add container</span>
          </div>
          <div>
            <span onClick={() => this.handleAdd('p')}>Add text</span>
          </div>
          <div>
            <span onClick={() => this.handleAdd('img')}>Add image</span>
          </div>
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
    togglePopUp(id, style) {
      dispatch(togglePopUp(id, style))
    },
    selectElement(id, style) {
      dispatch(selectElement(id, style))
    },
    applyStyle(id, style) {
      dispatch(applyStyle(id, style))
    },
    updateStyle(property, value) {
      dispatch(updateStyle(property, value))
    },
    createElement(id, type) {
      dispatch(createElement(id, type))
    }
  }
}

export default connect(mapState, mapDispatch)(StyleBar)
