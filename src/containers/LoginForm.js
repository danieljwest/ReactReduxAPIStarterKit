import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import loginValidation from './loginFormValidation'

const fields = ['username', 'password']

class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    requestError: PropTypes.string,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    expired: PropTypes.bool.isRequired
  };

  render () {
    const {fields: {username, password}, requestError, expired, handleSubmit, submitting} = this.props

    let userErrorMsg = username.touched && username.error ? username.error : ''
    let pwdErrorMsg = password.touched && password.error ? password.error : ''

    return (
      <div className='form-signin'>
        <div>
            {requestError &&
              <div className='alert alert-danger'>
                <strong>Failed to sign in!</strong> Please check your credentials and try again.
              </div>}
            {expired &&
              <div className='alert alert-warning'>
                <strong>Your credentials have expired.</strong> Please enter your credentials and try again.
              </div>}
        </div>

        <form onSubmit={handleSubmit} className='form' role='form'>
          <fieldset className='form-group'>
            <label htmlFor='username'>Username</label> <label className='text-danger'>{userErrorMsg}</label>
            <input type='text' className='form-control' id='username'
              placeholder='Enter username' {...username} required=''/>
          </fieldset>
          <fieldset className='form-group'>
            <label htmlFor='password'>Password</label> <label className='text-danger'>{pwdErrorMsg}</label>
            <input type='password' className='form-control' id='password'
              placeholder='Enter Password' {...password} required=''/>
          </fieldset>
          <button type='submit' className='btn btn-primary btn-block' disabled={submitting}>Log In
            {submitting ? <span className='loader glyphicon glyphicon-refresh spin'></span>
              : <span></span>}
          </button>
        </form>
      </div>

    )
  }
}

export default reduxForm({
  form: 'loginForm',
  fields,
  validate: loginValidation
})(LoginForm)
