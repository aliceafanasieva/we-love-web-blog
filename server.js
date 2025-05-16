import express from "express"
import fetchJson from './helpers/fetch-json.js'
import { readFile } from 'fs/promises'

const app = express() // ← essentieel!

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use('/assets', express.static('assets'))
app.use('/images', express.static('assets/images'))


app.get('/', async function (req, res) {
  const data = JSON.parse(await readFile('./data.json'))
  const semester1 = data.data
  .filter(item => item.semester === "1")
  .reverse()
  res.render('index', { semester1 })
})

app.get('/:slug', async function (req, res) {
  const data = JSON.parse(await readFile('./data.json'))
  const blog = data.data.find(item => item.slug === req.params.slug)

  if (!blog) {
    res.status(404).send('Artikel niet gevonden')
    return
  }

  res.render('article', { blog })
})


app.set('port', process.env.PORT || 2001)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})


