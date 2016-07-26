<template>
  <w-app title='Terminal' class='app--terminal animated fadeInDown'>
    <nav slot='header'>
      <p class="panel-tabs">
        <a @click="openNew('terminal')" class="" href="#">New</a>
      </p>
    </nav>
    <div class='terminal--output'>
      <p v-for="command in commands" track-by="$index">
        $ {{ command }}: {{ results[$index] }} 
      </p>
    </div>
    <form @submit.preventDefault='runCommand'>
      <p class="control has-icon">
        <input class="input" type="text" v-model='command' placeholder="">
        <i class="fa fa-dollar"></i>
      </p>
    </form>
  </w-app>
</template>

<script>
import wApp from '../../wApp'
import shell from './commands.js'
export default {
  data () {
    return {
      commands: [],
      commandPosition: 0,
      command: '',
      results: []
    }
  },
  components: {
    wApp
  },
  methods: {
    openNew (app) {
      this.$dispatch('openApp', app)
    },
    runCommand (e) {
      // let result = cash(this.$get('command'))
      let command = this.$get('command')
      // const vue = this
      this.commands.push(command)
      let result = shell.cmd(this, command)
      console.log('reuslt:', result)
      this.results.push(result)
      this.$set('command', '')
    }
  }
}
</script>

<style lang='sass'>
.app--terminal
  background: transparent
  .card-header
    background-color: #fff
  .card-content
    background-color: rgba(0, 0, 0, 0.75)
  .terminal--output
    list-style: none
</style>
