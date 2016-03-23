import 'isomorphic-fetch'
import {loginExpired} from 'redux/modules/auth'

const API_ROOT = ''

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi (endpoint, dispatch, method, contentType, body, token) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  let requestMeta = {
    method: `${method}`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': `${contentType}`
    }
  }

  // Without this certain OPTIONS CORS checks will fail since the server will reject this header for some reason.
  if (token) {
    requestMeta.headers['x-access-token'] = token
  }

  if (body) {
    if (typeof body === 'string') {
      requestMeta.body = body
    } else {
      requestMeta.body = JSON.stringify(body)
    }
  }

  return fetch(fullUrl, requestMeta)
    .then((response) => response.text().then((json) => ({ json: (json ? JSON.parse(json) : json), response }))
    ).then(({ json, response }) => {
      if (response.status === 401) {
        dispatch(loginExpired())
      }
      if (!response.ok || json.success === false) {
        return Promise.reject(json.message || json)
      }

      return json
    })
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API]
  let token
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, method, body, contentType } = callAPI
  const { types } = callAPI

  if (!method) {
    method = 'GET'
  }

  if (!contentType) {
    contentType = 'application/json'
  }

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every((type) => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }
  if (store.getState().auth && store.getState().auth.token) {
    token = store.getState().auth.token
  }
  function actionWith (data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, next, method, contentType, body, token).then(
    (response) => next(actionWith({
      payload: response,
      type: successType
    })),
    (error) => next(actionWith({
      type: failureType,
      error: error.message || error.Message || error.error || 'Something bad happened'
    }))
  )
}
