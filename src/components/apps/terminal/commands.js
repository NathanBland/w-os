import * as apps from '../../Applications.vue'
let localforage = require('localforage')
export default {
  data () {
    console.log('apps:', apps.comps)
    return {
      // apps: Object.keys(apps.comps)
    }
  },
  cmd (vue, command) {
    let myCmd = command.split(' ')
    switch (myCmd[0]) {
      case 'test':
        return {type: 'string', data: 'success'}
      case 'touch':
        if (myCmd.length > 1) {
          localforage.setItem(myCmd[1], '')
          .then(() => {
            vue.results.push({dataType: 'string', data: myCmd[1], command: command})
          })
          .catch(function (e) {
            vue.results.push({dataType: 'string', data: e, command: command})
          })
        } else {
          // vue.results.push({dataType: 'string', data: 'Requires at least 1 argument', command: command})
          return {dataType: 'string', data: 'Requires at least 1 argument'}
        }
        break
      case 'cat':
        if (myCmd.length > 1) {
          localforage.getItem(myCmd[1])
          .then((data) => {
            vue.results.push({dataType: 'string', data: data, command: command})
          })
          .catch(function (e) {
            vue.results.push({dataType: 'string', data: e, command: command})
          })
        } else {
          return {dataType: 'string', data: 'Requires at least 1 argument'}
        }
        break
      case 'ls':
        let result = []
        localforage.iterate((value, key, iterationNumber) => {
          result.push(key)
        }).then(() => {
          // console.log('files', result)
          vue.results.push({dataType: 'list', data: result, command: command})
          // return {type: 'list', data: result}
        })
        break
      case 'rm':
        if (myCmd.length > 1) {
          const args = myCmd.slice(1)
          args.map((arg) => (
            localforage.getItem(arg)
              .then(async (data) => {
                await localforage.removeItem(arg)
                vue.results.push({dataType: 'string', data: '', command: command})
              })
              .catch(function (e) {
                vue.results.push({dataType: 'string', data: e, command: command})
              })
          ))
        } else {
          return {dataType: 'string', data: 'Requires at least 1 argument'}
        }
        break
      case 'help':
        return {type: 'string', data: 'Try help, ls, cat, touch, or any app name.'}
      default:
        // console.log('apps:', apps)
        // console.log('dispatch open:', command)
        vue.$dispatch('openApp', command)
        return true
    }
  }
}
