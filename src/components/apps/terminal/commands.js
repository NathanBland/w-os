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
    switch (command) {
      case 'test':
        return {type: 'string', data: 'success'}
      case 'ls':
        let result = []
        localforage.iterate((value, key, iterationNumber) => {
          if (key.indexOf('file--') > -1) {
            result.push(key.slice(6))
          }
        }).then(() => {
          console.log('files', result)
          return {type: 'list', data: result}
        })
        break
      case 'help':
        return {type: 'string', data: 'Try help, ls, or any app name.'}
      default:
        console.log('apps:', apps)
        console.log('dispatch open:', command)
        vue.$dispatch('openApp', command)
        return true
    }
  }
}
