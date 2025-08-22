export default defineEventHandler(async (event) => {
  const days = await db.query("SELECT DISTINCT(DATE_FORMAT(date, '%Y-%m-%d')) AS date FROM games ORDER BY date DESC")

  db.end()

  return days
})