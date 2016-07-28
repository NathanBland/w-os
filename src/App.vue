<template>
  <div @click='logIt' id="app">
    <nav-bar></nav-bar>
    <os-desktop></os-desktop>
  </div>
</template>

<script>
import navBar from './components/navBar'
import osDesktop from './components/osDesktop'

export default {
  components: {
    navBar,
    osDesktop
  },
  methods: {
    logIt (e) {
      if (!(e.target).closest('.os--nav')) {
        this.$broadcast('hideMenu')
      }
    }
  },
  events: {
    openApp (app) {
      this.$broadcast('openApp', app)
    }
  }
}
</script>

<style lang="sass" scoped>
  #app
    display: flex
    width: 100%
    height: 100%
    position: absolute
    flex-flow: column nowrap
    overflow: hidden
</style>
