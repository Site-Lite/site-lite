import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu, Item, Separator, Submenu} from 'react-contexify'
import {
  selectType,
  createElement,
  removeElement,
  updateStyle
} from '../store/renderer'

// const onClick = () => console.log('event, props')

class EditMenu extends Component {
  constructor() {
    super()
    this.handleRemove = this.handleRemove.bind(this)
  }
  handleAdd(event, element) {
    if (event.srcElement.tagName === 'DIV') {
      this.props.createElement(
        event.target.id === 'main' ? 'main' : Number(event.target.id),
        element
      )
    }
  }

  handleRemove({event}) {
    // console.log('EVENT: ', event)
    // console.log('PARENT: ', event.path[1].id)
    // console.log('ID: ', event.srcElement.id)
    if (event.srcElement.id !== 'main') {
      this.props.removeElement(
        event.path[1].id === 'main' ? 'main' : Number(event.path[1].id),
        Number(event.srcElement.id)
      )
    }
  }

  render() {
    return (
      <Menu id="menu_id">
        <Submenu label="Add" arrow={<i className="fas fa-caret-right" />}>
          <Item
            onClick={({event}) => {
              this.handleAdd(event, 'div')
            }}
          >
            div
          </Item>
          <Item
            onClick={({event}) => {
              this.handleAdd(event, 'p')
            }}
          >
            p
          </Item>
          <Item
            onClick={({event}) => {
              this.handleAdd(event, 'img')
            }}
          >
            img
          </Item>
        </Submenu>
        <Item onClick={this.handleRemove}>Delete</Item>
        <Separator />
        <Item onClick={this.onClick}>Copy Style</Item>
      </Menu>
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
    createElement(id, type) {
      dispatch(createElement(id, type))
    },
    removeElement(id, elementId) {
      dispatch(removeElement(id, elementId))
    },
    updateStyle(id, property, value) {
      dispatch(updateStyle(id, property, value))
    }
  }
}

export default connect(mapState, mapDispatch)(EditMenu)
