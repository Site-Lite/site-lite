import React from 'react'
import {Link} from 'react-router-dom'

const Home = props => {
  return (
    <div id="home-page">
      <div id="hero-bg">
        <div id="hero">
          <div>
            <div id="hero-text">
              <h1>Create Your Page</h1>
              <p>Build your own web page with SiteLite.</p>
              <p>Free, easy, and simple to use.</p>
              <button type="button">
                <Link to="/editor" id="nav-editor">
                  Get Started <i className="fas fa-angle-right" />
                </Link>
              </button>
            </div>
            <div id="hero-img">
              <div>
                <div>
                  <span>div</span>
                  <div>
                    <span>p</span>
                  </div>
                  <div>
                    <span>img</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>Other stuff</div>
      <div id="footer">
        <span>SiteLite © 2019</span>
        <span>
          <Link>Terms&nbsp;&nbsp;</Link>
          <Link>&nbsp;&nbsp;Privacy</Link>
        </span>
      </div>
    </div>
  )
}

export default Home
