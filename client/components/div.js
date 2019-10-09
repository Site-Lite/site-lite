/* eslint-disable eqeqeq */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateStyle} from '../store/renderer'
import {selectElement} from '../store/editor'
import {P, Img} from '../components'

class Div extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  update(id, property, value) {
    this.props.updateStyle(id, property, value)
  }

  handleClick(event) {
    if (event.target.id.length) {
      this.props.selectElement(Number(event.target.id))
    }
  }

  render() {
    if (this.props.html[this.props.id]) {
      return (
        <div
          id={this.props.id}
          style={this.props.html[this.props.id].style}
          className={`${this.props.editor.editModeEnabled ? 'edit-mode' : ''} ${
            this.props.editor.selectedElement == this.props.id ? 'selected' : ''
          }`}
          onClick={this.handleClick}
        >
          {this.props.editor.editModeEnabled ? <span>div</span> : ''}
          {this.props.html[this.props.id].children.map(child => {
            switch (this.props.html[child].type) {
              case 'div':
                return (
                  <Div
                    parentId={this.props.id}
                    id={child}
                    key={child}
                    html={this.props.html}
                    editor={this.props.editor}
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
                    editor={this.props.editor}
                    updateStyle={this.props.updateStyle}
                    selectElement={this.props.selectElement}
                  />
                )
              case 'img':
                return (
                  <Img
                    parentId={this.props.id}
                    id={child}
                    key={child}
                    html={this.props.html}
                    editor={this.props.editor}
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
      return <div />
    }
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
    updateStyle(id, property, value) {
      dispatch(updateStyle(id, property, value))
    },
    selectElement(id) {
      dispatch(selectElement(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Div)
