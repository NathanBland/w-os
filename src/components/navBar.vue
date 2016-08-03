<template>
  <nav class="nav os--nav has-shadow">
    <div class="">
      <div class="nav-left">
        <div @click='toggleMenu' class='nav-item'>
          <figure class="image is-32x32">
            <img src="../assets/logo.svg">
          </figure>
          <span style='line-height: 36px'>Menu</span>
        </div>
      </div>
    </div>
    <clock></clock>
    <aside class="menu nav--apps" v-bind:class="{'is-visible animated slideInLeft': isMenuActive}">
      <p class="menu-label">
        Apps
      </p>
      <ul class='menu-list'>
        <li class='nav-item--app' @click="openApp(app)" v-for='app of apps'><a href="#">{{app}}</a></li>
      </ul>
    </aside>
  </nav>
</template>

<script>
import * as apps from './Applications.vue'
import clock from './clock'
export default {
  components: {
    clock
  },
  data () {
    // console.log('apps:', apps.comps)
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      active: '',
      isMenuActive: false,
      apps: Object.keys(apps.comps)
    }
  },
  methods: {
    openApp (e) {
      console.log('open:', e)
      this.$set('isMenuActive', false)
      this.$dispatch('openApp', e)
    },
    toggleMenu (e) {
      this.$set('isMenuActive', (!this.isMenuActive))
    },
    closeMenu (e) {
      this.$set('isMenuActive', false)
    }
  },
  events: {
    hideMenu () {
      this.$set('isMenuActive', false)
    }
  }
}
</script>

<style lang="sass" scoped>
  .nav
    flex: 0 1 auto
    justify-content: space-between
  .nav-left
    position: relative
  .nav-item--app
    cursor: pointer
    margin: .5em
  .nav--apps
    display: none
    position: absolute
    z-index: 10000
    left: 0
    top: 4em
    background-color: white
    box-shadow: 1px 4px 6px black
    font-size: 1em
    &.is-visible
      display: list-item
  .nav-clock
    align-self: center
    margin: 1em
</style>