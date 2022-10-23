import axios from 'axios'
import { BASE_URL } from '@/api/typicode.api'
import { fetchPhotos } from '@/services/photos.service'


describe('Pruebas en "PhotosService"', () => {
  
  test('debe realizar la petición a la "url" correcta y devolver datos', async( ) => {
    const limit = 2
    const page = 1

    const mockAxiosGet = jest.spyOn(axios, "get");

    const data = await fetchPhotos(limit, page)
    expect(mockAxiosGet).toHaveBeenCalledWith(`${ BASE_URL }/photos?_limit=${ limit }&_page=${ page }`)
    expect(data).toBeTruthy()
    expect(data.length).toBeGreaterThan(0)
  })
})