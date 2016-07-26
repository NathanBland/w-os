<template>
    <div class="modal" v-bind:class="{'is-active': isActive}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">File Name</p>
          <button @click="closeFileSystem('cancel')" class="delete"></button>
        </header>
        <section class="modal-card-body">
          <p class="control">
            <input class="input" type="text" v-model='fileName' placeholder="tex.txt">
          </p>
        </section>
        <footer class="modal-card-foot">
          <a @click="closeFileSystem('save')" class="button is-primary">Save File</a>
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
      fileName: '',
      fileData: '',
      isActive: false
    }
  },
  methods: {
    closeFileSystem (type) {
      this.$set('isActive', false)
      if (type === 'save') {
        localforage.setItem('file--' + this.$get('fileName'), this.$get('fileData'))
      }
    }
  },
  events: {
    saveFile (data) {
      this.$set('isActive', true)
      this.$set('fileData', data.data)
      this.$set('fileName', data.name)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
