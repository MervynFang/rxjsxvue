<template lang="html">
  <div class="one">
    {{a}}
    <ul>
      <li v-for="val in b">{{val}}</li>
    </ul>
    <button type="button" name="button" class="btn">click log</button>
    <router-link to="/hi">to 2</router-link>
  </div>
</template>

<script>
import Rx from 'rxjs/Rx'

// change ob to array, or it will get the last value
const aaa = Rx.Observable.from([1, 2, 3]).map(val => val).toArray()

export default {
  data () {
    return {
      a: 'this is a rxjs x vue use vue-rx demo page'
    }
  },
  subscriptions () {
    return {
      b: aaa
    }
  },
  mounted () {
    this.$subscribeTo(Rx.Observable.fromEvent(document.querySelector('.btn'), 'click'), () => {
      console.log(123)
    })
  }
}
</script>

<style lang="css" scoped>
.one {
  color: #acdead;
}
</style>
