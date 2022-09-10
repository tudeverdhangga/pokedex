<template>
  <div class="d-flex">
    <PokemonDetail :id="detailId" :baseUrl="baseUrl" />
    <PokemonList
      :imageUrl="imageUrl"
      :baseUrl="baseUrl"
      @detail="detailPokemon"
    />
  </div>
</template>

<script>
import PokemonDetail from '~/components/PokemonDetail.vue'
import PokemonList from '~/components/PokemonList.vue'

export default {
  components: {
    PokemonDetail,
    PokemonList,
  },
  data() {
    return {
      imageUrl: process.env.IMAGE_URL,
      baseUrl: process.env.BASE_URL + 'pokemon/',
      detailId: 1,
    }
  },
  methods: {
    detailPokemon(id) {
      this.detailId = id
    },
  },
}
</script>
