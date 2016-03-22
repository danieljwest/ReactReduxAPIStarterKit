import hasher from './passwordService'
import db from '../core/database'

const add = (username, password, isAdmin) => {
  hasher.hashPassword(password).then((hashAndSalt) => {
    db.user.create({
      username: username,
      password: hashAndSalt.hash,
      salt: hashAndSalt.salt,
      isAdmin: isAdmin
    })
  })
}

const getUserByName = (userName) => {

}

const getUsers = () => {
  // Already returns a promise so we just pass it a long
  return db.user.findAll()
}

export default {
  add,
  getUserByName,
  getUsers
}
