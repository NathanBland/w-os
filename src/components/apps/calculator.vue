<template>
  <w-app title='Calculator' class='app--calculator animated fadeInDown'>
    <nav slot='header'>
      <p class='panel-tabs'>
        <a @click='getFileSystem' class='' href='#'>open</a>
        <a @click='saveFile' class='' href='#'>save</a>
        <a class='' href='#'>close</a>
      </p>
    </nav>
    <p class='control'>
      <div class='calculatorApp'>
        <input class='input calculatorApp-input'>
        <div class='calculatorApp-buttons-parent'>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-7'>7</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-8'>8</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-9'>9</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-+'>+</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-4'>4</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-5'>5</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-6'>6</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button--'>-</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-1'>1</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-2'>2</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-3'>3</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-*'>*</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-0'>0</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-.'>.</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-='>=</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-/'>/</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-sin'>sin</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-cos'>cos</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-^'>^</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-sqrt'>sqrt</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-tan'>tan</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-cot'>cot</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-('>(</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-)'>)</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-e^'>e^</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-ln'>ln</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-clr'>clr</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-bkspc'>&lt;-</button>
          <button class='button is-outlined calculatorApp-buttons-child calculatorApp-button-pi'>pi</button>
        </div>
      </div>
    </p>
  </w-app>
</template>

<script>
import wApp from '../wApp'
export default {
  data () {
    return {
    }
  },
  methods: {
    calculate () {
      console.log('[calculatorApp] calculate')
    }
  },
  components: {
    wApp
  }
}
</script>

<style scoped lang='sass'>
  .calculatorApp-input
    margin: 1%
    width: 98%
  .calculatorApp-buttons-parent
    display: flex
    flex-wrap: wrap
  .calculatorApp-buttons-child
    flex-basis: 23%
    margin: 1%
</style>