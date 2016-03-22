import crypto from 'crypto'

const generateSalt = (numBytes) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(numBytes, (error, buf) => {
      if (error) return reject(error)
      resolve(buf.toString('hex'))
    })
  })
}

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    generateSalt(32).then((salt) => {
      crypto.pbkdf2(password, salt, 64000, 256, 'sha256', (err, key) => {
        if (err) return reject(err)
        resolve({ salt, hash: key.toString('hex') })
      })
    })
  })
}

const isPasswordSame = (hash, salt, plaintext) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plaintext, salt, 64000, 256, 'sha256', (err, key) => {
      if (err) return reject(err)
      resolve(key.toString('hex') === hash)
    })
  })
}

export default {
  hashPassword,
  isPasswordSame
}
