import Sequelize from 'sequelize'

export default (db) => {
  let User = db.define('User', {
    username: Sequelize.STRING,
    salt: Sequelize.STRING,
    password: Sequelize.STRING,
    isAdmin: Sequelize.BOOLEAN
  })
  return User
}
