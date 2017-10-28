<template>
  <div class='osDesktop bound' v-bind:style="osDesktop">
    <component v-for='app in apps' :is='app.name'></component>
    <file-system-select></file-system-select>
    <file-system-save></file-system-save>
  </div>
</template>

<script>
import * as components from './Applications.vue'
import fileSystemSelect from './fileSystemSelect.vue'
import fileSystemSave from './fileSystemSave.vue'
let localforage = require('localforage')
export default {
  data () {
    return {
      apps: [],
      appPositions: [],
      background: ''
    }
  },
  computed: {
    osDesktop () {
      return {
        backgroundImage: 'url("' + this.$get('background') + '")',
        // backgroundImage: 'url("/static/wallpaper.jpeg")',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }
    }
  },
  components: {...components.comps, fileSystemSelect, fileSystemSave},
  ready: function () {
    let apps = []
    apps = document.querySelectorAll('.w-app')
    // this.$set('apps', apps)
    this.$set('appPositions', Array.prototype.slice.call(apps))
    // console.log('app pos:', this.appPositions)
    localforage.getItem('.wallpaper').then((data) => {
      this.$set('background', data)
    })
  },
  methods: {
    bringToFront (e) {
      // console.log('positions:', this.appPositions)
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
      // console.log('apps:', this.apps)
      // console.log('app:', this.apps[this.apps.length - 1])
      // bringToFront()
    },
    addMe (item) {
      this.appPositions.push(item)
      item.style.zIndex = this.appPositions.length
    },
    getFileSystem (e) {
      console.log('open system fs', e)
      this.$broadcast('openSelect', e)
    },
    saveFile (data) {
      this.$broadcast('saveFile', data)
    },
    loseFocus () {
      this.$broadcast('loseFocus')
    },
    updateBg () {
      localforage.getItem('.wallpaper').then((data) => {
        this.$set('background', data)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .osDesktop
    flex: 1
    
</style>
