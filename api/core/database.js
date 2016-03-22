import Sequelize from 'sequelize'

let db = new Sequelize('', '', '', {
  dialect: 'sqlite',
  storage: './database.sqlite'
})
export default db
