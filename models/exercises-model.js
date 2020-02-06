const db = require("../data/dbConfig")

const find = (user_id) => {
  return db("exercises").where("user_id", user_id)
}

const findBy = (filter) => {
  return db("exercises")
    .where(filter)
    .first()
}

const findById = async (user_id) => {
  const exercise = await db("exercises")
    .where({ id: user_id })
    .first()
  const sets = await db("sets")
    .where("exercise_id", exercise.id)
    .select("id", "reps", "weight")
  return {...exercise, sets: await sets}
}

const add = async (exercise, user_id) => {
  exercise = {...exercise, user_id}
  const [id] = await db("exercises").insert(exercise, process.env.NODE_ENV === "production"? "id": null)
  return findById(id)
}

const update = async (exercise, id) => {
  await db("exercises")
    .where({ id })
    .update(exercise)
  return findById(id)
}

const remove = (id) => {
  return db("exercises")
    .where({ id })
    .del()
}

module.exports = { find, findBy, findById, add, update, remove }
