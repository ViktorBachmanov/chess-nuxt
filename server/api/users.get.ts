export default defineEventHandler(async (event) => {
  const users = db.query(
    `SELECT u.id, u.name, u.rating, u.score, COUNT(g.id) AS games FROM users u 
     LEFT JOIN games g ON (u.id = g.white OR u.id = g.black)
     GROUP BY u.id
     ORDER BY rating DESC`
  )

  return users
})