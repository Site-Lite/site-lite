import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectType, createElement, updateStyle} from '../store/renderer'
import {selectElement, toggleBar} from '../store/styler'
import {Div, P, StyleBar} from '../components'

class Renderer extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleAdd(id) {
    this.props.createElement(id)
  }

  update(id, property, value) {
    this.props.updateStyle(id, property, value)
  }

  toggleEditMode() {
    this.props.toggleStyler()
  }

  handleClick(event) {
    if (event.target.id.length) {
      this.props.selectElement(event.target.id)
    }
  }

  handleSelect(event) {
    this.props.selectType(event.target.value)
  }

  render() {
    return (
      <div id="editor">
        <div
          id="editor-panel"
          className={this.props.styler.enabled ? 'edit-mode ' : ''}
        >
          <div id="settings-bar">
            <span>Edit Mode</span>
            <div
              className="switch"
              onClick={() => {
                this.toggleEditMode()
              }}
            >
              <input type="checkbox" checked={this.props.styler.enabled} />
              <div className="slider" />
            </div>
          </div>
          <div
            id="main"
            style={this.props.html.main.style}
            onClick={this.handleClick}
          >
            {this.props.styler.enabled ? (
              <div className="edit-buttons">
                <select name="elementType" onChange={this.handleSelect}>
                  <option value="div">div</option>
                  <option value="p">p</option>
                  <option value="p">img</option>
                </select>
                <button
                  type="button"
                  onClick={() => {
                    this.handleAdd('main')
                  }}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.update('main', 'background-color', 'wheat')
                  }}
                >
                  style
                </button>
              </div>
            ) : (
              ''
            )}
            {this.props.html.main.children.map(child => {
              switch (this.props.html[child].type) {
                case 'div':
                  return <Div parentId="main" id={child} key={child} />
                case 'p':
                  return <P parentId="main" id={child} key={child} />
                default:
              }
            })}
          </div>
        </div>
        <StyleBar />
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
    selectType(type) {
      dispatch(selectType(type))
    },
    createElement(id) {
      dispatch(createElement(id))
    },
    updateStyle(id, property, value) {
      dispatch(updateStyle(id, property, value))
    },
    toggleStyler() {
      dispatch(toggleBar())
    },
    selectElement(id) {
      dispatch(selectElement(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Renderer)
