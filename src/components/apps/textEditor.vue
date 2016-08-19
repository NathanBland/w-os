<template>
  <w-app 
    title='Text-Editor' 
    class='app--text-editor animated fadeInDown'
    :has-sub-nav=true>
    <nav slot='header'>
      <p class="panel-tabs">
        <a @click='getFileSystem' class="" href="#">Open</a>
        <a @click='saveFile' class="" href="#">Save</a>
        <a @click="openNew('textEditor')" class="" href="#">New</a>
      </p>
    </nav>
    <p class="control">
      <textarea class="textarea" v-model='fileData' placeholder="Type..">{{fileData}}</textarea>
    </p>
  </w-app>
</template>

<script>
import wApp from '../wApp'
export default {
  data () {
    return {
      fileName: '',
      fileData: ''
    }
  },
  components: {
    wApp
  },
  methods: {
    saveFile (data) {
      // localforage.set(data.filename, data.content)
      console.log('save file:', this.fileData)
      this.$dispatch('saveFile', {data: this.fileData, name: this.fileName})
    },
    getFileSystem (e) {
      console.log('getFileSystem:', this)
      this.$dispatch('getFileSystem', this)
    },
    openNew (app) {
      this.$dispatch('openApp', app)
    }
  }
}
</script>

<style scoped>
</style>
