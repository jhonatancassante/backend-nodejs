import verifySignUp from '../middleware/verifySignUp.js'
import { signup, signin } from '../controllers/auth.js'

function auth (app) {
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
    signup
  )

  app.post('/api/auth/signin', signin)
}

export default auth