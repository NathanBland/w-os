<template>
  <w-app title='Calculator' class='app--calculator animated fadeInDown' @keyup='monitorKeys'>
    <p class='control'>
      <div class='calculatorApp'>
        <input class='input calculatorApp-input' value={{calculatorAppInput}} v-model='calculatorAppInput'>
        <div class='calculatorApp-buttons-parent'>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>7</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>8</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>9</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>+</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>4</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>5</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>6</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>-</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>1</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>2</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>3</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>*</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>0</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>.</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>=</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>/</button>
          <!--<button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>sin</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>cos</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>^</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>sqrt</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>tan</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>cot</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>(</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>)</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>e^</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>ln</button>-->
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>clear</button>
          <!--<button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>&lt;-</button>
          <button @click='handleButtonPress' class='button is-outlined calculatorApp-buttons-child'>pi</button>-->
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
      lastInput: '',
      hasDecimal: false,
      operators: ['+', '-', '*', '/']
    }
  },
  methods: {
    monitorKeys (keyboardEvent) {
      this.handleEntry(keyboardEvent.key)
    },
    handleButtonPress (event) {
      this.handleEntry(event.target.textContent)
    },
    handleEntry (input) {
      if (input === '=' || input === 'Enter') { // Evaluate expression
        this.calculatorAppInput = math.eval(this.calculatorAppInput)
        this.lastInput = input
      } else if (input === 'clear' || input === 'Delete') { // Clear input field
        this.calculatorAppInput = ''
        this.hasDecimal = false
        this.lastInput = ''
      } else if (input === 'Backspace') {
        this.calculatorAppInput = this.calculatorAppInput.substring(0, this.calculatorAppInput.length - 1)
        this.lastInput = this.calculatorAppInput.charAt(this.calculatorAppInput.length - 1)
      } else if (this.operators.includes(input)) { // Append operator
        if (!this.operators.includes(this.lastInput)) {
          this.calculatorAppInput += input
          this.hasDecimal = false
          this.lastInput = input
        }
      } else if (input === '.') { // Append decimal point
        if (!this.hasDecimal) { // If legal
          this.hasDecimal = true
          this.calculatorAppInput += input
          this.lastInput = input
        }
      } else if (!isNaN(input)) { // Append digit
        this.calculatorAppInput += input
        this.lastInput = input
      }
      // Ignore the rest
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