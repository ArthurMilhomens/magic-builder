import api from './magic';

interface Search {
  query: { cardName: String, text: String, type: String, colors: String, manaCost: String },
  colorOperator: String
};

export async function search({ query, colorOperator }: Search) {
  const response = await api.get(
    '/cards/search?as=grid&order=name&q=' +
    query.cardName +
    `${query.text !== '' ? (' oracle:' + query.text) : ''}` +
    `${query.type !== '' ? (' type:' + query.type) : ''}` +
    `${query.colors !== '' ? (' color' + colorOperator + query.colors) : ''}` +
    `${query.manaCost !== '' ? (' mana:' + query.manaCost) : ''}`)
  // .then(function (res) {
  //   console.log('teste ', res)
  //   setCards(res.data.data)
  //   setQuery({ cardName: '', text: '', type: '', colors: '', manaCost: '' })
  //   setScreen(true)
  // })
  // .catch(function (err) {
  //   console.log(err)
  // })
  return response
}