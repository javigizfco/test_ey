<template>
  <div class="wrapper">
    <CardPhoto 
      v-for="{ albumId, id, thumbnailUrl, title, url } in photos"
      :album-id="albumId"
      :id="id"
      :image-url="url"
      :key="id"
      :likes-count="randomizerInteger(20)"
      :thumbnail-url="thumbnailUrl"
      :title="title"
      :views-count="randomizerInteger(50)"
      @delete-photo="deletePhoto"
    />
    <InfiniteLoading 
      @infinite="loadPhotos" 
    />
  </div>
</template>


<script>
  import InfiniteLoading from 'v3-infinite-loading'
  import 'v3-infinite-loading/lib/style.css'
  
  export default {
    name: 'HomeView',
    components: [
      InfiniteLoading
    ]
  }
</script>


<script setup>
  import { ref } from 'vue'
  
  import { fetchPhotos } from '@/services/photos.service.js'
  import CardPhoto from '@/components/CardPhoto'
  import randomizerInteger from '@/helpers/randomizerInteger'  

  const page = ref(1)
  const limit = 25
  const photos = ref([])
  
  // Métodos
  const deletePhoto = (id) => {
    photos.value = [...photos.value.filter(photo => photo.id !== id )]
  }

  const loadPhotos = async($state) => {
    const data = await fetchPhotos(limit, page.value)
    if (data.length < limit) {
      $state.complete()
    }
    else {
      photos.value.push(...data)
      $state.loaded()
    }
    page.value++
  }
</script>


<style lang="scss" scoped>
  .wrapper {
    display: grid;
    grid-auto-flow: dense;
    margin: 0 auto;    
    max-width: 85rem;
  }

  @media (max-width: 599.99px) {
    .wrapper {
      column-gap: 1rem;
      grid-template-columns: 1fr 1fr;
      padding: 0.3rem;
      row-gap: 1rem;
    }
  }

  @media (min-width: 600px) {
    .wrapper {
      column-gap: 2rem;
      grid-template-columns: repeat(auto-fill, minmax(15em, 1fr) ) ;
      padding: 0.5rem;
      row-gap: 2rem;
    }
  }
</style>