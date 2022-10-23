import { get } from '@/api/typicode.api'


export const fetchPhotos = async(limit, page) => {
  const { data } = await get('/photos', limit, page)
  
  return data
}