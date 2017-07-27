<template>
  <div class="shell" @click="forceFocus">
    <section class="history">
      <p class="history-item" @click.stop v-for="(item, idx) in history">
        <span v-if="item.cmd" class="history-input"><span class="history-cmd">{{item.pwd}} $ </span>{{item.cmd}} <br/>{{item.data}}</span>
        <span v-else>{{item}}</span>
      </p>
    </section>
    <label class="pwd">{{pwd}} $</label>
    <input type="text" class="shell-input" v-model="input" autofocus="true" @keyup.enter="executeCmd"/>
  </div>
</template>

<script>
let lf = require('localforage')
import apps from './apps'
import * as categories from './apps.js'
export default {
  name: 'cmd',
  data () {
    return {
      pwd: '/',
      history: [],
      cmdHistory: [],
      input: '',
      configured: false
      // validCommands: []
    }
  },
  methods: {
    forceFocus (e) {
      let inputField = document.querySelector('[' + e.target.attributes[0].name + ']' + ' .shell-input')
      inputField.focus()
    },
    log (data) {
      this.history.push(data)
    },
    isValidCommand (cmd) {
      return apps.filter((app) => cmd === app.name)
    },
    executeCmd (e) {
      if (this.input.length < 1) {
        this.log({cmd: ' ', pwd: this.pwd})
        this.cmdHistory.push(this.input)
        return 0
      }
      let re = /(^[^ .]+)( ?.*)/
      let cmd = this.input.match(re)
      console.log(cmd)
      let cmdEntry = this.isValidCommand(cmd[1])
      if (cmdEntry.length < 1) {
        this.log({
          cmd: this.input,
          pwd: this.pwd,
          data: 'No command \'' + cmd[1] + '\' found.'
        })
      } else {
        let commandExec = new Promise((resolve, reject) => {
          categories[cmdEntry[0].category][cmd[1]](resolve, reject, cmd[2])
        })
        commandExec
        .then((result) => {
          console.log('result:', result)
          this.log({
            cmd: cmd[0],
            pwd: this.pwd,
            data: result
          })
        }).catch((err) => {
          this.log('err: ' + err)
        })
      }
      this.cmdHistory.push(this.input)
      this.input = ''
      setTimeout(() => {
        e.target.scrollIntoView()
      }, 100)
    },
    createConfiguration () {
      // this.log(':')
    }
  },
  mounted () {
    lf.keys().then((keys) => {
      // console.log(keys)
      this.log(keys)
      lf.getItem('users').then((users) => {
        this.log('users: ' + users)
        if (users === null) {
          this.log('No user detected...')
          this.log('Create a user with \'useradd <username>\'')
          // this.createConfiguration()
        } else {
          this.log('Configuration found...')
          // this.tryLogin()
        }
      }).catch((err) => {
        this.log('err' + err)
      })
    })
    .catch((err) => {
      console.log(err)
      this.log(err)
    })
    this.log('File system established...')
    this.log('Checking for existing configuration...')
    this.log('discovering apps..')
    console.log('apps:', apps, categories)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.shell
  width: 100%
  height: 100%
  background-color: black
  color: white
  padding: 0
  margin: 0
  overflow-y: auto
  .history-item
    margin-top: 0
    margin-bottom: 0
  .pwd
    color: #80e438
    font-weight: bold
  .history-cmd
    color: #80e438
    font-weight: bold
  .shell-input
    background-color: black
    color: white
    font-size: 1em
    line-height: 1.5em
    border: 0 none
    max-width: 100%
    padding: 0
    &:focus
      outline: none
</style>
