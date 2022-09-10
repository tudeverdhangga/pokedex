<template>
  <div>
    <div class="pkdx-filter d-flex">
      <v-row>
        <v-col cols="4">
          <v-select
            v-model="filter"
            :items="types"
            label="Type"
            solo
            @change="filterTypes"
          ></v-select>
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model="search"
            solo
            rounded
            label="Enter to search"
            prepend-inner-icon="mdi-magnify"
            @keydown.enter.prevent="searchPokemon"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <v-snackbar
      :timeout="2000"
      :value="show"
      color="red"
      tile
      transition="slide-x-reverse-transition"
    >
      <v-icon> mdi-close-circle </v-icon>
      {{ errorMsg }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: ['baseUrl'],
  data() {
    return {
      pokemons: [],
      filter: '',
      search: '',
      show: false,
      errorMsg: '',
      types: [
        'All',
        'Normal',
        'Fire',
        'Water',
        'Electric',
        'Grass',
        'Ice',
        'Fighting',
        'Poison',
        'Ground',
        'Flying',
        'Psychic',
        'Bug',
        'Rock',
        'Ghost',
        'Dragon',
        'Dark',
        'Steel',
        'Fairy',
      ],
    }
  },
  methods: {
    searchPokemon() {
      this.show = false
      if (this.search !== '') {
        this.$axios
          .get(this.baseUrl + this.search.toLocaleLowerCase())
          .then((res) => {
            const id = res.data.id
            this.$emit('detail', id)
          })
          .catch((err) => {
            this.errorMsg = err.response.data
            this.show = true
            console.log(err)
          })
      }
    },
    filterTypes() {
      if (this.filter === 'All') {
        this.$emit('list', 'all')
      } else {
        this.pokemons = []

        this.$axios
          .get(process.env.BASE_URL + 'type/' + this.filter.toLocaleLowerCase())
          .then((res) => {
            res.data.pokemon.forEach((item) => {
              const str = item.pokemon.url.split('/')
              const pokemon = {}
              pokemon.id = str[str.length - 2]
              pokemon.name = item.pokemon.name
              pokemon.url = item.pokemon.url

              this.pokemons.push(pokemon)
            })
            this.$emit('list', this.pokemons)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  },
}
</script>
