<template>
  <w-app title='Text-Editor' class='app--text-editor animated fadeInDown'>
    <p class="control">
      <textarea class="textarea" placeholder="Textarea"></textarea>
    </p>
  </w-app>
</template>

<script>
import wApp from '../wApp'
export default {
  data () {
    return {
    }
  },
  components: {
    wApp
  }
}
</script>

<style scoped>
</style>
