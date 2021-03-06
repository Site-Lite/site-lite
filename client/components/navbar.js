import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {resetTemplateId} from '../store/template'
import {clear} from '../store/renderer'
import {deselectElement} from '../store/editor'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="header">
    <nav>
      {isLoggedIn ? (
        <div className="navbar">
          <Link to="/" id="logo">
            site<span>lite</span>
          </Link>
          {/* The navbar will show these links after you log in */}

          {/* <Link to="/editor">Go to editor</Link> */}
          <div>
            <button type="button" id="nav-editor-button">
              <Link to="/editor" id="nav-editor">
                Go to Editor <i className="fas fa-angle-right" />
              </Link>
            </button>
            <div className="fas fa-user-circle" id="nav-user">
              <div id="nav-user-menu">
                <Link to="/profile">Profile</Link>
                <Link to="/templates">Templates</Link>
                <Link to="/" onClick={handleClick}>
                  Logout
                </Link>
                {/* <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar">
          {/* The navbar will show these links before you log in */}
          <Link to="/" id="logo">
            site<span>lite</span>
          </Link>

          <div>
            <button type="button" id="nav-editor-button">
              <Link to="/editor" id="nav-editor">
                Go to Editor <i className="fas fa-angle-right" />
              </Link>
            </button>
            <div className="fas fa-user-circle" id="nav-user">
              <div id="nav-user-menu">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(resetTemplateId())
      dispatch(clear())
      dispatch(deselectElement())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
