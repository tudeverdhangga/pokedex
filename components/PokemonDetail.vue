<template>
  <div class="pkdx-detail">
    <v-card
      v-if="windowWidth > 600"
      class="pkdx-detail__card w-100 h-100 d-center"
      elevation="0"
    >
      <div class="d-center flex-column w-100">
        <h1>{{ pokemon.name | titleFormat }}</h1>
        <div>
          <v-chip
            v-for="(type, index) in pokemon.types"
            :key="'pokemon-' + index"
            class="ma-2"
            :color="type.type.name"
          >
            {{ type.type.name | titleFormat }}
          </v-chip>
        </div>
        <div class="w-100 mx-2 align-center">
          <div class="d-center">
            <img
              :src="imageUrl + id + '.png'"
              alt="Pokemon Picture"
              height="200"
              class="ma-2"
            />
          </div>
        </div>
        <div class="d-flex">
          <div class="pkdx-detail__card-height mr-5 d-center flex-column">
            <h4>Height</h4>
            <p>{{ pokemon.height }}m</p>
          </div>
          <div class="pkdx-detail__card-weight d-center flex-column">
            <h4>Weight</h4>
            <p>{{ pokemon.weight }}kg</p>
          </div>
        </div>
        <div class="text-center">
          <h4>Abilities</h4>
          <v-chip
            v-for="(ability, index) in pokemon.abilities"
            :key="'pokemon-' + index"
            class="ma-2"
            color="grey lighten-1"
          >
            {{ ability.ability.name | titleFormat }}
          </v-chip>
        </div>
      </div>
    </v-card>
    <div v-else class="pkdx-detail__dialog">
      <v-dialog v-model="show">
        <v-card class="pkdx-detail__card w-100 h-100 d-center" elevation="0">
          <div class="d-center flex-column w-100 my-5">
            <h1>{{ pokemon.name | titleFormat }}</h1>
            <div>
              <v-chip
                v-for="(type, index) in pokemon.types"
                :key="'pokemon-' + index"
                class="ma-2"
                :color="type.type.name"
              >
                {{ type.type.name | titleFormat }}
              </v-chip>
            </div>
            <div class="w-100 mx-2 align-center">
              <div class="d-center">
                <img
                  :src="imageUrl + id + '.png'"
                  alt="Pokemon Picture"
                  height="200"
                  class="ma-2"
                />
              </div>
            </div>
            <div class="d-flex">
              <div class="pkdx-detail__card-height mr-5 d-center flex-column">
                <h4>Height</h4>
                <p>{{ pokemon.height }}m</p>
              </div>
              <div class="pkdx-detail__card-weight d-center flex-column">
                <h4>Weight</h4>
                <p>{{ pokemon.weight }}kg</p>
              </div>
            </div>
            <div class="text-center">
              <h4>Abilities</h4>
              <v-chip
                v-for="(ability, index) in pokemon.abilities"
                :key="'pokemon-' + index"
                class="ma-2"
                color="grey lighten-1"
              >
                {{ ability.ability.name | titleFormat }}
              </v-chip>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <v-overlay absolute :value="loading">
      <v-progress-circular indeterminate color="primary" />
    </v-overlay>
  </div>
</template>

<script>
export default {
  filters: {
    titleFormat(title) {
      return title ? title.charAt(0).toUpperCase() + title.slice(1) : ''
    },
  },
  props: ['id', 'baseUrl'],
  data() {
    return {
      show: false,
      loading: false,
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
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/',
      url: this.baseUrl + this.id,
      windowWidth: window.innerWidth,
    }
  },
  created() {
    /* eslint-disable */
    if (process.client) {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    }
    /* eslint-enable */
  },
  watch: {
    id() {
      this.url = this.baseUrl + this.id
      this.fetchData()
      if (this.windowWidth <= 600) this.show = true
    },
  },
  mounted() {
    this.fetchData()
  },
  destroyed() {
    /* eslint-disable */
    if (process.client) {
      window.removeEventListener('resize', this.handleResize)
    }
    /* eslint-enable */
  },
  methods: {
    async fetchData() {
      this.loading = true
      await this.$axios
        .get(this.url)
        .then((res) => {
          this.pokemon = res.data
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleResize() {
      this.windowWidth = window.innerWidth
    },
  },
}
</script>

<style>
@import '~/assets/css/components/detail.css';
</style>
