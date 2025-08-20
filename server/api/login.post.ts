import { z } from 'zod'
import bcrypt from "bcrypt"

const bodySchema = z.object({
  username: z.string(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  const { username, password } = await readValidatedBody(event, bodySchema.parse)

  const queryResult: Array<any> = await db.query(
    `SELECT password FROM users WHERE name = ?`,
    [username]
  );
  if (!queryResult.length) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Bad credentials'
    })
  }
  const dbPassword = queryResult[0].password;

  const rslt = await bcrypt.compare(password, dbPassword)

  // console.log('bcrypt.compare:', rslt)

  // if (username === 'ustas' && password === 'password123') {
  if (true) {
    // set the user session in the cookie
    // this server util is auto-imported by the auth-utils module
    await setUserSession(event, {
      user: {
        name: 'Ustas'
      }
    })
    return {}
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Bad credentials'
  })

})