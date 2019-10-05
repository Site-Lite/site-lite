import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createElement, updateStyle} from '../store/renderer'
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

  render() {
    return (
      <div id="editor">
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
        <StyleBar />
      </div>
    )
  }
}

const mapState = state => {
  return {
    html: state.renderer
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

export default connect(mapState, mapDispatch)(Renderer)
