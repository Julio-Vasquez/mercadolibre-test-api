const router = require('express').Router()

const { fetchByItemQuery, fetchByItemId } = require('./../services/app.service')

router.get('/', (req, res, next) =>
  res.send('welcome to backend Mercado Libre')
)

router.get('/items', fetchByItemQuery)

router.get('/items/:id', fetchByItemId)

module.exports = router
