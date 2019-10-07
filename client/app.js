import React from 'react'
import {Navbar} from './components'
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
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

export default App
