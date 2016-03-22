import { argv } from 'yargs'

const config = {
  env : process.env.NODE_ENV || 'development',
  api_host : 'localhost',
  api_port : process.env.APIPORT || 8081,
  api_secret : 'developmentsecretkey'
}

config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__DEBUG__'    : config.env === 'development' && !argv.no_debug,
  '__DEBUG_NEW_WINDOW__' : !!argv.nw,
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

export default config
