<template>
  <div id="app">
    <component :key="locale" :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  components: {
    EmptyLayout, MainLayout
  },

}
</script>


<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
