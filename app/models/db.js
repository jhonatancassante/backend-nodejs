import sequelize from './sequelize.js'
import Sequelize from 'sequelize'
import user from './user.js'
import role from './role.js'
import refreshToken from './refreshToken.js'

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = user(sequelize, Sequelize)
db.role = role(sequelize, Sequelize)
db.refreshToken = refreshToken(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId'
})

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId'
})

db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id'
})

db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId',
  targetKey: 'id'
})

db.ROLES = ['user', 'moderator', 'admin']

export default db
