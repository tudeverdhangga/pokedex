<template>
  <div class="pkdx-detail mr-5">
    <v-card
      v-if="windowWidth > 600"
      class="pkdx-detail__card w-100 h-100 d-center"
      elevation="0"
    >
      <div class="d-center flex-column w-100">
        <h1>{{ pokemon.name | titleFormat }}</h1>
        <div class="w-100 mx-2 align-center">
          <div class="d-center">
            <img
              :src="this.imageUrl + this.id + '.png'"
              alt="Pokemon Picture"
              height="200"
            />
          </div>
        </div>
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
        <div class="d-flex">
          <div class="pkdx-detail__card-height mr-5 d-center flex-column">
            <h4>Height</h4>
            <p>{{ pokemon.height }}m</p>
          </div>
          <div class="pkdx-detail__card-weight d-center flex-column">
            <h4>Weight</h4>
            <p>{{ pokemon.weight }}m</p>
          </div>
        </div>
      </div>
    </v-card>
    <div v-else class="pkdx-detail__dialog">
      <v-dialog v-model="show">
        <div class="d-center flex-column w-100">
          <h1>{{ pokemon.name | titleFormat }}</h1>
          <div class="w-100 mx-2 align-center">
            <div class="d-center">
              <img
                :src="this.imageUrl + this.id + '.png'"
                alt="Pokemon Picture"
                height="200"
              />
            </div>
          </div>
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
          <div class="d-flex">
            <div class="pkdx-detail__card-height mr-5 d-center flex-column">
              <h4>Height</h4>
              <p>{{ pokemon.height }}m</p>
            </div>
            <div class="pkdx-detail__card-weight d-center flex-column">
              <h4>Weight</h4>
              <p>{{ pokemon.weight }}m</p>
            </div>
          </div>
        </div>
      </v-dialog>
    </div>
    <v-overlay absolute :value="loading">
      <v-progress-circular indeterminate color="primary" />
    </v-overlay>
  </div>
</template>

<script>
export default {
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
      windowWidth: 0,
    }
  },
  beforeMount() {
    /* eslint-disable */
    if (process.client) {
      window.addEventListener('resize', this.handleResize)
    }
    /* eslint-enable */
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    id() {
      this.url = this.baseUrl + this.id
      this.fetchData()
    },
  },
  filters: {
    titleFormat(title) {
      return title ? title.charAt(0).toUpperCase() + title.slice(1) : ''
    },
  },
  beforeDestroy() {
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
