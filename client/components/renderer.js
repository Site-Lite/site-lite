import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createElement, updateStyle} from '../store/renderer'
import {Div} from '../components'
import ClickMenu from './clickMenu'

class Renderer extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   menu: [
    //     {label: 'Add a div', callback: this.divCallback},
    //     {label: 'Add a paragraph', callback: this.pCallback},
    //     {label: 'Add an image', callback: this.imgCallback},
    //     {label: 'Delete', callback: this.delCallback}
    //   ]
    // }
  }

  // divCallback() {
  //   console.log('clicked on add a div')
  // }

  // pCallback() {
  //   console.log('clicked on add a paragraph')
  // }

  // imgCallback() {
  //   console.log('clicked on add an iamge')
  // }

  // delCallback() {
  //   console.log('clicked on delete')
  // }

  handleAdd(id) {
    this.props.createElement(id)
    setTimeout(() => {
      console.log(this.props.html)
    }, 0)
  }

  update(id, property, value) {
    this.props.updateStyle(id, property, value)
    setTimeout(() => {
      console.log(this.props.html)
    }, 0)
  }

  render() {
    return (
      <div id="renderer" style={this.props.html.main.style}>
        {/* <div><ClickMenu items={this.state.menu}></ClickMenu></div> */}
        <button
          type="button"
          onClick={() => {
            this.handleAdd('main')
          }}
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => {
            this.update('main', 'background', 'wheat')
          }}
        >
          Change style
        </button>
        {this.props.html.main.children.map(child => {
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

export default connect(mapState, mapDispatch)(Renderer)
