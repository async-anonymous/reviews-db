const express = require('express')
const queries = require('../database/queries.js')
const cors = require('cors');

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.get('/reviews/meta', (req, res) => {
    let id = req.query.product_id;
  queries.getReviewsMeta(id, (err, data) => {
    if (err) {
        console.log('Error with GET Meta request', err)
        res.status(400).send(err)
    } else {
        console.log('Get Requests for reviews meta recieved')
        res.send(data)
    }
  })
})

app.get('/reviews', (req, res) => {
  let id = req.query.product_id;
  let page = req.query.page - 1 || 0;
  let count = req.query.count || 5;
  let sort = req.query.sort || 'relevant'
  queries.getReviewsByPage(id, count, page, sort, (err, data) => {
      if (err) {
          console.log('Error with GET request', err)
          res.status(400).send(err)
      } else {
          console.log('Get Requests for reviews recieved')
          res.send(data.rows)
      }
  })
})

app.put('/reviews/:id/helpful', (req, res) => {
    console.log(req.params)
    let id = req.params.id;
    queries.markHelpful(id, (err, data) => {
        if (err) {
            console.log('Error with helpful request', err)
            res.status(400).send(err)
        } else {
            console.log('Mark helpful request recieved')
            res.send(data)
        }
    })
})

app.put('/reviews/:id/report', (req, res) => {
    let id = req.params.id;
    queries.reportReview(id, (err, data) => {
        if (err) {
            console.log('Error with Report request', err)
            res.status(400).send(err)
        } else {
            console.log('Report request recieved')
            res.send(data)
        }
    })
})

app.post('/reviews', (req, res) => {
    let review = req.body;
    console.log('on serverside review obj inc" ', review);
    queries.insertReview(review, (err, data) => {
        if (err) {
            console.log('Error with POST request', err)
            res.status(400).send(err)
        } else {
            console.log('AddReview request recieved')
            res.send(data)
        }
    });
})

app.get('/', (req, res) => res.json({ message: 'Hello World' }))

app.listen(port, () => console.log(`Server listening on port ${port}!`))