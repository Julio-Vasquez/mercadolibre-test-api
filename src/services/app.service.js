const axios = require('axios').default

const { createItemJson, createSearchJson } = require('./response.service')

const { BASE_URL_API } = require('./../config/environment')

const fetchByItemQuery = async (req, res, next) => {
  if (req.query['q']) {
    const { data } = await axios.get(`${BASE_URL_API}/sites/MLA/search`, {
      params: { q: req.query['q'] },
    })
    //res.send(data)
    res.send(createSearchJson({ data: data }))
  } else res.send({ error: 'Invalid query params' })
}

const fetchByItemId = async (req, res, next) => {
  const { id } = req.params
  Promise.all([
    await axios.get(`${BASE_URL_API}/items/${id}`),
    await axios.get(`${BASE_URL_API}/${id}/description`),
  ]).then(async response => {
    //res.send({ ...response[0].data, ...response[1].data })
    res.send(
      createItemJson({
        data: { ...response[0].data, ...response[1].data },
      })
    )
  })
}

module.exports = {
  fetchByItemQuery,
  fetchByItemId,
}
