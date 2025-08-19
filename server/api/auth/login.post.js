export default defineEventHandler(async (event) => {
  const allHeaders = event.node.req.headers
  // console.log('All headers:', allHeaders)
  const userAgent = allHeaders['user-agent']
  console.log('userAgent:', userAgent)

  const formData = await readBody(event)
  console.log('formData:', formData)


  return { 
    token: 'AUTH_TOKEN',
   }
})