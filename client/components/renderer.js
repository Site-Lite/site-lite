/* eslint-disable no-alert */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {MenuProvider} from 'react-contexify'
import {toast} from 'react-toastify'

import {setState, clear, createElement} from '../store/renderer'
import {addedTemplate, resetTemplateId} from '../store/template'
import {undo, redo, addToPast, clearUndo, clearFuture} from '../store/undo'
import {
  selectElement,
  toggleEditMode,
  deselectElement,
  togglePopUp,
  toggleName,
  toggleTutorial
} from '../store/editor'

import {
  Div,
  P,
  Img,
  PopUp,
  StyleBar,
  EditMenu,
  Tutorial,
  SetName
} from '../components'

import {FirebaseWrapper} from '../../server/firebase/firebase'

class Renderer extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    if (this.props.templateID) {
      const state = await FirebaseWrapper.GetInstance().getTemplate(
        this.props.user.id,
        this.props.templateID
      )
      this.props.setState(state)
    }
  }

  async addTemplate(state, uid) {
    await FirebaseWrapper.GetInstance().addTemplate(state, uid)
  }

  async updateTemplate(uid, tid, state) {
    await FirebaseWrapper.GetInstance().updateTemplate(uid, tid, state)
  }

  toggleEditMode() {
    this.props.toggleStyler()
  }

  handleClick(event) {
    if (event.target.id.length) {
      this.props.selectElement(
        event.target.id,
        this.props.html[event.target.id].style,
        this.props.html[event.target.id].content
      )
    }
  }

  download() {
    const top = '<html><head></head><body><div id="main">'
    const middle = document.getElementById('main').innerHTML
    const bottom =
      '<div style="font-size:12px; font-family: Arial;">Built with sitelite</div></div></body></html>'
    const full = top + middle + bottom
    const link = document.createElement('a')
    const name = this.props.templateName.replace(' ', '_')

    link.setAttribute('download', `${name}.html`)
    link.setAttribute(
      'href',
      'data:text/html;charset=utf-8,' + encodeURIComponent(full)
    )
    link.click()
  }

  nameTemplate() {
    if (this.props.user.id) {
      if (this.props.templateID) {
        this.updateTemplate(
          this.props.user.id,
          this.props.templateID,
          this.props.html
        )
        toast.success('Template Saved!')
      } else {
        this.props.toggleName()
      }
    } else {
      alert('Please log in to save your template!')
    }
  }

  async handleAdd(element) {
    const html = this.props.html
    const selected = this.props.editor.selectedElement
    if (html[selected].type === 'p' || html[selected].type === 'img') {
      alert(
        "Oops! You can't create a new element here. Please make sure you don't have an image or paragraph element selected"
      )
    } else {
      await this.props.createElement(
        this.props.editor.selectedElement === 'main'
          ? 'main'
          : Number(this.props.editor.selectedElement),
        element,
        this.props.html
      )

      const id = this.props.html.counter - 1
      const style = this.props.html[id].style
      this.props.selectElement(id, style)

      if (element !== 'div') {
        this.props.togglePopUp(id, style)
      }
    }
  }

  render() {
    // console.log('props', this.props)
    // console.log('state', this.state)
    return (
      <div id="editor">
        <div
          id="editor-panel"
          className={this.props.editor.editModeEnabled ? 'edit-mode ' : ''}
        >
          <div id="settings-bar">
            <div>
              <div>
                <span>Edit Mode</span>
                <div
                  className="switch"
                  onClick={() => {
                    this.toggleEditMode()
                  }}
                >
                  <input
                    type="checkbox"
                    checked={this.props.editor.editModeEnabled}
                    onChange={() => {
                      /**/
                    }}
                  />
                  <div className="slider" />
                </div>
              </div>
              <div
                className={
                  this.props.editor.editModeEnabled
                    ? 'undo-redo'
                    : 'undo-redo hidden'
                }
              >
                <i
                  className={
                    this.props.past.length
                      ? 'fas fa-reply'
                      : 'fas fa-reply disabled'
                  }
                  onClick={() => {
                    if (this.props.past.length) {
                      this.props.setState(
                        this.props.past[this.props.past.length - 1]
                      )
                      this.props.undo(this.props.html)
                    }
                    // undo the last action
                  }}
                />
                <i
                  className={
                    this.props.future.length
                      ? 'fas fa-share'
                      : 'fas fa-share disabled'
                  }
                  onClick={() => {
                    if (this.props.future.length) {
                      this.props.setState(this.props.future[0])
                      this.props.redo(this.props.html)
                    }
                    // redo the last action
                  }}
                />
              </div>
              <div
                id="add-section"
                className={
                  this.props.editor.editModeEnabled ? 'edit-mode ' : ''
                }
              >
                <span onClick={() => this.handleAdd('div')}>Add Container</span>
                <span onClick={() => this.handleAdd('p')}>Add Paragraph</span>
                <span onClick={() => this.handleAdd('img')}>Add Image</span>
              </div>
            </div>
            <div>
              <a
                href="#"
                onClick={() => {
                  if (
                    window.confirm(
                      'You will lose your current template. Are you sure you want to start a new template?'
                    )
                  ) {
                    this.props.newTemplate()
                  } else {
                    this.onCancel()
                  }
                }}
                className={
                  this.props.editor.editModeEnabled
                    ? 'new-template'
                    : 'new-template hidden'
                }
              >
                New Template
              </a>
              <a href="#" onClick={() => this.nameTemplate()}>
                Save Template
              </a>
              <a
                href="#"
                onClick={() => this.download()}
                className={
                  this.props.editor.editModeEnabled
                    ? 'download hidden'
                    : 'download'
                }
              >
                Download
              </a>
            </div>
          </div>
          <MenuProvider id="menu_id">
            <div
              id="main"
              style={this.props.html.main.style}
              onClick={this.handleClick}
            >
              {this.props.html.main.children.map(child => {
                switch (this.props.html[child].type) {
                  case 'div':
                    return <Div parentId="main" id={child} key={child} />
                  case 'p':
                    return <P parentId="main" id={child} key={child} />
                  case 'img':
                    return <Img parentId="main" id={child} key={child} />
                  default:
                }
              })}
            </div>
          </MenuProvider>
          <EditMenu />
          <PopUp />
          <Tutorial />
          <SetName />
          <div
            id="help-button"
            onClick={() => {
              this.props.toggleTutorial()
            }}
          >
            <i className="fas fa-question-circle" />
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
    user: state.user,
    editor: state.editor,
    templateID: state.template.templateID,
    templateName: state.template.templateName,
    past: state.undo.past,
    future: state.undo.future
  }
}

const mapDispatch = dispatch => {
  return {
    toggleStyler() {
      dispatch(toggleEditMode())
    },
    toggleName() {
      dispatch(toggleName())
    },
    selectElement(id, style, content) {
      dispatch(selectElement(id, style, content))
    },
    setState(state) {
      dispatch(setState(state))
    },
    addNewTemplateId(html, uid, name) {
      dispatch(addedTemplate(html, uid, name))
    },
    newTemplate() {
      dispatch(deselectElement())
      dispatch(clear())
      dispatch(resetTemplateId())
      dispatch(clearUndo())
    },
    createElement(id, type, state) {
      dispatch(createElement(id, type))
      dispatch(addToPast(state))
      dispatch(clearFuture())
    },
    togglePopUp(id, style) {
      dispatch(togglePopUp(id, style))
    },
    toggleTutorial() {
      dispatch(toggleTutorial())
    },
    undo(state) {
      dispatch(deselectElement())
      dispatch(undo(state))
    },
    redo(state) {
      dispatch(deselectElement())
      dispatch(redo(state))
    }
  }
}

export default connect(mapState, mapDispatch)(Renderer)
