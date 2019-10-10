import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {setState} from '../store/renderer'
import {selectElement, toggleEditMode} from '../store/editor'
import {Div, P, Img, PopUp, StyleBar, EditMenu} from '../components'

import {FirebaseWrapper} from '../../server/firebase/firebase'
import {addedTemplate} from '../store/template'

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
    const state = await FirebaseWrapper.GetInstance().getTemplate() //For testing
    this.props.setState(state[0]) //For Testing
  }

  async addTemplate(state, uid) {
    await FirebaseWrapper.GetInstance().addTemplate(state, uid)
    // console.log(this.props.user)
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
              <Link
                onClick={() =>
                  this.props.templateID
                    ? this.updateTemplate(
                        this.props.user.id,
                        this.props.templateID,
                        this.props.html
                      )
                    : this.props.addNewTemplateId(
                        this.props.html,
                        this.props.user.id
                      )
                }
              >
                Save Template
              </Link>
              <Link>Download</Link>
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
    templateID: state.template.templateID
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
    addNewTemplateId(html, uid) {
      dispatch(addedTemplate(html, uid))
    }
  }
}

export default connect(mapState, mapDispatch)(Renderer)
