import { z } from 'zod'

const bodySchema = z.object({
  white: z.number(),
  black: z.number(),
  winner: z.string(),
  date: z.string(),
})

export default defineEventHandler(async (event) => {
  const { white, black, winner, date } = await readValidatedBody(event, bodySchema.parse)

  // console.log('white:', white)
  // console.log('black:', black)
  // console.log('winner:', winner)
  // console.log('date:', date)

  let winnerId, whiteScore, blackScore

  switch (winner) {
    case 'white':
      winnerId = white
      whiteScore = 1
      blackScore = 0
      break
    case 'black':
      winnerId = black
      whiteScore = 0
      blackScore = 1
      break
    default:
      winnerId = null
      whiteScore = 0.5
      blackScore = 0.5
      break
  }

  const whiteRating = await getRating(white)
  const blackRating = await getRating(black)

  const whiteRatingDiff = await evalRatingDiff(white, whiteRating, blackRating, whiteScore)
  const blackRatingDiff = await evalRatingDiff(black, blackRating, whiteRating, blackScore)

  const rslt = await db
    .transaction()
    .query(
      `INSERT games (white, black, winner, date) VALUES (?, ?, ?, ?)`,
      [white, black, winnerId, date],
    )
    .query(
      `UPDATE users SET rating = ? WHERE id = ?`,
      [whiteRating + whiteRatingDiff, white]
    )
    .query(
      `UPDATE users SET rating = ? WHERE id = ?`,
      [blackRating + blackRatingDiff, black]
    )
    .rollback((e: any) => {
      /* do something with the error */
    }) // optional
    .commit() // execute the queries  

    db.end()

    return rslt
})




