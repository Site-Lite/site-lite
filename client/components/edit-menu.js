/* eslint-disable no-alert */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu, Item, Separator, Submenu, animation} from 'react-contexify'
import {createElement, removeElement, clear} from '../store/renderer'
import {togglePopUp, deselectElement} from '../store/editor'

class EditMenu extends Component {
  handleAdd(event, element) {
    if (event.srcElement.tagName === 'DIV') {
      this.props.createElement(
        event.target.id === 'main' ? 'main' : Number(event.target.id),
        element
      )
    }
  }

  handleRemove(event) {
    if (event.srcElement.id !== 'main') {
      this.props.removeElement(
        event.path[1].id === 'main' ? 'main' : Number(event.path[1].id),
        Number(event.srcElement.id)
      )
    }
  }

  handleEditContent(event) {
    this.props.togglePopUp(
      event.srcElement.id,
      this.props.html[event.srcElement.id].style
    )
  }

  render() {
    return (
      <Menu id="menu_id" animation={animation.fade}>
        <Submenu
          label="Add"
          arrow={<i className="fas fa-caret-right" />}
          disabled={({event}) =>
            event.srcElement.localName !== 'div' ||
            !this.props.editor.editModeEnabled
          }
        >
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
        <Item
          onClick={({event}) => {
            this.handleRemove(event)
          }}
          disabled={({event}) =>
            event.srcElement.id === 'main' || !this.props.editor.editModeEnabled
          }
        >
          Delete
        </Item>
        <Separator />
        <Item
          onClick={({event}) => {
            this.handleEditContent(event)
          }}
          disabled={({event}) =>
            event.srcElement.localName === 'div' ||
            !this.props.editor.editModeEnabled
          }
        >
          Edit Content
        </Item>
        <Separator />
        <Item
          onClick={this.onClick}
          disabled={!this.props.editor.editModeEnabled}
        >
          Copy Style
        </Item>
        <Item
          onClick={this.onClick}
          disabled={!this.props.editor.editModeEnabled}
        >
          Paste Style
        </Item>
        <Separator />
        <Item
          onClick={() => {
            if (
              window.confirm(
                'This will clear your current template. Are you sure you want to continue?'
              )
            ) {
              this.props.clear()
            } else {
              this.onCancel()
            }
          }}
          disabled={!this.props.editor.editModeEnabled}
        >
          Clear Template
        </Item>
      </Menu>
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
    createElement(id, type) {
      dispatch(createElement(id, type))
    },
    removeElement(id, elementId) {
      dispatch(deselectElement())
      dispatch(removeElement(id, elementId))
    },
    togglePopUp(id, style) {
      dispatch(togglePopUp(id, style))
    },
    clear() {
      dispatch(deselectElement())
      dispatch(clear())
    }
  }
}

export default connect(mapState, mapDispatch)(EditMenu)
