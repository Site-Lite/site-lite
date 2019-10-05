import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createElement, updateStyle} from '../store/renderer'
import {toggleBar} from '../store/styler'
import {Div, StyleBar} from '../components'

class Renderer extends Component {
  handleAdd(id) {
    this.props.createElement(id)
    setTimeout(() => {
      console.log(this.props.html)
    }, 0)
  }

  update(id, property, value) {
    this.props.updateStyle(id, property, value)
    setTimeout(() => {
      console.log(this.props.html)
    }, 0)
  }

  toggleEditMode() {
    this.props.toggleStyler()
    setTimeout(() => {
      console.log(this.props.styler)
    }, 0)
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
            <button
              type="button"
              onClick={() => {
                this.handleAdd('main')
              }}
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                this.update('main', 'background', 'wheat')
              }}
            >
              Change style
            </button>
            {this.props.html.main.children.map(child => {
              return (
                <Div
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
