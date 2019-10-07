import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateStyle} from '../store/renderer'
import {selectElement} from '../store/styler'

class P extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  update(id, property, value) {
    this.props.updateStyle(id, property, value)
  }

  handleClick(event) {
    if (event.target.id.length) {
      this.props.selectElement(Number(event.target.id))
    }
  }

  render() {
    if (this.props.html[this.props.id]) {
      return (
        <p
          id={this.props.id}
          style={this.props.html[this.props.id].style}
          className={`${this.props.styler.enabled ? 'edit-mode' : ''} ${
            this.props.styler.selectedElement == this.props.id ? 'selected' : ''
          }`}
          onClick={this.handleClick}
        >
          {this.props.styler.enabled ? <span>p</span> : ''}
        </p>
      )
    } else {
      return <div />
    }
  }
}

const mapState = state => {
  return {
    html: state.renderer,
    styler: state.styler
  }
}

const mapDispatch = dispatch => {
  return {
    updateStyle(id, property, value) {
      dispatch(updateStyle(id, property, value))
    },
    selectElement(id) {
      dispatch(selectElement(id))
    }
  }
}

export default connect(mapState, mapDispatch)(P)
