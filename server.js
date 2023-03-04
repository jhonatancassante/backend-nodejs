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
  res.json({ message: 'Welcome to bezkoder application.' })
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

const Role = db.role

// In development
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Db')
//   initial()
// })

// For production
db.sequelize.sync();

function initial () {
  Role.create({
    id: 1,
    name: 'user'
  })

  Role.create({
    id: 2,
    name: 'moderator'
  })

  Role.create({
    id: 3,
    name: 'admin'
  })
}
