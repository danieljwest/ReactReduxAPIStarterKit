export default function (router) {
  router.post('/authenticate', function (req, res) {
    if (req.body.username === 'joe' && req.body.password === '1234') {
      return res.json({success: true})
    }
    res.json([
            {name: 'test', password: 'test2'}
    ])
  })
}
