import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ModalWindow from 'components/ModalWindow'
import { actions as authActions } from 'redux/modules/auth'
import LoginForm from './LoginForm'
import { hideLogin } from 'redux/modules/login'

const mapStateToProps = (state) => ({
  expired: state.auth.expired,
  showModal: state.loginModal.visible,
  requestError: state.auth.error,
  token: state.auth.token
})

const handleSubmit = (values, dispatch) => {
  return dispatch(authActions.login(values))
}

export class LoginContainer extends React.Component {
  static propTypes = {
    expired: PropTypes.bool.isRequired,
    requestError: PropTypes.string,
    showModal: PropTypes.bool.isRequired,
    hideLogin: PropTypes.func.isRequired,
    token: PropTypes.string
  };

  render () {
    return (
      <div>
        <ModalWindow title='Sign in' show={this.props.showModal} onHide={this.props.hideLogin}>
          <LoginForm onSubmit={handleSubmit} requestError={this.props.requestError} expired={this.props.expired} />
        </ModalWindow>
      </div>
    )
  }
}

export default connect(mapStateToProps, {...authActions, hideLogin})(LoginContainer)
