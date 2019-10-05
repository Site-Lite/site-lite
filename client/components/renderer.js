import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createElement, updateStyle} from '../store/renderer'
import {toggleBar} from '../store/styler'
import {Div, StyleBar} from '../components'

class Renderer extends Component {
  handleAdd(id) {
    this.props.createElement(id)
  }

  update(id, property, value) {
    this.props.updateStyle(id, property, value)
  }

  toggleEditMode() {
    this.props.toggleStyler()
  }

  render() {
    return (
      <div id="editor">
        <div
          id="editor-panel"
          className={this.props.styler.enabled ? 'edit-mode ' : ''}
        >
          <div id="settings-bar">
            <button
              type="button"
              onClick={() => {
                this.toggleEditMode()
              }}
            >
              Edit Mode
            </button>
          </div>
          <div id="renderer" style={this.props.html.main.style}>
            {this.props.styler.enabled ? (
              <div className="edit-buttons">
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
              return (
                <Div
                  parentId="main"
                  id={child}
                  key={child}
                  html={this.props.html}
                  createElement={this.props.createElement}
                  updateStyle={this.props.updateStyle}
                />
              )
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
    createElement(id) {
      dispatch(createElement(id))
    },
    updateStyle(id, property, value) {
      dispatch(updateStyle(id, property, value))
    },
    toggleStyler() {
      dispatch(toggleBar())
    }
  }
}

export default connect(mapState, mapDispatch)(Renderer)
