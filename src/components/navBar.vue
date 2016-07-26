<template>
  <nav class="nav has-shadow">
    <div class="">
      <div class="nav-left">
        <figure @click='openMenu' class="nav-item image is-64x64">
          <img  src="../assets/logo.svg"> menu
        </figure>
      </div>
    </div>
    <aside class="menu nav--apps" v-bind:class="{'is-visible': isMenuActive}">
      <p class="menu-label">
        Apps
      </p>
      <ul class='nav-item'>
        <li class='nav-item--app' @click="openApp(app)" v-for='app of apps'>{{app}}</li>
      </ul>
    </aside>
  </nav>
</template>

<script>
import * as apps from './Applications.vue'
export default {
  data () {
    console.log('apps:', apps.comps)
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
    openMenu (e) {
      this.$set('isMenuActive', (!this.isMenuActive))
      console.log('isMenuActive:', this.isMenuActive)
    }
  }
}
</script>

<style lang="sass" scoped>
  .nav
    flex: 0 1 auto
  .nav-left
    position: relative
  .nav-item--app
    cursor: pointer
  .nav--apps
    display: none
    position: absolute
    z-index: 100
    left: 0
    bottom: -64px
    background-color: white
    &.is-visible
      display: list-item
</style>
