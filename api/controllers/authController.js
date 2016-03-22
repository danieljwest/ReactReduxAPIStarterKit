import db from '../core/database'
import jwt from 'jsonwebtoken'
import config from '../config'
import passwordService from '../services/passwordService'

export default function (router) {
  router.post('/authenticate', function (req, res) {
    db.user.findOne({where: {username: req.body.username}}).then((user) => {
      // Plain text passwords? TERRIBLE IDEA
      if (user) {
        passwordService.isPasswordSame(user.password, user.salt, req.body.password).then((result) => {
          if (result) {
            let token = jwt.sign(user.dataValues, config.api_secret, {
              expiresIn: 60 * 60
            })
            return res.json({success: true, username: user.username, token})
          }
          return res.json({success: false, message: 'Authentication Failed!'})
        })
      } else {
        return res.json({success: false, message: 'Authentication Failed!'})
      }
    })
  })
}
