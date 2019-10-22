import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {FirebaseWrapper} from '../../server/firebase/firebase'
import {
  setTemplateId,
  setTemplateName,
  resetTemplateId
} from '../store/template'
import {deselectElement, togglePopUpOff} from '../store/editor'

class Templates extends Component {
  constructor() {
    super()
    this.state = {
      templates: []
    }
  }

  async componentDidMount() {
    const uid = this.props.user.id
    await FirebaseWrapper.GetInstance().getAllTemplates(uid, templates =>
      this.setState({templates})
    )
  }

  // async getAllTemplates(uid, cb) {
  //   await FirebaseWrapper.GetInstance().getAllTemplates(uid, templates =>
  //     this.setState({templates})
  //   )
  // }

  async deleteTemplate(uid, tid) {
    await FirebaseWrapper.GetInstance().deleteTemplate(uid, tid)
    this.setState(prevState => {
      return {
        ...prevState,
        templates: prevState.templates.filter(temp => {
          return temp.id !== tid
        })
      }
    })
    this.props.resetTemplateId()
  }

  render() {
    return (
      <div id="template-list">
        <div>
          <h1>Templates</h1>
          <span>{this.props.user.email}</span>
        </div>
        <div>
          {Object.keys(this.state.templates).length ? (
            this.state.templates.map(template => {
              return (
                <div id="template" key={template.id}>
                  <span>{template.name}</span>
                  <div>
                    <Link
                      to="/editor"
                      onClick={() => {
                        this.props.togglePopUpOff()
                        this.props.deselectElement()
                        this.props.setTemplateId(template.id)
                        this.props.setTemplateName(template.name)
                      }}
                    >
                      <button type="button">Open in Editor</button>
                    </Link>
                    <button
                      type="submit"
                      onClick={() => {
                        this.deleteTemplate(this.props.user.id, template.id)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            <div id="no-template">
              <span>You do not have any saved templates!</span>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  template: state.template
})
const mapDispatch = dispatch => ({
  setTemplateId(tid) {
    dispatch(setTemplateId(tid))
  },
  deselectElement() {
    dispatch(deselectElement())
  },
  togglePopUpOff() {
    dispatch(togglePopUpOff())
  },
  setTemplateName(name) {
    dispatch(setTemplateName(name))
  },
  resetTemplateId() {
    dispatch(resetTemplateId())
  }
})

export default connect(mapState, mapDispatch)(Templates)
