<template>
  <w-app title='Terminal' class='app--terminal animated fadeInDown' 
  :has-sub-nav=true
  @keyup.up="monitorKeys('up')"
  @keyup.down="monitorKeys('down')"
  @click='giveFocus'>
    <nav slot='header'>
      <p class="panel-tabs">
        <a @click="openNew('terminal')" class="" href="#">New</a>
      </p>
    </nav>
    <div class='terminal--output'>
      <div class='terminal--result' v-if='results.length > 0' v-for="(idx, result) in results" track-by='$index'>
        <span>$ {{ result.command }}</span>
        <ul v-if="result.dataType === 'list'">
          <li v-for='(x, item) in result.data' track-by='$index'>{{item}}</li>
        </ul>
        <span v-else><br/>{{result.data}}</span>
      </div>
    </div>
    <form @submit.prevent='runCommand' class='terminal--input'>
      $ <input type="text" v-model='command' placeholder="" autofocus>
    </form>
  </w-app>
</template>

<script>
import wApp from '../../wApp'
import shell from './commands.js'
export default {
  data () {
    return {
      commandPosition: 1,
      command: '',
      results: [{command: 'welcome', dataType: 'string', data: 'Welcome to w-os'}]
    }
  },
  components: {
    wApp
  },
  watch: {
    results: (e) => {
      let results = document.querySelectorAll('.terminal--result')
      results[results.length - 1].scrollIntoView({block: 'end', behavior: 'smooth'})
    }
  },
  methods: {
    openNew (app) {
      this.$dispatch('openApp', app)
    },
    giveFocus (shell) {
      shell.currentTarget.querySelector('input').focus()
    },
    monitorKeys (e) {
      console.log('key monitor:', e)
      console.log('commandPosition:', this.commandPosition)
      if (e === 'up' && this.results[this.commandPosition - 1]) {
        this.$set('commandPosition', this.$get('commandPosition') - 1)
      } else if (e === 'down') {
        this.$set('commandPosition', this.$get('commandPosition') + 1)
      }
      if (this.$get('commandPosition') >= this.results.length) {
        this.$set('command', '')
        this.$set('commandPosition', this.results.length)
      } else {
        this.$set('command', this.results[this.$get('commandPosition')].command)
      }
      console.log('commandPosition:', this.commandPosition)
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
      if (this.commandPosition < this.results.length) {
        this.$set('commandPosition', this.results.length)
      } else {
        this.$set('commandPosition', this.commandPosition + 1)
      }
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
    min-height: 15em
    max-height: 20em
    overflow-y: auto
    padding: 0.25em
  .terminal--output
    overflow-y: auto
    ul
      list-style: none
      margin-top: 0em
  .terminal--input
    .control.has-icon .input:focus + .fa, .control.has-icon .textarea:focus + .fa
      color: #1fc8db
    input
      background-color: unset
      color: #1fc8db
      border: unset
.card.app--terminal.is-fullwidth
  .card-content
    height: 90%
    overflow-y: auto
    min-height: unset
    max-height: unset
  .content
    height: 90%
  .terminal--output
    min-height: unset
</style>
