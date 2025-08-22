// delete last game

type GameRequestResult = {
    id: number,
    white: number,
    black: number,
    winner: number,
    date: Date,
}

export default defineEventHandler(async (event) => {
  let rslt: GameRequestResult[] = await db.query(`SELECT * FROM games ORDER BY id DESC LIMIT 1`)

  // console.log('rslt:', rslt)

  const game = rslt[0]

  let whiteScore, blackScore

  if (game.winner == game.white) {
    whiteScore = 1
    blackScore = 0    
  } else if (game.winner == game.black) {
    whiteScore = 0
    blackScore = 1
  } else {
    whiteScore = 0.5
    blackScore = 0.5
  }

  const whiteRating = await getRating(game.white)
  const blackRating = await getRating(game.black)

  const whiteRatingDiff = await evalRatingDiff(game.white, whiteRating, blackRating, whiteScore)
  const blackRatingDiff = await evalRatingDiff(game.black, blackRating, whiteRating, blackScore)

  rslt = await db
    .transaction()
    .query(
      `DELETE FROM games WHERE id = ?`,
      [game.id],
    )
    .query(
      `UPDATE users SET rating = ? WHERE id = ?`,
      [whiteRating - whiteRatingDiff, game.white]
    )
    .query(
      `UPDATE users SET rating = ? WHERE id = ?`,
      [blackRating - blackRatingDiff, game.black]
    )
    .rollback((e: any) => {
      /* do something with the error */
    }) // optional
    .commit() // execute the queries  

    db.end()

    return rslt
})




