import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {FirebaseWrapper} from '../../server/firebase/firebase'
import {setTemplateId} from '../store/template'
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

  async getAllTemplates(uid, cb) {
    await FirebaseWrapper.GetInstance().getAllTemplates(uid, templates =>
      this.setState({templates})
    )
  }

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
  }

  render() {
    // console.log('this is the this.props: ', this.props)
    // console.log('this is the this.state: ', this.state)
    return (
      <div id="template-list">
        <h1>Templates</h1>
        <div>
          {Object.keys(this.state.templates).length ? (
            this.state.templates.map(template => {
              return (
                <div id="template" key={template.id}>
                  <span>{template.name}</span>
                  <Link
                    to="/editor"
                    onClick={() => {
                      this.props.togglePopUpOff()
                      this.props.deselectElement()
                      this.props.setTemplateId(template.id)
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
  }
})

export default connect(mapState, mapDispatch)(Templates)
