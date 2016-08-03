<template>
  <w-app title='Photo Viewer' 
  class='app--photo-viewer animated fadeInDown' 
  @keyup.up="monitorKeys('up')"
  @keyup.down="monitorKeys('down')"
  :has-sub-nav='false' >
    <label class="label">Select Folder:</label>
    <p class='control'>
      <input @change='openPhotos' id="the-file-input" type="file" multiple>
    </p>
    <div class='photo-viewer--container columns'>
      <div v-if="photos.length > 0" class='photo-viewer--gallery column columns'>
        <figure v-for='(x, photo) in photos' @click='selectPhoto(x)' track-by='$index' class="image animated fadeInDown column is-one-third">
          <img :src="photo">
        </figure>
      </div>
      <figure v-if="primaryPhoto !== ''" class="image column is-half">
        <img :src="photos[primaryPhoto]">
        <span @click='deselect' class="icon is-pulled-right is-overlay is-close">
          <i class="fa fa-times"></i>
        </span>
      </figure>
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
      photos: [],
      primaryPhoto: ''
    }
  },
  components: {
    wApp
  },
  methods: {
    deselect () {
      this.primaryPhoto = ''
    },
    selectPhoto (photo) {
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
  .photo-viewer--gallery
    flex-flow: row wrap
    max-height: 15em
    overflow-y: auto
    margin: 1em
    justify-content: flex-start
    align-items: flex-start
    &.has-select
      flex-flow: column no-wrap
</style>
