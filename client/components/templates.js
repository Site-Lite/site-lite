import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {FirebaseWrapper} from '../../server/firebase/firebase'
import {setTemplateId} from '../store/template'

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

  render() {
    console.log(this.props)
    console.log(this.state)
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
                      this.props.setTemplateId(template.id)
                    }}
                  >
                    <button type="button">Open in Editor</button>
                  </Link>
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
  }
})

export default connect(mapState, mapDispatch)(Templates)
