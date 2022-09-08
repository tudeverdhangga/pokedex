<template>
  <v-app>
    <nav class="pkdx-navbar bg-variant">
      <a href="/" class="pkdx-navbar-logo">
        <img src="/pkdx-nav-buttons.svg" alt="logo" />
      </a>
    </nav>
    <section class="pkdx-content bg-grey container mx-auto">
      <Nuxt />
    </section>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
<style>
@import '~/assets/css/layouts/default.css';
</style>
