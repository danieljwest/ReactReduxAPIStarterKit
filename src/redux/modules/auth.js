import { CALL_API } from 'redux/middleware/api'
import { push } from 'react-router-redux'
/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_EXPIRED = 'LOGIN_EXPIRED'
export const LOGOUT = 'LOGOUT'

export function loginExpired () {
  return {
    type: LOGIN_EXPIRED
  }
}

export function logout () {
  return (dispatch, getState) => {
    dispatch({
      type: LOGOUT
    })
    dispatch(push('/'))
  }
}

export function loginSuccess (token, username) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token: token,
      username: username
    }
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export function login (values) {
  return {
    [CALL_API]: {
      types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED ],
      endpoint: '/api/authenticate',
      method: 'post',
      body: {username: values.username, password: values.password}
    }
  }
}

export const actions = {
  login
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {token: '', username: '', expired: false}
export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
      })
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('username', action.payload.username)
      return Object.assign({}, state, {
        token: action.payload.token,
        username: action.payload.username,
        expired: false,
        error: ''
      })
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        token: '',
        username: '',
        expired: false,
        error: action.error
      })
    case LOGIN_EXPIRED:
      localStorage.setItem('token', '')
      localStorage.setItem('username', '')
      return Object.assign({}, state, {
        token: '',
        username: '',
        expired: true,
        error: ''
      })
    case LOGOUT:
      localStorage.setItem('token', '')
      localStorage.setItem('username', '')
      return Object.assign({}, state, {
        token: '',
        username: '',
        expired: false,
        error: ''
      })
    default:
      return state
  }
}
