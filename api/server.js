import express from 'express'
import parser from 'body-parser'
import unprotectedRoutes from './controllers/unprotected'
import protectedRoutes from './controllers/protected'
import config from './config'
import morgan from 'morgan'
import _debug from 'debug'
import authMiddleware from './middleware/authMiddleware'
import models from './models'
import db from './core/database'
import userService from './services/userService'

const execute = () => {
  let app = express()
  const debug = _debug('app:api:server')
  app.use(parser.urlencoded({ extended: true }))
  app.use(parser.json())

  let port = config.api_port
  let host = config.api_host

  // Build routes
  let unprotected = express.Router()

  if (config.globals.__DEV__) {
    app.use(morgan('dev'))
  }

  for (let controllerName in unprotectedRoutes) {
    debug(`Loading routes for ${controllerName}`)
    unprotectedRoutes[controllerName](unprotected)
  }

  let protectedRouter = express.Router()

  authMiddleware(protectedRouter)

  for (let controllerName in protectedRoutes) {
    debug(`Loading protected routes for ${controllerName}`)
    protectedRoutes[controllerName](protectedRouter)
  }

  app.use('/api', unprotected)
  app.use('/api/secured', protectedRouter)

  // Load up models
  let obj
  for (let model in models) {
    debug(`Loading model: ${model}`)
    obj = models[model](db)
    db[model] = obj
  }
  debug('Syncing to the database')
  db.sync({force: true}).then(() => {
    userService.add('admin', '1234', true)
    app.listen(port, host)
    debug(`API started on ${host}:${port}`)
  })
}

export default execute
