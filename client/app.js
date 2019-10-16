import React from 'react'
import {Navbar} from './components'
import {connect} from 'react-redux'
import Routes from './routes'
import {FirebaseWrapper} from '../server/firebase/firebase'

class App extends React.Component {
  constructor() {
    super()
    //initialize to firebase
    FirebaseWrapper.GetInstance().Initialize()
  }
  render() {
    return (
      <div
        id="app-main"
        className={this.props.editor.darkmode ? 'darkmode' : 'lightmode'}
      >
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapState = state => {
  return {
    editor: state.editor
  }
}

export default connect(mapState)(App)
