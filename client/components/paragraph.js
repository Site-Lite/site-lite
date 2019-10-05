import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  selectType,
  createElement,
  removeElement,
  updateStyle
} from '../store/renderer'
import {selectElement} from '../store/styler'

class P extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleAdd(id) {
    this.props.createElement(id)
  }

  handleRemove(parentId, id) {
    this.props.removeElement(parentId, id)
  }

  update(id, property, value) {
    this.props.updateStyle(id, property, value)
  }

  handleClick(event) {
    if (event.target.id.length) {
      this.props.selectElement(Number(event.target.id))
    }
  }

  handleSelect(event) {
    this.props.selectType(event.target.value)
  }

  render() {
    if (this.props.html[this.props.id]) {
      return (
        <p
          id={this.props.id}
          style={this.props.html[this.props.id].style}
          className={this.props.styler.enabled ? 'edit-mode' : ''}
          onClick={this.handleClick}
        >
          {this.props.styler.enabled ? <span>p</span> : ''}
          {this.props.styler.enabled ? (
            <div className="edit-buttons">
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
        </p>
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
    selectType(type) {
      dispatch(selectType(type))
    },
    createElement(id) {
      dispatch(createElement(id))
    },
    updateStyle(id, property, value) {
      dispatch(updateStyle(id, property, value))
    },
    removeElement(id, elementId) {
      dispatch(removeElement(id, elementId))
    },
    selectElement(id) {
      dispatch(selectElement(id))
    }
  }
}

export default connect(mapState, mapDispatch)(P)
