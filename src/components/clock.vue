<template>
  <div class="nav-clock">
    <p>{{currentTime}}</p>
  </div>
</template>

<script>
import leftPad from 'left-pad'
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      currentTime: ''
    }
  },
  ready: function () {
    this.time()
  },
  methods: {
    time () {
      setInterval(() => {
        let now = new Date()
        let timeString = ''
        let hours = now.getHours() % 12
        let ampm = 'PM'
        if (hours === 0) {
          hours = 12
          ampm = 'AM'
        }
        let minutes = now.getMinutes()
        let seconds = now.getSeconds()
        timeString += hours + ':'
        timeString += leftPad(minutes, 2, '0') + ':'
        timeString += leftPad(seconds, 2, '0') + ' ' + ampm
        this.currentTime = timeString
      }, 1000)
    }
  }
}
</script>

<style lang="sass" scoped>
  .nav-clock
    align-self: center
    margin: 1em
</style>
