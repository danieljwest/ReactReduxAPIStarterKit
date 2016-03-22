import React, { PropTypes } from 'react'
import NavBar from 'containers/NavBar'
import Footer from 'components/Footer'
import Login from 'containers/Login'
import '../../styles/core.scss'

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
    <div>
      <NavBar/>
      <Login/>
      <div className='container'>
        <div id='root' style={{height: '100%'}}>
          {children}
        </div>
        <div className='footer'>
          <Footer/>
        </div>
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
