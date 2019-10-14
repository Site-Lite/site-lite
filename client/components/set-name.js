import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toggleName} from '../store/editor'
import {FirebaseWrapper} from '../../server/firebase/firebase'
import {addedTemplate} from '../store/template'
import {toast} from 'react-toastify'

class SetName extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }
  async addTemplate(state, uid) {
    await FirebaseWrapper.GetInstance().addTemplate(state, uid)
  }

  handleChange(event) {
    this.setState({name: event.target.value})
  }

  render() {
    return (
      <div
        className={
          this.props.editor.nameEnabled ? 'set-name active' : 'set-name'
        }
        id="set-name-bg"
        onMouseDown={event => {
          if (event.target.id === 'set-name-bg') {
            this.props.toggleName()
          }
        }}
      >
        <div>
          <div>
            <span>Name Your Template</span>
            <input
              value={this.state.name}
              type="text"
              placeholder="Template Name"
              onChange={event => {
                this.handleChange(event)
              }}
            />
          </div>
          <button
            type="submit"
            value="Submit"
            onClick={() => {
              this.props.addNewTemplateId(
                this.props.html,
                this.props.user.id,
                this.state.name
              )
              this.props.toggleName()
              this.setState({
                name: ''
              })
              toast.success('Template Saved!')
            }}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    html: state.renderer,
    user: state.user,
    editor: state.editor
  }
}
const mapDispatch = dispatch => {
  return {
    addNewTemplateId(html, uid, name) {
      dispatch(addedTemplate(html, uid, name))
    },
    toggleName() {
      dispatch(toggleName())
    }
  }
}

export default connect(mapState, mapDispatch)(SetName)
