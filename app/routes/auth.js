import verifySignUp from '../middleware/verifySignUp.js'
import controller from '../controllers/auth.js'

const auth = app => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  )

  app.post('/api/auth/signin', controller.signin)

  app.post('/api/auth/refreshtoken', controller.refreshToken)
}

export default auth
