import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Swiper, Slide} from 'react-dynamic-swiper'
import {toggleTutorial} from '../store/editor'

class Tutorial extends Component {
  render() {
    return (
      <Swiper
        navigation={true}
        pagination={true}
        loop={true}
        className={
          this.props.editor.tutorialEnabled ? 'tutorial active' : 'tutorial'
        }
        id="tutorial-bg"
        onMouseDown={event => {
          if (event.target.id === 'tutorial-bg') {
            this.props.toggleTutorial()
          }
        }}
      >
        <Slide onActive={swiper => console.log('Slide Active!')}>Test 1</Slide>
        <Slide onActive={swiper => console.log('Slide Active!')}>Test 2</Slide>
        <Slide onActive={swiper => console.log('Slide Active!')}>Test 3</Slide>
      </Swiper>
    )
  }
}

const mapState = state => {
  return {
    editor: state.editor
  }
}
const mapDispatch = dispatch => {
  return {
    toggleTutorial() {
      dispatch(toggleTutorial())
    }
  }
}

export default connect(mapState, mapDispatch)(Tutorial)
