import { LOGIN_SUCCESS, LOGIN_EXPIRED } from 'redux/modules/auth'
// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_LOGIN = 'SHOW_LOGIN'
export const HIDE_LOGIN = 'HIDE_LOGIN'

// ------------------------------------
// Actions
// ------------------------------------
export const showLogin = () => ({
  type: SHOW_LOGIN
})
export const hideLogin = () => ({
  type: HIDE_LOGIN
})

export const actions = {
  showLogin,
  hideLogin
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_EXPIRED]: (state, action) => { return { visible: true } },
  [LOGIN_SUCCESS]: (state, action) => { return { visible: false } },
  [SHOW_LOGIN]: (state, action) => { return { visible: true } },
  [HIDE_LOGIN]: (state, action) => { return { visible: false } }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {visible: false}
export default function modalReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
