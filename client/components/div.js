import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createElement, removeElement, updateStyle} from '../store/renderer'

class Div extends Component {
  handleAdd(id) {
    this.props.createElement(id)
  }

  handleRemove(parentId, id) {
    this.props.removeElement(parentId, id)
  }

  update(id, property, value) {
    this.props.updateStyle(id, property, value)
  }

  render() {
    if (this.props.html[this.props.id]) {
      return (
        <div
          id={this.props.id}
          style={this.props.html[this.props.id].style}
          className={this.props.styler.enabled ? 'edit-mode' : ''}
        >
          {this.props.styler.enabled ? <span>div</span> : ''}
          {this.props.styler.enabled ? (
            <div className="edit-buttons">
              <button
                type="button"
                onClick={() => {
                  this.handleAdd(this.props.id)
                }}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => {
                  this.handleRemove(this.props.parentId, this.props.id)
                }}
              >
                ×
              </button>
              <button
                type="button"
                onClick={() => {
                  this.update(this.props.id, 'background-color', 'wheat')
                }}
              >
                style
              </button>
            </div>
          ) : (
            ''
          )}
          {this.props.html[this.props.id].children.map(child => {
            return (
              <Div
                parentId={this.props.id}
                id={child}
                key={child}
                html={this.props.html}
                styler={this.props.styler}
                createElement={this.props.createElement}
                removeElement={this.props.removeElement}
                updateStyle={this.props.updateStyle}
              />
            )
          })}
        </div>
      )
    } else {
      return <p>Hello</p>
    }
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
    removeElement(id, elementId) {
      dispatch(removeElement(id, elementId))
    }
  }
}

export default connect(mapState, mapDispatch)(Div)
