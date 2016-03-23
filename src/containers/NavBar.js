import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { logout, loginExpired } from 'redux/modules/auth'
import { showLogin } from 'redux/modules/login'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

const mapStateToProps = (state) => ({
  username: state.auth.username
})

export const handleSelect = function (event, actionKey) {
  event.preventDefault()
  // Hack to make redux and the react bootstrap navbar play nice
  return (dispatch, getState) => {
    if (typeof actionKey === 'string') {
      // Route path
      dispatch(push(actionKey))
    } else {
      // Action
      dispatch(actionKey)
    }
  }
}

export class NavBar extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    logout: PropTypes.func.isRequired,
    showLogin: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired
  };

  render () {
    const username = this.props.username
    const isAuthenticated = () => !!username

    let authMenu
    if (isAuthenticated()) {
      authMenu = (
        <NavDropdown eventKey={5} title={username} id='user-nav-dropdown'>
          <MenuItem eventKey='/Profile'><Glyphicon glyph='user'/> Profile</MenuItem>
          <MenuItem><Glyphicon glyph='lock'/> Password</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={this.props.logout} id='logout-button'>
            <Glyphicon glyph='log-out'/> Sign out</MenuItem>
        </NavDropdown>
      )
    }

    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='/'>Our Site</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight onSelect={this.props.handleSelect} id='top-nav'>
              <MenuItem eventKey='/'><Glyphicon glyph='home'/> Home</MenuItem>
                {authMenu}
                {!isAuthenticated() &&
                  <MenuItem eventKey={this.props.showLogin} id='login-button'>
                    <Glyphicon glyph='log-in'/> Login</MenuItem>
                }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default connect(mapStateToProps, { handleSelect, logout, showLogin, loginExpired })(NavBar)
