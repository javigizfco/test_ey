import { shallowMount } from '@vue/test-utils'
import CardActions from '@/components/CardActions.vue'


describe('Pruebas en el componente "CardActions"', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardActions)
  })

  test('Renderizar el componente correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  
  test('El icono de "like" debe mostrarse correctamente y al hacer click en él, debe cambiar', async() => {    
    // Estado inicial
    let likeButton = wrapper.findComponent('#likeButton')
    expect(likeButton.exists()).toBeTruthy()
    let dislikeButton = wrapper.findComponent('#dislikeButton')
    expect(dislikeButton.exists()).toBeFalsy()

    // Hacemos like
    await likeButton.trigger('click')
    likeButton = wrapper.findComponent('#likeButton')
    expect(likeButton.exists()).toBeFalsy()
    dislikeButton = wrapper.findComponent('#dislikeButton')
    expect(dislikeButton.exists()).toBeTruthy()

    // Damos dislike
    await dislikeButton.trigger('click')
    likeButton = wrapper.findComponent('#likeButton')
    expect(likeButton.exists()).toBeTruthy()
    dislikeButton = wrapper.findComponent('#dislikeButton')
    expect(dislikeButton.exists()).toBeFalsy()
  })


  test('Al hacer "like" debe emitir el valor aumentado y este debe ser 1', async() => {
    const likeButton = wrapper.find('.clickable')
    await likeButton.trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('update:likesCount')

    const incrementLikesCount = wrapper.emitted('update:likesCount')
    expect(incrementLikesCount[0]).toEqual([1])
  })

  
  test(('Debe mostrase el número de "likes" y "views" correctamente'), async() => {
    let [ spanLikes, spanViews ] = wrapper.findAll('.action-count')
    expect(wrapper.vm.hasLikes).toBe(false)
    expect(wrapper.vm.hasViews).toBe(false)
    expect(spanLikes.text()).toBe('0')
    expect(spanViews.text()).toBe('0')
    expect(spanLikes.isVisible()).toBe(false)
    expect(spanViews.isVisible()).toBe(false)
    
    await wrapper.setProps({ 
      likesCount: 1,
      viewsCount: 1, 
    })
    
    spanLikes = wrapper.findAll('.action-count')[0]
    spanViews = wrapper.findAll('.action-count')[1]
    expect(wrapper.vm.hasLikes).toBe(true)
    expect(wrapper.vm.hasViews).toBe(true)
    expect(spanLikes.text()).toBe('1')
    expect(spanViews.text()).toBe('1')
    expect(spanLikes.isVisible()).toBe(true)
    expect(spanViews.isVisible()).toBe(true)
  })
})