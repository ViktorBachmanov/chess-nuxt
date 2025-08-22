type TotalGamesRequestResult = {
    total_games: number
}

export async function evalRatingDiff(
    userId: number,
    userRating: number,
    opponentRating: number,
    score: number
): Promise<number> {
    const rslt: Array<TotalGamesRequestResult> = await db.query(
        `SELECT COUNT(*) AS total_games FROM games
        WHERE white = ? OR black = ?`,
        [userId, userId]
    )

    // console.log('rslt:', rslt)

    const userTotalGames = rslt[0].total_games

    const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - userRating) / 400))

    let koef: number

    if (userRating >= 2400) {
      koef = 10;
    } else if (userTotalGames > 30) {
      koef = 20;
    } else {
      koef = 40;
    }

    const ratingDiff = koef * (score - expectedScore)

    return ratingDiff
}

//===============================================================

type RatingRequestResult = {
    rating: number
}

export async function getRating(userId: number): Promise<number>
{
  const rslt: Array<RatingRequestResult> = await db.query(`SELECT rating FROM users WHERE id = ?`, [userId])

  return rslt[0].rating
}