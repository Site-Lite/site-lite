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

  async getAllTemplates(uid, cb) {
    await FirebaseWrapper.GetInstance().getAllTemplates(uid, templates =>
      this.setState({templates})
    )
  }

  async deleteTemplate(uid, tid) {
    await FirebaseWrapper.GetInstance().deleteTemplate(uid, tid)
  }

  render() {
    console.log('this is the this.props: ', this.props)
    console.log('this is the this.state: ', this.state)
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
                  {template.name}
                </Link>
                <button
                  type="submit"
                  onClick={() => {
                    this.deleteTemplate(this.props.user.id, template.id)
                    // this.setState(prevState =>{
                    //   const newtemps = this.state.templates.filter(temps=>{temps.html.name !== })
                    //   return {
                    //     ...prevState,
                    //     templates: newtemps
                    //   }
                    // })
                  }}
                >
                  Delete
                </button>
              </div>
            )
          })}
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
