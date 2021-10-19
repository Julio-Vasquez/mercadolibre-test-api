const axios = require('axios').default

const { createItemJson, createSearchJson } = require('./response.service')
const { BASE_URL_API } = require('./../config/environment')

const fetchByItemQuery = async (req, res, next) => {
  if (req.query['q']) {
    try {
      const { data } = await axios.get(`${BASE_URL_API}/sites/MLA/search`, {
        params: { q: req.query['q'] },
      })
      res.send(createSearchJson({ data: data }))
    } catch (err) {
      res.send({ ...err })
    }
  } else res.send({ error: 'Invalid query params' })
}

const fetchByItemId = async (req, res, next) => {
  const { id } = req.params
  try {
    Promise.all([
      await axios.get(`${BASE_URL_API}/items/${id}`),
      await axios.get(`${BASE_URL_API}/items/${id}/description`),
    ]).then(response => {
      res.send(
        createItemJson({
          data: { ...response[0].data, ...response[1].data },
        })
      )
    })
  } catch (error) {
    res.status(error.response.status).send({ message: error.message })
  }
}

module.exports = {
  fetchByItemQuery,
  fetchByItemId,
}
