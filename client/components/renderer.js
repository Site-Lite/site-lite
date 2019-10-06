import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateStyle} from '../store/renderer'
import {Link} from 'react-router-dom'
import {selectElement, toggleBar} from '../store/styler'
import {Div, P, StyleBar, EditMenu} from '../components'
import {MenuProvider} from 'react-contexify'

class Renderer extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  update(id, property, value) {
    this.props.updateStyle(id, property, value)
  }

  toggleEditMode() {
    this.props.toggleStyler()
  }

  handleClick(event) {
    if (event.target.id.length) {
      this.props.selectElement(event.target.id)
    }
  }

  render() {
    return (
      <div id="editor">
        <div
          id="editor-panel"
          className={this.props.styler.enabled ? 'edit-mode ' : ''}
        >
          <div id="settings-bar">
            <div>
              <span>Edit Mode</span>
              <div
                className="switch"
                onClick={() => {
                  this.toggleEditMode()
                }}
              >
                <input type="checkbox" checked={this.props.styler.enabled} />
                <div className="slider" />
              </div>
            </div>
            <div>
              <Link>Save Template</Link>
              <Link>Download</Link>
            </div>
          </div>
          <MenuProvider id="menu_id">
            <div
              id="main"
              style={this.props.html.main.style}
              onClick={this.handleClick}
            >
              {this.props.html.main.children.map(child => {
                switch (this.props.html[child].type) {
                  case 'div':
                    return <Div parentId="main" id={child} key={child} />
                  case 'p':
                    return <P parentId="main" id={child} key={child} />
                  default:
                }
              })}
            </div>
          </MenuProvider>
          <EditMenu />
        </div>
        <StyleBar />
      </div>
    )
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
    toggleStyler() {
      dispatch(toggleBar())
    },
    selectElement(id) {
      dispatch(selectElement(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Renderer)
