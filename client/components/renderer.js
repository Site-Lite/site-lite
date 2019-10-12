/* eslint-disable no-alert */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {MenuProvider} from 'react-contexify'

import {Div, P, Img, PopUp, StyleBar, EditMenu} from '../components'
import {setState, clear} from '../store/renderer'
import {selectElement, toggleEditMode, deselectElement} from '../store/editor'
import {addedTemplate, resetTemplateId} from '../store/template'
import {undo, redo} from '../store/undo'

import {FirebaseWrapper} from '../../server/firebase/firebase'

const ConditionalWrapper = ({condition, children}) =>
  condition ? (
    <MenuProvider id="menu_id">{children}</MenuProvider>
  ) : (
    <div>{children}</div>
  )

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
        this.props.html[event.target.id].style
      )
    }
  }

  download() {
    const top = '<html><head></head><body><div id="main"'
    const middle = document.getElementById('main').innerHTML
    const bottom = '</div></body></html>'
    const full = top + middle + bottom
    const link = document.createElement('a')

    link.setAttribute('download', 'fileName.html')
    link.setAttribute(
      'href',
      'data:text/html;charset=utf-8,' + encodeURIComponent(full)
    )
    link.click()
  }

  nameTemplate() {
    if (this.props.templateID) {
      this.updateTemplate(
        this.props.user.id,
        this.props.templateID,
        this.props.html
      )
    } else {
      const templateName = prompt('Name your template')
      // console.log('prompt', templateName)
      this.props.addNewTemplateId(
        this.props.html,
        this.props.user.id,
        templateName
      )
    }
  }

  render() {
    return (
      <div id="editor">
        <div
          id="editor-panel"
          className={this.props.editor.editModeEnabled ? 'edit-mode ' : ''}
        >
          <div id="settings-bar">
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
                />
                <div className="slider" />
              </div>
            </div>
            <div>
              <div className="undo-redo">
                <i
                  className="fas fa-undo-alt"
                  onClick={() => {
                    if (this.props.past) {
                      this.props.setState(
                        this.props.past[this.props.past.length - 1]
                      )
                      this.props.undo(this.props.html)
                    }
                    // undo the last action
                  }}
                />
                <i
                  className="fas fa-redo-alt"
                  onClick={() => {
                    if (this.props.future) {
                      this.props.setState(this.props.future[0])
                      this.props.redo(this.props.html)
                    }
                    // redo the last action
                  }}
                />
              </div>
              <Link
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
              >
                New Template
              </Link>
              <Link onClick={() => this.nameTemplate()}>Save Template</Link>
              <Link
                onClick={() => this.download()}
                className={
                  this.props.editor.editModeEnabled
                    ? 'download hidden'
                    : 'download'
                }
              >
                Download
              </Link>
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
    past: state.undo.past,
    future: state.undo.future
  }
}

const mapDispatch = dispatch => {
  return {
    toggleStyler() {
      dispatch(toggleEditMode())
    },
    selectElement(id, style) {
      dispatch(selectElement(id, style))
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
    },
    undo(state) {
      dispatch(undo(state))
    },
    redo(state) {
      dispatch(redo(state))
    }
  }
}

export default connect(mapState, mapDispatch)(Renderer)
