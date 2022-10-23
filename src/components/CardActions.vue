<template>
   <div class="card-actions">
    <div>  
      <heart class="action-icon clickable" 
        id="dislikeButton"
        v-if="isLike"
        @click="setLike(false)"
      />

      <heart-outline class="action-icon clickable" 
        id="likeButton"
        v-else
        @click="setLike(true)"
      />

      <span class="action-count"
        v-show="hasLikes"
      >
        {{ likesCount }}
      </span>
    </div>

    <div>
      <eye-outline class="action-icon" />
      <span class="action-count"
        v-show="hasViews"
      >
        {{ viewsCount }}
      </span>
    </div>

    <div>
      <share-variant-outline class="action-icon" />
    </div>
  </div>
</template>


<script>
  export default {
    name: 'CardActions'
  }
</script>


<script setup>
  import { computed, ref, toRefs } from 'vue'
  import { EyeOutline, Heart, HeartOutline, ShareVariantOutline } from 'mdue'

  // Emits
  const emit = defineEmits(['update:likesCount'])
  
  // Props
  const props = defineProps({
    likesCount: {
      type: Number,
      default: 0
    },
    viewsCount: {
      type: Number,
      default: 0
    },
  })

  const { likesCount, viewsCount } = toRefs(props)
  const isLike = ref(false)

  // Computed 
  const hasLikes = computed(() => likesCount.value > 0)
  const hasViews = computed(() => viewsCount.value > 0)

  // Métodos
  const setLike = (val) => {
    isLike.value = val
    const likes = isLike.value ? likesCount.value + 1 : likesCount.value - 1
    emit('update:likesCount', likes)
  }
</script>


<style lang="scss" scoped>
  .card-actions {
    box-sizing: border-box;
    color: $light-white;
    display: flex;
    flex-direction: row;
    position: absolute;
    width: 100%;

    .action-icon {
      &.clickable {
        cursor: pointer
      }
    }
  }

  @media (max-width: 299.99px) {
    .card-actions {
      bottom: 2.9rem;
      gap: 0.2rem;
      padding: 0.2rem 0.2rem 0rem;
      .action-icon {
        font-size: 0.6em;
      }

      .action-count{
        font-size: 0.4em;
        margin-left: 0.3em;
      }
    }
  }

  @media (min-width: 300px) and (max-width: 599.99px){
    .card-actions {
      bottom: 4.5rem;
      gap: 0.6rem;
      padding: 0.3rem 0.3rem 0;

      .action-icon {
        font-size: 0.8em;
      }

      .action-count{
        font-size: 0.5em;
        margin-left: 0.2em;
      }
    }
  }

  @media (min-width: 600px) {
    .card-actions {
      bottom: 6rem;
      gap: 0.9rem;
      padding: 1rem 0.5rem 0;
      
      .action-icon {
        font-size: 1.2em;
      }

      .action-count{
        font-size: 0.7em;
        margin-left: 0.2em;
      }
    }
  }
</style>