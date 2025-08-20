export default defineEventHandler(async (event) => {
  const users = db.query("SELECT * FROM users ORDER BY rating DESC")

  return users
})