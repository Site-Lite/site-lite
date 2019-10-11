import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setContent} from '../store/renderer'
import {togglePopUpOff} from '../store/editor'

class PopUp extends Component {
  constructor() {
    super()
    this.state = {
      content: ''
    }
    this.renderSwitch = this.renderSwitch.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(evt) {
    this.setState({content: evt.target.value})
  }
  handleKey(evt) {
    if (evt.key === 'Enter') {
      this.props.setContent(
        this.props.editor.selectedElement,
        this.state.content
      )
    }
  }
  renderSwitch(parameter) {
    switch (parameter) {
      case 'img':
        return (
          <div>
            <span>Edit Image URL</span>
            <input
              name="content"
              value={this.state.content}
              type="text"
              placeholder="URL"
              onChange={this.handleChange}
            />
          </div>
        )
      case 'p':
        return (
          <div>
            <span>Edit Text</span>
            <textarea
              name="content"
              value={this.state.content}
              type="text"
              placeholder="Content"
              onChange={this.handleChange}
            />
          </div>
        )
      default:
        return <div />
    }
  }
  render() {
    return (
      <div
        className={this.props.editor.popUpEnabled ? 'popup active' : 'popup'}
        id="popup-bg"
        onMouseDown={event => {
          if (event.target.id === 'popup-bg') {
            this.props.togglePopUpOff()
          }
        }}
      >
        <div>
          {this.renderSwitch(
            this.props.html[this.props.editor.selectedElement].type
          )}
          <button
            type="submit"
            value="Submit"
            onClick={() => {
              this.props.setContent(
                this.props.editor.selectedElement,
                this.state.content
              )
              this.props.togglePopUpOff()
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
    editor: state.editor
  }
}
const mapDispatch = dispatch => {
  return {
    setContent(id, content) {
      dispatch(setContent(id, content))
    },
    togglePopUpOff() {
      dispatch(togglePopUpOff())
    }
  }
}

export default connect(mapState, mapDispatch)(PopUp)
