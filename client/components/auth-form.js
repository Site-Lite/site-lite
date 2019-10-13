import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {auth} from '../store'
import history from '../history'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="auth-bg">
      <Link to="/" id="logo">
        site<span>lite</span>
      </Link>
      <div id="auth-form">
        <h1>{displayName}</h1>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <i className="fas fa-envelope input-icon" />
            <input name="email" type="text" placeholder="Email" />
          </div>
          <div>
            <i className="fas fa-key input-icon" />
            <input name="password" type="password" placeholder="Password" />
          </div>
          {/* {error &&
          error.response && <div id="form-error"> {error.response.data} </div>} */}

          <div
            className={`error-warning ${error && error.response && 'active'}`}
          >
            <i className="fas fa-exclamation-triangle" />
            <span>{error && error.response && `${error.response.data}`}</span>
          </div>

          <div>
            <button type="submit">{displayName}</button>
          </div>
        </form>
        <hr />
        <a href="/auth/google">
          <button type="button" className="google-auth">
            {displayName} with Google
          </button>
        </a>
      </div>
      {displayName === 'Login' ? (
        <div>
          New to SiteLite? <Link to="/signup">Create an account</Link>
        </div>
      ) : (
        <div>
          Have an account? <Link to="/login">Log in</Link>
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
      history.push('/')
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
