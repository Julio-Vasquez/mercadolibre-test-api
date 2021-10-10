const Item = {
  id: '',
  title: '',
  price: {
    currency: '',
    amount: 0,
    decimals: 0,
  },
  picture: {
    thumbnail: '',
  },
  condition: '',
  free_shipping: false,
}

const jsonResultItem = {
  author: {
    name: 'Kevin',
    lastName: 'Galindo',
  },
  item: {
    ...Item,
    sold_quantity: 0,
    description: '',
    picture: {
      ...Item.picture,
      fullImg: '',
    },
  },
}

const jsonResultQuery = {
  author: {
    name: 'Kevin',
    lastName: 'Galindo',
  },
  categories: [],
  items: [],
}

const createItemJson = ({ data }) => ({
  ...jsonResultItem,
  item: {
    ...jsonResultItem.item,
    id: data['id'],
    title: data['title'],
    price: {
      ...jsonResultItem.item.price,
      currency: data['currency_id'],
      amount: data['price'],
      decimals: parseFloat(`0.${data['price'].toString().split('.')[1]}`),
    },
    picture: {
      ...jsonResultItem.item.picture,
      thumbnail: data['thumbnail'],
      fullImg: data['pictures'][0]['url'],
    },
    condition: data['condition'],
    free_shipping: data['shipping']['free_shipping'],
    sold_quantity: data['sold_quantity'],
    description: data['plain_text'],
  },
})

const createSearchJson = ({ data }) => ({
  ...jsonResultQuery,
  categories: data['available_filters'][0]['values'].map(
    category => category['name']
  ),
  items: data['results'].map(item => ({
    ...Item,
    id: item['id'],
    title: item['title'],
    price: {
      currency: item['prices']['prices'][0]['currency_id'],
      amount: item['prices']['prices'][0]['amount'],
      decimals: parseFloat(
        `0.${item['prices']['prices'][0]['amount'].toString().split('.')[1]}`
      ),
    },
    picture: item['thumbnail'],
    condition: item['condition'],
    free_shipping: item['shipping']['free_shipping'],
  })),
})

module.exports = {
  createItemJson,
  createSearchJson,
}
