<template>
  <div class="card" 
    :class="{ remove: isDeleted }"
    ref="card"
  >
    <div class="card-body">
      <div class="card-overlay">
        <div class="card-overlay-content">
          <button class="btn-overlay"
            @click="deletePhoto"
          >
            Eliminar
          </button>
        </div>
      </div>
      <img class="card-image"
        :id="`main-image-${id}`"
        alt="text"
        :src="imageUrl"
      />
    </div>
    
    <CardActions 
      v-model:likes-count="likesCount"
      :views-count="viewsCount"
    />

    <div class="card-info">
      <img class="card-thumbnail"
        alt="text"
        loading="lazy"
        :src="thumbnailUrl"
      />
      <div class="card-description">
        <h3 class="card-title">{{ title }}</h3>
        <span class="card-status">Album: {{ albumId }} </span>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'CardPhoto'
  }
</script>


<script setup>
  import { ref, toRefs } from 'vue'
  import CardActions from '@/components/CardActions'
  

  // Emits
  const emit = defineEmits(['deletePhoto'])    

  // Props
  const props = defineProps({
    albumId: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    likesCount: {
      type: Number,
      required: true
    },
    thumbnailUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    viewsCount: {
      type: Number,
      required: true
    },
  })

  const card = ref(null)
  const { id } = toRefs(props)
  const isDeleted = ref(false)

  // Métodos
  const deletePhoto = () => {
    isDeleted.value = true
    setTimeout(() => {
      emit('deletePhoto', id.value)  
    }, 500)
  }
</script>


<style lang="scss" scoped> 
  @keyframes fadein {
    from { 
      opacity: 0
    }
    to   { 
      opacity: 1
    }
  }

  @keyframes fadeOut {
    from { 
      opacity: 1;
      transform: translateX(0px);
    }
    to   { 
      transform: translateX(-400px);
      opacity: 0
    }
  }

  .card {
    animation: fadein 1s ease-in;
    border-radius: 2px;
    box-shadow: 0.3em 0.3em 1em 0 rgba(0,0,0,0.75);
    display: flex;
    flex-direction: column;
    font-family: 'Noto Sans JP', sans-serif;
    max-width: 15em;
    overflow: hidden;
    position: relative;
    text-decoration: none;

    &.remove {
      animation: fadeOut .5s ease-out;
    }

    .card-body {
      display: flex;

      &:hover {
        .card-overlay-content {
          background: rgba(1, 17, 27, 0.6);
          opacity: 1;
          transform: translateY(0%);
          z-index: 1;
        }

        .card-image {
          transform: scale(1.2);
        }
      }

      &:not(:hover) {
        .card-overlay-content {
          opacity: 0;
          transform: translateY(-50%);
          z-index: 0;
        }

        .card-image {
          transform: scale(1.0);
        }
      }

      .card-overlay {
        height: 100%;
        position: absolute;
        width: 100%;

        .card-overlay-content {
          align-items: center;
          display: flex;
          height: 100%;
          justify-content: center;
          position: relative;
          transition: .3s;
          width: 100%;

          .btn-overlay {      
            background: none;
            border-radius: 2px;
            border: 3px solid $light-white;
            color: $light-white;
            cursor: pointer;
            font-weight: bold;
            padding: 0.5em 1em;
            text-transform: uppercase;
            transition: .3s;
            
            &:hover {
              background: $light-white;   
              color: $color-primary-text;
            }
          }
        }
      }

      .card-image {
        height: auto;
        transition: all 0.3s cubic-bezier(0.66, 0.08, 0.19, 0.97);
        width: 100%;
      }
    }

    .card-info {
      align-items: center;
      background-color: $light-white;
      display: flex;
      position: relative;

      .card-thumbnail {
        border-radius: 50px;
        flex-shrink: 0;
      }

      .card-title {
        color: $color-primary-text;
        display: -webkit-box;
        font-size: 1em;
        margin: 0 0 .3em;
        overflow: hidden; 
        -webkit-line-clamp: 2;   
        -webkit-box-orient: vertical;     
      }

      .card-description {
        color: $color-secondary-text;
        display: -webkit-box;
        font-family: "MockFlowFont";   
        margin: 0;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;

        .card-status {
          color: $color-secondary-text;
        }
      }

      
    }
  }

  @media (max-width: 299.99px) {
    .card {
      .card-overlay {
        .card-overlay-content {
          .btn-overlay {      
            font-size: 0.6em;
          }
        }
      }

      .card-info {
        gap: 0.3rem;

        .card-thumbnail {
          display: none;
        }

        .card-description {
          font-size: 0.6em;
          padding: 0.5em;

          .card-status {
            font-size: .5em;
          }
        }
      }
    }
  }

  @media (min-width: 300px) and (max-width: 599.99px){
    .card {
      .card-overlay {
        .card-overlay-content {
          .btn-overlay {      
            font-size: 0.8em;
          }
        }
      }

      .card-info {
        gap: 0.1rem;
        padding: 0.3rem;

        .card-thumbnail {
          height: 3rem;
          width: 3rem;
        }

        .card-description {
          font-size: 0.8em;
          padding: 0.5em;

          .card-status {
            font-size: .6em;
          }
        }
      }
    }
  }

  
  @media (min-width: 600px) {
    .card {
      .card-overlay {
        .card-overlay-content {
          .btn-overlay {      
            font-size: 1.2em;
          }
        }
      }

      .card-info {
        gap: 0.3rem;
        padding: 0.5rem;
        .card-thumbnail {
          height: 3.5rem;
          width: 3.5rem;
        }

        .card-description {
          font-size: 1em;
          padding: 0.5em;

          .card-status {
           font-size: .8em;
          }
        }
      }
    }
  }
</style>