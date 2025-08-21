export default defineEventHandler(async (event) => {
  const days = db.query("SELECT DISTINCT(date) FROM games ORDER BY date DESC")

  return days
})