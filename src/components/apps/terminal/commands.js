import * as components from '../../Applications.vue'
export default {
  cmd: function (vue, command) {
    switch (command) {
      case 'test':
        return 'success'
      case 'ls':
        break
      default:
        console.log('is command app?', command in components.comps)
        if (command in components.comps) {
          console.log('dispatch open:', command)
          vue.$dispatch('openApp', command)
        }
    }
  }
}
