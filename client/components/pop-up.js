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
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.editor.selectedElementContent !==
      prevProps.editor.selectedElementContent
    ) {
      this.setState({
        content: this.props.editor.selectedElementContent
      })
    }
  }

  handleChange(event) {
    this.setState({content: event.target.value})
  }
  handleKey(event) {
    if (event.key === 'Enter') {
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
            <span>Edit Image</span>
            <input
              name="content"
              value={this.state.content}
              type="text"
              placeholder="Enter image URL"
              onChange={event => {
                this.handleChange(event)
              }}
            />
          </div>
        )
      case 'p':
        return (
          <div>
            <span>Edit Paragraph</span>
            <textarea
              name="content"
              value={this.state.content}
              type="text"
              placeholder="Write something"
              onChange={event => {
                this.handleChange(event)
              }}
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
          {this.props.html[this.props.editor.selectedElement].type
            ? this.renderSwitch(
                this.props.html[this.props.editor.selectedElement].type
              )
            : null}
          <button
            type="submit"
            value="Submit"
            onClick={() => {
              this.props.setContent(
                this.props.editor.selectedElement,
                this.state.content
              )
              this.props.togglePopUpOff()
              this.setState({
                content: ''
              })
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
