<template>
  <w-app title='Photo Viewer' 
  class='app--photo-viewer animated fadeInDown' 
  @keyup.up="monitorKeys('up')"
  @keyup.down="monitorKeys('down')"
  :has-sub-nav='false' >
    <label class="label the-file-input">Select Folder:</label>
    <p class='control the-file-input'>
      <input @change='openPhotos' class="the-file-input" type="file" multiple>
    </p>
    <div v-if="isFullScreen" class="modal is-active">
      <div @click='toggleFullScreen' class="modal-background"></div>
      <div class="modal-content">
        <figure class="image">
          <img :src="photos[primaryPhoto]">
        </figure>
      </div>
      <button @click='toggleFullScreen' class="modal-close"></button>
    </div>
    <div class='photo-viewer--container columns'>
      <div v-if="photos.length > 0" class='photo-viewer--gallery column columns'>
        <figure v-for='(x, photo) in photos' @click='selectPhoto(x)' track-by='$index' class="image animated fadeInDown column is-one-third">
          <img :src="photo">
        </figure>
      </div>
      <div v-if="primaryPhoto !== ''" class='photo-viewer--primary columns column is-half'>
        <div class='column photo-viewer--controls'>
          <button @click='toggleFullScreen' class="button is-info">
            <span class="icon is-small">
              <i class="fa fa-expand"></i>
            </span>  
            Full Screen
          </button>
          <button @click='deselect' class="button">
            <span class="icon is-small">
              <i class="fa fa-times"></i>
            </span>
            Close
          </button>
        </div>
        <figure @animationend='removeAnimation' class="image column" v-bind:class="[isEntering ? 'animated slideInLeft': '']">
          <img :src="photos[primaryPhoto]">
        </figure>
      </div>
    </div>
  </w-app>
</template>

<script>
import wApp from '../../wApp'
// let fetch = require('whatwg-fetch')
// import 'whatwg-fetch'
export default {
  data () {
    return {
      isSaving: false,
      isEntering: true,
      isFullScreen: false,
      photos: [],
      primaryPhoto: ''
    }
  },
  components: {
    wApp
  },
  methods: {
    removeAnimation (e) {
      this.isEntering = false
    },
    toggleFullScreen () {
      this.$set('isFullScreen', (!this.isFullScreen))
      console.log('toggle full screen:', this.isFullScreen)
    },
    deselect () {
      this.primaryPhoto = ''
    },
    selectPhoto (photo) {
      this.$set('isEntering', true)
      this.primaryPhoto = photo
    },
    openPhotos (files) {
      console.log('files:', files.target.files)
      for (let photo of files.target.files) {
        var reader = new FileReader()
        // inject an image with the src url
        reader.onload = (event) => {
          let url = event.target.result
          // console.log('url?', url)
          this.photos.push(url)
        }
      // when the file is read it triggers the onload event above.
        reader.readAsDataURL(photo)
      }
    }
  }
}
</script>

<style lang='sass' >
.card.app--photo-viewer
  figure img
    box-shadow: 0px 0px 2px black
  width: 50em
  // .photo-viewer--container
  .modal-content
    max-width: 85% !important
    width: unset !important
  .the-file-input
    width: 10em
    margin: unset
  .is-close 
    left: unset
    right: 6px
    top: 6px
    color: white
    text-shadow: 0px 0px 2px #0c0c0c
    color: rgba(255, 255, 255, 0.8)
    transition: .5s color
    &:hover
      color: white
      cursor: pointer
  .photo-viewer--primary
    flex-flow: column
    .photo-viewer--controls
      display: flex
      justify-content: flex-end
      button
        margin-left: 1em
      .icon
        margin-right: 1em
  .photo-viewer--gallery
    flex-flow: row wrap
    max-height: 20em
    overflow-y: auto
    margin: 1em
    justify-content: flex-start
    align-items: flex-start
    &.has-select
      flex-flow: column no-wrap
</style>
