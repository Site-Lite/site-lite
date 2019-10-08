/* eslint-disable eqeqeq */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateStyle} from '../store/renderer'
import {selectElement} from '../store/styler'
import {P} from '../components'
import styled from 'styled-components'

class Div extends Component {
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
    const styles = Object.keys(this.props.html[this.props.id].style)
      .map(property => {
        return `${property}: ${this.props.html[this.props.id].style[property]}`
      })
      .join(';')
    console.log(styles)
    const StyledDiv = styled.div`
      ${styles};
    `

    if (this.props.html[this.props.id]) {
      return (
        <StyledDiv
          id={this.props.id}
          className={`${this.props.styler.enabled ? 'edit-mode' : ''} ${
            this.props.styler.selectedElement == this.props.id ? 'selected' : ''
          }`}
          onClick={this.handleClick}
        >
          {this.props.styler.enabled ? <span>div</span> : ''}
          {this.props.html[this.props.id].children.map(child => {
            switch (this.props.html[child].type) {
              case 'div':
                return (
                  <Div
                    parentId={this.props.id}
                    id={child}
                    key={child}
                    html={this.props.html}
                    styler={this.props.styler}
                    updateStyle={this.props.updateStyle}
                    selectElement={this.props.selectElement}
                  />
                )
              case 'p':
                return (
                  <P
                    parentId={this.props.id}
                    id={child}
                    key={child}
                    html={this.props.html}
                    styler={this.props.styler}
                    updateStyle={this.props.updateStyle}
                    selectElement={this.props.selectElement}
                  />
                )
              default:
            }
          })}
        </StyledDiv>
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

export default connect(mapState, mapDispatch)(Div)
