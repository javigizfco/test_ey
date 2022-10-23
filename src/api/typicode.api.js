import axios from 'axios'

export const BASE_URL = 'https://jsonplaceholder.typicode.com'


export const get = async(url, limit=10, page=1) => {
  const { data } = await axios.get(`${ BASE_URL }${ url }?_limit=${ limit }&_page=${ page }`)

  return {
    data
  }
}