/* eslint-disable no-alert */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu, Item, Separator, Submenu, animation} from 'react-contexify'

import {togglePopUp, deselectElement, storeStyle} from '../store/editor'
import {addToPast, clearUndo} from '../store/undo'
import {
  createElement,
  removeElement,
  clear,
  applyStyle
} from '../store/renderer'

class EditMenu extends Component {
  handleAdd(event, element) {
    if (event.target.tagName === 'DIV') {
      this.props.createElement(
        event.target.id === 'main' ? 'main' : Number(event.target.id),
        element,
        this.props.html
      )
      setTimeout(() => {
        const lastChildId = this.props.html[event.target.id].children[
          this.props.html[event.target.id].children.length - 1
        ]

        if (this.props.html[lastChildId].type !== 'div') {
          this.props.togglePopUp(
            lastChildId,
            this.props.html[lastChildId].style,
            this.props.html[lastChildId].content
          )
        }
      }, 0)
    }
  }

  handleRemove(event) {
    if (event.target.id !== 'main') {
      this.props.removeElement(
        event.target.parentNode.id === 'main'
          ? 'main'
          : Number(event.target.parentNode.id),
        Number(event.target.id)
      )
    }
  }

  handleEditContent(event) {
    this.props.togglePopUp(
      event.target.id,
      this.props.html[event.target.id].style,
      this.props.html[event.target.id].content
    )
  }

  handleCopyStyle(event) {
    this.props.storeStyle(this.props.html[event.target.id].style)
  }

  handlePasteStyle(event) {
    if (Object.keys(this.props.editor.storedStyle).length) {
      console.log('you hit this')
      this.props.applyStyle(event.target.id, this.props.editor.storedStyle)
    }
  }

  render() {
    return (
      <Menu id="menu_id" animation={animation.fade}>
        <Submenu
          label="Add"
          arrow={<i className="fas fa-caret-right" />}
          disabled={({event}) =>
            event.target.localName !== 'div' ||
            !this.props.editor.editModeEnabled
          }
        >
          <Item
            onClick={({event}) => {
              this.handleAdd(event, 'div')
            }}
          >
            <span>container</span>
            <span>&lt;div/&gt;</span>
          </Item>
          <Item
            onClick={({event}) => {
              this.handleAdd(event, 'p')
            }}
          >
            <span>paragraph</span>
            <span>&lt;p/&gt;</span>
          </Item>
          <Item
            onClick={({event}) => {
              this.handleAdd(event, 'img')
            }}
          >
            <span>image</span>
            <span>&lt;img/&gt;</span>
          </Item>
        </Submenu>
        <Item
          onClick={({event}) => {
            this.handleRemove(event)
          }}
          disabled={({event}) =>
            event.target.id === 'main' || !this.props.editor.editModeEnabled
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
            event.target.localName === 'div' ||
            !this.props.editor.editModeEnabled
          }
        >
          Edit Content
        </Item>
        <Separator />
        <Item
          onClick={({event}) => {
            this.handleCopyStyle(event)
          }}
          disabled={!this.props.editor.editModeEnabled}
        >
          Copy Style
        </Item>
        <Item
          onClick={({event}) => {
            this.handlePasteStyle(event)
          }}
          disabled={
            !Object.keys(this.props.editor.storedStyle).length ||
            !this.props.editor.editModeEnabled
          }
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
    createElement(id, type, state) {
      dispatch(createElement(id, type))
      dispatch(addToPast(state))
    },
    removeElement(id, elementId, state) {
      dispatch(deselectElement())
      dispatch(removeElement(id, elementId))
      dispatch(addToPast(state))
    },
    togglePopUp(id, style, content) {
      dispatch(togglePopUp(id, style, content))
    },
    clear() {
      dispatch(deselectElement())
      dispatch(clear())
      dispatch(clearUndo())
    },
    storeStyle(style) {
      dispatch(storeStyle(style))
    },
    applyStyle(id, style) {
      dispatch(applyStyle(id, style))
    }
  }
}

export default connect(mapState, mapDispatch)(EditMenu)
