<template>
  <w-app title='Terminal' class='app--terminal animated fadeInDown'>
    <nav slot='header'>
      <p class="panel-tabs">
        <a @click="openNew('terminal')" class="" href="#">New</a>
      </p>
    </nav>
    <div class='terminal--output'>
      <p v-if='results' v-for="(idx, result) in results" track-by='$index'>
        $ {{ result.command }}: {{result.data}} 
      </p>
    </div>
    <form @submit.preventDefault='runCommand'>
      <p class="control has-icon">
        <input class="input" type="text" v-model='command' placeholder="" autofocus>
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
      commandPosition: 0,
      command: '',
      results: [{command: 'welcome', type: 'string', data: 'Welcome to w-os'}]
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
      let result = shell.cmd(this, command)
      // console.log('reuslt:', result)
      if (result) {
        this.results.push({...result, command: command})
      }
      this.$set('command', '')
      console.log('results:', this.$get('results'))
    }
  }
}
</script>

<style lang='sass'>
.card.app--terminal
  background: transparent
  .card-header
    background-color: #fff
  .card-content
    background-color: rgba(0, 0, 0, 0.75)
  .terminal--output
    list-style: none
</style>
