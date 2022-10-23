import axios from 'axios'
import { BASE_URL } from '@/api/typicode.api'
import { fetchPhotos } from '@/services/photos.service'
import mockPhotos from '../../mock-data/mockPhotos'


jest.mock("axios")

describe('Pruebas en "typicodeApi"', () => {
  beforeAll(() => {
    
  })
  
  test('debe funcionar la petición y cargar el número de elementos especificados por "limit"', async( ) => {
    const limit = 2
    const page = 1

    axios.get.mockResolvedValueOnce({ data: mockPhotos })

    const data = await fetchPhotos(limit, page)
    expect(axios.get).toHaveBeenCalledWith(`${ BASE_URL }/photos?_limit=${ limit }&_page=${ page }`)
    expect(data).toEqual(mockPhotos)
  })
})