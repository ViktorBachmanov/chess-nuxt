export default defineEventHandler(async (event) => {
  let day = getQuery(event).day

  if (day === 'all') {
    day = '%'
  }

  const users = await db.query(
    `SELECT u.id, u.name, u.rating, COUNT(g.id) AS games FROM users u 
     LEFT JOIN games g ON (u.id = g.white OR u.id = g.black)
     WHERE g.date LIKE ?
     GROUP BY u.id
     ORDER BY rating DESC`,
     [day]
  )

  return users
})