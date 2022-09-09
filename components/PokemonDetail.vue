<template>
  <v-card>
    <div class="pkdx-detail">
      <h3>{{ pokemon.name }}</h3>
      <p>{{ pokemon.weight }}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['id', 'baseUrl'],
  data() {
    return {
      pokemon: {
        abilities: [],
        base_experience: null,
        forms: [],
        game_indices: [],
        height: null,
        held_items: [],
        id: null,
        is_default: null,
        location_area_encounters: null,
        moves: [],
        name: null,
        order: null,
        past_types: [],
        species: {},
        sprites: {},
        stats: [],
        types: [],
        weight: null,
      },
      url: this.baseUrl + this.id,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      await this.$axios
        .get(this.url)
        .then((res) => {
          console.log(res)
          this.pokemon = res.data
        })
        .catch((err) => {
          console.log(err)
        })
      console.log('pokemon', this.pokemon.name)
    },
  },
}
</script>
