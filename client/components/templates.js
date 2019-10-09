import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {FirebaseWrapper} from '../../server/firebase/firebase'
import {setTemplateId} from '../store/renderer'

class Templates extends Component {
  constructor() {
    super()
    this.state = {
      templates: []
    }
  }

  async componentDidMount() {
    const uid = this.props.user.id
    await FirebaseWrapper.GetInstance().templateListener(uid, templates =>
      this.setState({templates})
    )
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.templates &&
          this.state.templates.map(template => {
            return (
              <div key={template.id}>
                <Link
                  to="/editor"
                  onClick={() => {
                    this.props.setTemplateId(template.id)
                  }}
                >
                  Template, {template.id}
                </Link>
              </div>
            )
          })}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})
const mapDispatch = dispatch => ({
  setTemplateId(tid) {
    dispatch(setTemplateId(tid))
  }
})

export default connect(mapState, mapDispatch)(Templates)
