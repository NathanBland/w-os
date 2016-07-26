<template>
    <div class="modal" v-bind:class="{'is-active': isActive}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Browse Files</p>
          <button @click="closeFileSystem('cancel')" class="delete"></button>
        </header>
        <section class="modal-card-body">
          <ul>
          <li v-for='file in files'>{{file.name}}</li>
          </ul>
        </section>
        <footer class="modal-card-foot">
          <a @click="closeFileSystem('save')" class="button is-primary">Select File</a>
          <a @click="closeFileSystem('cancel')" class="button">Cancel</a>
        </footer>
      </div>
    </div>
</template>

<script>
// import * as apps from './Applications.vue'
let localforage = require('localforage')
export default {
  data () {
    return {
      files: [],
      selectedFile: '',
      app: {},
      isActive: false
    }
  },
  methods: {
    closeFileSystem (type) {
      this.$set('isActive', false)
      if (type === 'save') {
        let app = this.$get('app')
        app.$set('file', this.selectedFile)
      }
    }
  },
  events: {
    openSelect (e) {
      console.log('open fs:', e)
      localforage.iterate((value, key, iterationNumber) => {
          // Resulting key/value pair -- this callback
          // will be executed for every item in the
          // database.
        console.log('key, value', [key, value])
        console.log('idx:', key.indexOf('file--'))
        if (key.indexOf('file--') > -1) {
          console.log('file is file.')
          this.files.push(key)
        }
      }).then(() => {
        console.log('Iteration has completed')
        this.$set('isActive', true)
        this.$set('app', e)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
