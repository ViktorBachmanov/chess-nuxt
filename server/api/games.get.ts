export default defineEventHandler(async (event) => {
  let day = getQuery(event).day

  if (day === 'all') {
    day = '%'
  }

  const games = await db.query(`SELECT id, white, black, winner, DATE_FORMAT(date, '%Y-%m-%d') AS date 
    FROM games 
    WHERE date LIKE ?
    AND white != 8 
    AND black != 8 
    ORDER BY id DESC`, [day])

  // console.log('games:', games)

  return games
})