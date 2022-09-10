<template>
  <div>
    <FilterBar :baseUrl="baseUrl" @detail="detailPokemon" @list="setPokemons" />
    <div class="pkdx-list pr-3">
      <div class="pkdx-list__card">
        <v-row>
          <v-col
            v-for="(pokemon, index) in pokemons"
            :key="'pokemon' + index"
            xs="6"
            sm="4"
            md="3"
          >
            <v-card @click="detailPokemon(pokemon.id)" elevation="0">
              <div class="d-center flex-column pa-2">
                <img
                  :src="imageUrl + pokemon.id + '.gif'"
                  alt="Pokemon Picture"
                  height="30"
                  class="mt-2"
                />
                <p class="mb-2">{{ pokemon.name }}</p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <infinite-loading spinner="spiral" @infinite="infiniteScroll" />
    </div>
  </div>
</template>

<script>
import FilterBar from '~/components/FilterBar.vue'

export default {
  components: {
    FilterBar,
  },
  props: ['imageUrl', 'baseUrl'],
  data() {
    return {
      type: 'all',
      pokemons: [],
      nextUrl: '',
      currentUrl: '',
      errorMsg: '',
    }
  },
  created() {
    this.currentUrl = this.baseUrl
    this.fetchData()
  },
  methods: {
    async fetchData(state) {
      this.pokemons = []

      await this.$axios
        .get(this.currentUrl)
        .then((res) => {
          this.nextUrl = res.data.next
          if (res.data.results.length > 1) {
            this.nextUrl = res.data.next
            res.data.results.forEach((pokemon) => {
              const str = pokemon.url.split('/')
              pokemon.id = str[str.length - 2]
              this.pokemons.push(pokemon)
            })
            if (state) state.loaded()
          } else if (state) {
            state.complete()
          }
        })
        .catch((err) => {
          this.errorMsg = JSON.stringify(err)
          console.log(err)
        })
    },
    infiniteScroll($state) {
      setTimeout(() => {
        this.currentUrl = this.nextUrl
        this.fetchData($state)
      }, 500)
    },
    detailPokemon(id) {
      this.$emit('detail', id)
    },
    setPokemons(pokemons) {
      if (pokemons === 'all') this.fetchData()
      else this.pokemons = pokemons
    },
  },
}
</script>

<style>
@import '~/assets/css/components/list.css';
</style>
