<template>
  <div class="w-app card"
    v-bind:class="{ 'animated zoomOutDown': isDeleted}"     
    @click="bringToFront"
    @mousedown="bringToFront"
    @animationend="makeMe"  
    draggable='true'>
    <header class="card-header">
      <p class="card-header-title">
        {{title}}
      </p>
      <slot name='header'></slot>
      <a class="card-header-icon" @click='closeApp'>
        <i class="fa fa-times"></i>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
let interact = require('interact.js')
interact('.w-app header')
  .draggable({
    inertia: true,
    restrict: {
      restriction: 'parent',
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    autoScroll: true,
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
    //   var textEl = event.target.querySelector('p')

    //   textEl && (textEl.textContent =
    //     'moved a distance of ' +
    //     (Math.sqrt(event.dx * event.dx +
    //     event.dy * event.dy) | 0) + 'px')
    }
  })
  // .resizable({
  //   preserveAspectRatio: false,
  //   edges: { left: true, right: true, bottom: true, top: true }
  // })
  // .on('resizemove', function (event) {
  //   var target = event.target
  //   var x = (parseFloat(target.getAttribute('data-x')) || 0)
  //   var y = (parseFloat(target.getAttribute('data-y')) || 0)

  //   // update the element's style
  //   target.style.width = event.rect.width + 'px'
  //   target.style.height = event.rect.height + 'px'

  //   // translate when resizing from top or left edges
  //   x += event.deltaRect.left
  //   y += event.deltaRect.top

  //   target.style.webkitTransform = target.style.transform =
  //       'translate(' + x + 'px,' + y + 'px)'

  //   target.setAttribute('data-x', x)
  //   target.setAttribute('data-y', y)
  // })
function dragMoveListener (event) {
  var target = event.target.parentNode
      // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)'
  // target.style.zIndex = 1
  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      active: '',
      isDeleted: false
    }
  },
  methods: {
    bringToFront (e) {
      this.$dispatch('bringToFront', e.currentTarget)
    },
    closeApp (e) {
      this.$set('isDeleted', true)
      this.$dispatch('closeApp', e)
    },
    makeMe (e) {
      let target = e.currentTarget
      if (this.isDeleted) {
        target.parentNode.removeChild(target)
      } else {
        target.classList.remove('animated')
        target.classList.remove('fadeInDown')
        this.$dispatch('addMe', target)
      }
    }
  },
  props: ['title', 'appId']
}
</script>

<style scoped>
  .w-app {
    position: absolute;
	  color: #FFF;
    top: 100px;
    left: 100px;
    box-shadow: 0px 0px 5px black;
    z-index: 0;
    .card-header {
      cursor: move;
    }
  }
</style>
