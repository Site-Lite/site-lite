import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setContent} from '../store/renderer'

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
          <input
            name="content"
            value={this.state.content}
            type="text"
            placeholder="URL"
            onChange={this.handleChange}
          />
        )
      case 'p':
        return (
          <input
            name="content"
            value={this.state.content}
            type="text"
            placeholder="Content"
            onChange={this.handleChange}
          />
        )
      default:
        return <div />
    }
  }
  render() {
    return (
      <div
        className={this.props.editor.popUpEnabled ? 'popup active' : 'popup'}
      >
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
          }}
        >
          Submit
        </button>
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
    }
  }
}

export default connect(mapState, mapDispatch)(PopUp)
