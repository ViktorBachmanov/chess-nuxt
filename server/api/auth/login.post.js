export default defineEventHandler(async (event) => {
  const allHeaders = event.node.req.headers
  // console.log('All headers:', allHeaders)
  const userAgent = allHeaders['user-agent']
  console.log('userAgent:', userAgent)

  const formData = await readBody(event)
  console.log('formData:', formData)

  const isPasswordOk = verifyPassword(formData.username, formData.password)
  console.log('isPasswordOk:', isPasswordOk)

  if (!isPasswordOk) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Wrong username or password',
      fatal: true,
    })

    // setResponseStatus(event, 422)
    // return {
    //   statusMessage: 'Wrong username or password',
    //   token: null,
    // }
  }

  return { token: 'AUTH_TOKEN' }
})