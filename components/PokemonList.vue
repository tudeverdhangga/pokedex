<template>
  <div>
    <v-row>
      <v-col>
        <v-row>
          <v-col
            v-for="(pokemon, index) in pokemons"
            cols="3"
            :key="'pokemon' + index"
          >
            <v-card>
              <div class="d-center flex-column">
                <img
                  :src="imageUrl + pokemon.id + '.png'"
                  alt="Pokemon Picture"
                  height="50"
                />
                <p class="p-2">{{ pokemon.name }}</p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <PokemonDetail :id="detailId" :baseUrl="baseUrl" />
      </v-col>
    </v-row>
    <infinite-loading spinner="spiral" @infinite="infiniteScroll" />
  </div>
</template>

<script>
import PokemonDetail from './PokemonDetail.vue'
export default {
  props: ['imageUrl', 'baseUrl'],
  data() {
    return {
      pokemons: [],
      nextUrl: '',
      currentUrl: '',
      errorMsg: '',
      detailId: 1,
    }
  },
  components: { PokemonDetail },
  created() {
    this.currentUrl = this.baseUrl
    this.fetchData()
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
  },
}
</script>
