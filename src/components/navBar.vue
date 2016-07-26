<template>
  <nav class="nav has-shadow">
    <div class="">
      <div class="nav-left">
        <figure class="nav-item image is-64x64">
          <img src="../assets/logo.svg">
        </figure>
        <a class='nav-item is-tab' v-bind:class="{'is-active': active}">Apps
          <ul class='nav-item'>
            <li @click="openApp(app)" v-for='app of apps'>{{app}}</li>
          </ul>
        </a>
      </div>
    </div>
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
      apps: Object.keys(apps.comps)
    }
  },
  methods: {
    openApp (e) {
      console.log('open:', e)
      this.$dispatch('openApp', e)
    }
  }
}
</script>

<style lang="sass" scoped>
  .nav
    flex: 0 1 auto
</style>
