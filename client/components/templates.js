import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FirebaseWrapper} from '../../server/firebase/firebase'

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
    return (
      <div>
        {this.state.templates &&
          this.state.templates.map((template, idx) => {
            return <div key={idx}>Template {idx}</div>
          })}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(Templates)
