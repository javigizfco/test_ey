import { shallowMount } from '@vue/test-utils'
import CardPhoto from '@/components/CardPhoto'


describe('Pruebas en el componente "CardPhoto"', () => {
  let wrapper;
  const albumId = 1
  const title = 'Test Album'
  jest.useFakeTimers()

  beforeEach(() => {
    wrapper = shallowMount(CardPhoto, {
      props: {
        albumId,
        id: 1,
        imageUrl: '',
        likesCount: 5,
        thumbnailUrl: '',
        title,
        viewsCount: 10
      }
    })
  })


  test('Renderizar el componente correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  

  test('Debe mostrarse correctamente el "título" y el "albumId"', () => {
    const albumHtml = wrapper.find('.card-status')
    const titleHtml = wrapper.find('.card-title')
    expect(albumHtml.text()).toBe(`Album: ${ albumId }`)
    expect(titleHtml.text()).toBe(title)
  })


  test('Al borrar la photo, debe emitir correctamente el evento con el "id" correcto', async() => {
    const deleteButton = wrapper.find('button')

    await deleteButton.trigger('click')
    jest.advanceTimersByTime(500)
    
    expect(wrapper.emitted()).toHaveProperty('deletePhoto')
    const deletePhotoEvent = wrapper.emitted('deletePhoto')
    expect(deletePhotoEvent[0]).toEqual([wrapper.vm.id])
  })


  test('Mover el ratón sobre la "card" debe mostrar el overlay para borrar la "card"', () => {
    expect(wrapper.find(".card-overlay-content").isVisible()).toBe(true)
    wrapper.find(".card-body").trigger("mouseover")
    expect(wrapper.find(".card-overlay-content").isVisible()).toBe(true)
  })
})