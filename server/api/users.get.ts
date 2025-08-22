export default defineEventHandler(async (event) => {
  let day = getQuery(event).day

  if (day === 'all') {
    day = '%'
  } else if (day === undefined) {
    return await db.query('SELECT u.id, u.name AS label FROM users u')
  }

  const users = await db.query(
    `SELECT u.id, u.name, u.rating, COUNT(*) AS games FROM users u 
     JOIN games g 
     ON (u.id = g.white OR u.id = g.black)
     WHERE g.date LIKE ?
     AND u.id != 8
     GROUP BY u.id
     ORDER BY rating DESC`,
     [day]
  )

  return users
})