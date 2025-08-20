export default defineEventHandler(async (event) => {
  const users = db.query("SELECT id, name, rating FROM users ORDER BY rating DESC")

  return users
})