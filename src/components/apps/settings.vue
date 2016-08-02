<template>
  <w-app title='System Settings' class='app--settings animated fadeInDown' 
  @keyup.up="monitorKeys('up')"
  @keyup.down="monitorKeys('down')"
  :has-sub-nav='false' >
    <label class="label">Background Image:</label>
    <p class='control'>
      <input @change='previewBackground' id="the-file-input" type="file">
    </p>
    <figure v-if="backgroundData !== ''" class="image is-16x9 animated fadeInDown">
      <img :src="backgroundData">
    </figure>
    <p class='control'>
      <a @click='saveBackground' class="button is-info">
        <span class="icon">
          <i class="fa fa-cloud-upload"></i>
        </span>
        <span>Save Background</span>
      </a>
    </p>
  </w-app>
</template>

<script>
import wApp from '../wApp'
let localforage = require('localforage')
// let fetch = require('whatwg-fetch')
// import 'whatwg-fetch'
export default {
  data () {
    return {
      isSaving: false,
      backgroundData: ''
    }
  },
  components: {
    wApp
  },
  methods: {
    saveBackground (e) {
      this.$set('isSaving', true)
      localforage.setItem('.wallpaper', this.$get('backgroundData'))
      .then(() => {
        this.$set('isSaving', false)
        this.$dispatch('updateBg')
      })
    },
    previewBackground (file) {
      console.log('file:', file.target.files[0])
      var reader = new FileReader()
      // inject an image with the src url
      reader.onload = (event) => {
        let url = event.target.result
        this.$set('backgroundData', url)
      }
      // when the file is read it triggers the onload event above.
      reader.readAsDataURL(file.target.files[0])
    }
  }
}
</script>

<style lang='sass' >
.card.app--settings
  figure
    margin-bottom: 1em
    box-shadow: 0px 0px 5px black
</style>
