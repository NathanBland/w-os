<template>
  <w-app title='Text-Editor' class='app--text-editor animated fadeInDown'>
    <nav slot='header'>
      <p class="panel-tabs">
        <a @click='getFileSystem' class="" href="#">open</a>
        <a @click='saveFile' class="" href="#">save</a>
        <a class="" href="#">close</a>
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
    }
  }
}
</script>

<style scoped>
</style>
