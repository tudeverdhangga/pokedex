<template>
  <div>
    <FilterBar :baseUrl="baseUrl" @detail="detailPokemon" @list="setPokemons" />
    <div class="pkdx-list pr-3">
      <div class="pkdx-list__content">
        <v-row>
          <v-col
            v-for="(pokemon, index) in pokemons"
            :key="'pokemon' + index"
            cols="6"
            sm="4"
            md="3"
          >
            <v-card
              elevation="0"
              class="ma-2"
              @click="detailPokemon(pokemon.id)"
            >
              <div class="pkdx-list__content-card d-center flex-column pa-2">
                <img
                  :src="imageUrl + pokemon.id + '.png'"
                  alt="Pokemon Picture"
                  height="60"
                />
                <p
                  class="text-center text-truncate text-caption text-uppercase font-weight-bold my-2"
                  style="max-width: 100%"
                >
                  <span class="text--secondary">#{{ pokemon.id }}</span>
                  <br />
                  <span>{{ pokemon.name }}</span>
                </p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <infinite-loading spinner="spiral" @infinite="infiniteScroll" />
      <!-- <div class="pkdx__infinite-scroll"></div> -->
    </div>
  </div>
</template>

<script>
import FilterBar from '~/components/FilterBar.vue'

export default {
  components: {
    FilterBar,
  },
  props: ['baseUrl'],
  data() {
    return {
      allPokemons: [],
      pokemons: [],
      nextUrl: '',
      currentUrl: '',
      errorMsg: '',
      imageUrl: process.env.IMAGE_URL,
    }
  },
  created() {
    this.currentUrl = this.baseUrl
    this.fetchData()
    this.allPokemons = this.pokemons
  },
  methods: {
    async fetchData(state) {
      await this.$axios
        .get(this.currentUrl)
        .then((res) => {
          this.nextUrl = res.data.next
          if (res.data.results.length > 1) {
            this.nextUrl = res.data.next
            res.data.results.forEach((pokemon) => {
              const str = pokemon.url.split('/')
              // Get id
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
      this.pokemons = pokemons === 'all' ? this.allPokemons : pokemons
    },
  },
}
</script>

<style>
@import '~/assets/css/components/list.css';
</style>
