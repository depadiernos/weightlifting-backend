const bcrypt = require("bcryptjs")
const db = require("../data/dbConfig")

const find = () => {
  return db("users").select("id", "email", "name")
}

const findBy = (filter) => {
  return db("users")
    .where(filter)
    .select(["id", "email", "password"])
    .first()
}

const findById = (id) => {
  return db("users")
    .where({ id })
    .first("id", "email", "name")
}

const add = async (user) => {
  user.password = await bcrypt.hash(user.password, 12)
  const id = await db("users").insert(user)
  return findById(id)
}

const update = async (user, id) => {
  await db("users").where({id}).update(user)
  return findById(id)
}

module.exports = { find, findBy, findById, add, update }
