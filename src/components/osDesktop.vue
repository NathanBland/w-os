<template>
  <div class='osDesktop' v-bind:style="osDesktop">
    <component v-for='app in apps' :is='app.name'></component>
  </div>
</template>

<script>
import * as components from './Applications.vue'
export default {
  data () {
    return {
      apps: [],
      appPositions: [],
      osDesktop: {
        background: 'no-repeat center/cover url("/static/wallpaper.jpeg")'
      }
    }
  },
  components: components.comps,
  ready: function () {
    let apps = []
    apps = document.querySelectorAll('.w-app')
    // this.$set('apps', apps)
    this.$set('appPositions', Array.prototype.slice.call(apps))
    // console.log('app pos:', this.appPositions)
  },
  methods: {
    bringToFront (e) {
      console.log('positions:', this.appPositions)
      let myVue = this
      for (let i = 0; i < myVue.apps.length; i++) {
        if (e === myVue.appPositions[i]) {
          let ourself = myVue.appPositions[i]
          myVue.appPositions.splice(i, 1)
          myVue.appPositions.push(ourself)
          break
        }
      }
      for (let i = 0; i < myVue.appPositions.length; i++) {
        // console.log('comp:', myVue.appPositions[i])
        myVue.appPositions[i].style.zIndex = i
      }
    }
  },
  events: {
    bringToFront (e) {
      this.bringToFront(e)
    },
    openApp (app) {
      this.apps.push({name: app})
      console.log('apps:', this.apps)
    },
    addMe (item) {
      this.appPositions.push(item)
    }
  }
}
</script>

<style lang="sass" scoped>
  .osDesktop
    flex: 1
    
</style>
