import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import HomeView from '@/views/HomeView.vue'
import { fetchPhotos } from '@/services/photos.service'
import mockPhotos from '../../mock-data/mockPhotos'


jest.mock("axios")

jest.mock('v3-infinite-loading', () => { 
  jest.fn()
})

jest.mock('v3-infinite-loading/lib/style.css', () => {
  jest.fn()
})


describe('Pruebas en HomeView', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HomeView)
  })


  test('Renderizar el componente de forma correcta', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })


  test('Se borra la imagen con el "id" pasado', async() => {    
    const id = 2
    const limit = 2
    const page = 1

    axios.get.mockResolvedValueOnce({ data: mockPhotos })

    const data = await fetchPhotos(limit, page)
    await wrapper.vm.photos.push(...data)
    wrapper.vm.deletePhoto(id)
    expect(wrapper.vm.photos.length).toBe(mockPhotos.length - 1)
    expect(wrapper.vm.photos.filter((photo) => photo.id === id).length).toBe(0)
  })
})