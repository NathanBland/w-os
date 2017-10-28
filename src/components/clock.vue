<template>
  <div class="nav-clock">
    <p>{{currentTime}}</p>
  </div>
</template>

<script>
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
        const now = new Date()
        this.currentTime = now.toLocaleTimeString({ hour12: true })
      }, 1000)
    }
  }
}
</script>

<style lang="sass" scoped>
  .nav-clock
    display: flex
    align-items: center
    margin: 0
    padding-left: 1em
    padding-right: 1em
    height: 100%
    background-color: rgba(255, 255, 255, 0.3)
</style>
