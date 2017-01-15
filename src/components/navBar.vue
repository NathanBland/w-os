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
  </nav>
  <aside class="menu nav--apps is-visible" v-bind:class="[isMenuOpening ? 'animated slideInLeft': '', isMenuClosing ? 'animated slideOutLeft': '']">
    <p class="menu-label">
      Apps
    </p>
    <ul class='menu-list'>
      <li class='nav-item--app' @click="openApp(app)" v-for='app of apps'><a href="#">{{app}}</a></li>
    </ul>
  </aside>
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
      isMenuActive: true,
      isMenuOpening: false,
      isMenuClosing: false,
      apps: Object.keys(apps.comps)
    }
  },
  methods: {
    openApp (e) {
      console.log('open:', e)
      this.$set('isMenuActive', false)
      this.$set('isMenuClosing', true)
      this.$dispatch('openApp', e)
    },
    toggleMenu (e) {
      if (!this.isMenuActive) {
        this.$set('isMenuOpening', true)
        this.$set('isMenuClosing', false)
      } else {
        this.$set('isMenuOpening', false)
        this.$set('isMenuClosing', true)
      }
      this.$set('isMenuActive', (!this.isMenuActive))
    },
    closeMenu (e) {
      this.$set('isMenuActive', false)
    }
  },
  events: {
    hideMenu () {
      this.$set('isMenuActive', false)
      this.$set('isMenuClosing', true)
      this.$set('isMenuOpening', false)
    }
  }
}
</script>

<style lang="sass" scoped>
  aside.slideOutLeft
    animation-duration: .5s
  .menu-label
    margin-left: 1em
  .nav
    flex: 0 1 auto
    position: absolute
    width: 100%
    background: rgba(255, 255, 255, 0.5)
    z-index: 0
  .nav-left
    position: relative
    overflow: unset
    overflow-x: unset
  .nav-item--app
    cursor: pointer
    margin: .5em
  .nav-item
    background: rgba(255, 255, 255, 0.5)
    z-index: 10000
  .nav--apps
    display: none
    position: absolute
    z-index: 10000
    left: 0
    top: 4em
    background-color: rgba(255, 255, 255, .75)
    box-shadow: 1px 4px 6px black
    font-size: 1em
    &.is-visible
      display: list-item
  .nav-clock
    align-self: center
    margin: 1em
</style>