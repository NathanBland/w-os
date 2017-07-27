<template>
  <div id="app">
    <header>
    </header>
    <main>
      <!--<img src="./assets/logo.svg" alt="Vue.js PWA">-->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

main {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
