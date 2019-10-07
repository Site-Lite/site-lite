import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createElement, updateStyle} from '../store/renderer'
import {ClickMenu} from './clickMenu'

class Div extends Component {
  handleAdd(id) {
    this.props.createElement(id)
  }

  update(id, property, value) {
    this.props.updateStyle(id, property, value)
    setTimeout(() => {
      console.log(this.props.html)
    }, 0)
  }

  render() {
    if (this.props.html[this.props.id]) {
      return (
        <div id={this.props.id} style={this.props.html[this.props.id].style}>
          <button
            type="button"
            onClick={() => {
              this.handleAdd(this.props.id)
            }}
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              this.update(this.props.id, 'background', 'wheat')
            }}
          >
            Change style
          </button>
          {this.props.html[this.props.id].children.map(child => {
            return (
              <Div
                id={child}
                key={child}
                html={this.props.html}
                createElement={this.props.createElement}
                updateStyle={this.props.updateStyle}
              />
            )
          })}
        </div>
      )
    } else {
      return <p>Hello</p>
    }
  }
}

const mapState = state => {
  return {
    html: state.renderer
  }
}

const mapDispatch = dispatch => {
  return {
    createElement(id) {
      dispatch(createElement(id))
    },
    updateStyle(id, property, value) {
      dispatch(updateStyle(id, property, value))
    }
  }
}

export default connect(mapState, mapDispatch)(Div)
