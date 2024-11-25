import app from './app_old'

const port = process.env.PORT || '8080'

app.listen(port, () => {
  console.log(`running at port ${port}`)
})