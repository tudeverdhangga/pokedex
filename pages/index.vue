<template>
  <div>
    <h2>Pokedex</h2>
    <PokemonList :imageUrl="imageUrl" :baseUrl="baseUrl" />
  </div>
</template>

<script>
import PokemonList from '~/components/PokemonList.vue'

export default {
  data() {
    return {
      imageUrl: process.env.IMAGE_URL,
      baseUrl: process.env.BASE_URL + 'pokemon/',
    }
  },
  components: {
    PokemonList,
  },
}
</script>
