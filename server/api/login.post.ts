import { z } from 'zod'

const bodySchema = z.object({
  username: z.string(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  const { username, password } = await readValidatedBody(event, bodySchema.parse)

  if (username === 'ustas' && password === 'password123') {
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
    message: 'Bad credentials'
  })

})