export default function (router) {
  router.get('/Users', function (req, res) {
    res.json([
            {name: 'test', password: 'test2'}
    ])
  })

  router.get('/Users/1', function (req, res) {
    res.json(
            {name: 'test2', password: 'test2'}
    )
  })
  router.get('/Users/3', function (req, res) {
    res.json(
            {name: 'test4', password: 'test4'}
    )
  })
}
