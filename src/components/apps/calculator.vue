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
            <div id='calculator'>
                <input class='input calc-input' id='cal-box'>
                <div class='calc-buttons-parent'>
                    <button class='button is-outlined calc-buttons-child'>7</button>
                    <button class='button is-outlined calc-buttons-child'>8</button>
                    <button class='button is-outlined calc-buttons-child'>9</button>
                    <button class='button is-outlined calc-buttons-child'>+</button>
                    <button class='button is-outlined calc-buttons-child'>4</button>
                    <button class='button is-outlined calc-buttons-child'>5</button>
                    <button class='button is-outlined calc-buttons-child'>6</button>
                    <button class='button is-outlined calc-buttons-child'>-</button>
                    <button class='button is-outlined calc-buttons-child'>1</button>
                    <button class='button is-outlined calc-buttons-child'>2</button>
                    <button class='button is-outlined calc-buttons-child'>3</button>
                    <button class='button is-outlined calc-buttons-child'>*</button>
                    <button class='button is-outlined calc-buttons-child'>0</button>
                    <button class='button is-outlined calc-buttons-child'>.</button>
                    <button class='button is-outlined calc-buttons-child'>=</button>
                    <button class='button is-outlined calc-buttons-child'>/</button>
                    <button class='button is-outlined calc-buttons-child'>sin</button>
                    <button class='button is-outlined calc-buttons-child'>cos</button>
                    <button class='button is-outlined calc-buttons-child'>^</button>
                    <button class='button is-outlined calc-buttons-child'>sqrt</button>
                    <button class='button is-outlined calc-buttons-child'>tan</button>
                    <button class='button is-outlined calc-buttons-child'>cot</button>
                    <button class='button is-outlined calc-buttons-child'>(</button>
                    <button class='button is-outlined calc-buttons-child'>)</button>
                    <button class='button is-outlined calc-buttons-child'>e^</button>
                    <button class='button is-outlined calc-buttons-child'>ln</button>
                    <button class='button is-outlined calc-buttons-child'>clr</button>
                    <button class='button is-outlined calc-buttons-child'>&lt;-</button>
                    <button class='button is-outlined calc-buttons-child'>pi</button>
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
  components: {
    wApp
  }
}
</script>

    <style scoped lang='sass'>
        .calc-input
            margin: 1%
            width: 98%
        .calc-buttons-parent
            display: flex
            flex-wrap: wrap
        .calc-buttons-child
            flex-basis: 23%
            margin: 1%
    </style>