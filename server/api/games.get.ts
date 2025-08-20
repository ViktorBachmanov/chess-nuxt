export default defineEventHandler(async (event) => {
  const games = db.query("SELECT * FROM games ORDER BY id DESC")

  return games
})