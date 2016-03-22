import userService from '../services/userService'

export default function (router) {
  router.post('/Users', function (req, res) {
    userService.add(req.body.username, req.body.password, true)
    res.json({success: true})
  })

  router.get('/Users/', function (req, res) {
    userService.getUsers().then((users) => {
      const mapped = users.map((user) => {
        return {id: user.id, username: user.username,
                isAdmin: user.isAdmin, createdAt: user.createdAt, updatedAt: user.updatedAt}
      })
      res.json({success: true, users: mapped})
    })
  })
  router.get('/Users/3', function (req, res) {
    res.json(
            {name: 'test4', password: 'test4'}
    )
  })
}
