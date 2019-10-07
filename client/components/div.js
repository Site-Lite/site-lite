import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  selectType,
  createElement,
  removeElement,
  updateStyle
} from '../store/renderer'
import {selectElement} from '../store/styler'
import {P} from '../components'

class Div extends Component {
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
        <div
          id={this.props.id}
          style={this.props.html[this.props.id].style}
          className={`${this.props.styler.enabled ? 'edit-mode' : ''} ${
            this.props.styler.selectedElement == this.props.id ? 'selected' : ''
          }`}
          onClick={this.handleClick}
        >
          {this.props.styler.enabled ? <span>div</span> : ''}
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
            switch (this.props.html[child].type) {
              case 'div':
                return (
                  <Div
                    parentId={this.props.id}
                    id={child}
                    key={child}
                    html={this.props.html}
                    styler={this.props.styler}
                    selectType={this.props.selectType}
                    createElement={this.props.createElement}
                    removeElement={this.props.removeElement}
                    updateStyle={this.props.updateStyle}
                    selectElement={this.props.selectElement}
                  />
                )
              case 'p':
                return (
                  <P
                    parentId={this.props.id}
                    id={child}
                    key={child}
                    html={this.props.html}
                    styler={this.props.styler}
                    selectType={this.props.selectType}
                    createElement={this.props.createElement}
                    removeElement={this.props.removeElement}
                    updateStyle={this.props.updateStyle}
                    selectElement={this.props.selectElement}
                  />
                )
              default:
            }
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

export default connect(mapState, mapDispatch)(Div)
