import express, { json, urlencoded } from 'express'
import cors from 'cors'
import db from './app/models/db.js'

const app = express()

var corsOptions = {
  origin: 'http://localhost:8081'
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }))

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to back-end application.' })
})

// routes
import auth from './app/routes/auth.js'
import user from './app/routes/user.js'

auth(app)
user(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

// For production
// db.sequelize.sync();

// In development
import bcrypt from 'bcryptjs'
const Role = db.role
const User = db.user
const Op = db.Sequelize.Op
const rolesUser = ["moderator", "user"]

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db')
  initial()
})

function initial () {
  for (let i = 0; i < db.ROLES.length; i++) {
    Role.create({
      id: i + 1,
      name: db.ROLES[i]
    })
  }
  User.create({
    username: 'jhonatanjb',
    email: 'jhonatan.cassante@live.com',
    password: bcrypt.hashSync('123', 8)
  }).then(user => {
    Role.findAll({
      where: {
        name: {
          [Op.or]: rolesUser
        }
      }
    }).then(roles => {
      user.setRoles(roles)
    })
  })
}
