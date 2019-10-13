import React from 'react'
import {Link} from 'react-router-dom'

const Home = props => {
  return (
    <div id="home-page">
      <div id="hero-bg">
        <div id="hero">
          <div>
            <div id="hero-text">
              <h1>Get Creative</h1>
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
          <div id="bottom-border">
            <div />
          </div>
        </div>
      </div>
      <div id="home-2">
        <div>
          <h2>No Coding Necessary</h2>
          <p>
            With SiteLite, you can make webpages with our straightforward and
            easy-to-use editor without needing to touch any lines of code.
          </p>
        </div>
        <div>
          <div>
            <i className="far fa-edit" />
            <h3>Create</h3>
            <p>Design and style a page with our simple editor</p>
          </div>
          <div>
            <i className="far fa-save" />
            <h3>Save</h3>
            <p>Save templates to view or edit for later</p>
          </div>
          <div>
            <i className="far fa-arrow-alt-circle-down" />
            <h3>Download</h3>
            <p>After creating a page, download it to use!</p>
          </div>
        </div>
      </div>
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
