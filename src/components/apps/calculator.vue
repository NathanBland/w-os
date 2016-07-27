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
        <input class='input calculatorApp-input' value={{calculatorAppInput}} v-model='calculatorAppInput'>
        <div class='calculatorApp-buttons-parent'>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>7</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>8</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>9</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>+</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>4</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>5</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>6</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>-</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>1</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>2</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>3</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>*</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>0</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>.</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>=</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>/</button>
          <!--<button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>sin</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>cos</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>^</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>sqrt</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>tan</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>cot</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>(</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>)</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>e^</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>ln</button>-->
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>clear</button>
          <!--<button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>&lt;-</button>
          <button v-on:click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>pi</button>-->
        </div>
      </div>
    </p>
  </w-app>
</template>

<script>
import wApp from '../wApp'
import math from 'mathjs'
export default {
  data () {
    return {
      calculatorAppInput: '',
      lastButton: '',
      hasDecimal: false,
      operators: ['+', '-', '*', '/']
    }
  },
  methods: {
    calculate () {
      console.log('[calculatorApp] calculate')
      this.calculatorAppInput = 'Calculate!'
    },
    handleButtonPress (event) {
      let button = event.target.textContent

      if (button === '=') {
        this.calculatorAppInput = math.eval(this.calculatorAppInput)
      } else if (button === 'clear') {
        this.calculatorAppInput = ''
        this.hasDecimal = false
        this.lastButton = ''
      } else if (this.operators.includes(button)) {
        if (!this.operators.includes(this.lastButton)) {
          this.calculatorAppInput += ` ${button} `
          this.hasDecimal = false
        }
      } else if (button === '.') {
        if (!this.hasDecimal) {
          this.hasDecimal = true
          this.calculatorAppInput += button
        }
      } else {
        this.calculatorAppInput += button
      }
      this.lastButton = button
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