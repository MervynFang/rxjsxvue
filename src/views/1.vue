<template lang="html">
  <div class="one">
    {{a}}
    <ul v-for="val in b">
      <li>{{val}}</li>
    </ul>
    <button type="button" name="button" class="btn">click log</button>
    <router-link to="/hi">to 2</router-link>
  </div>
</template>

<script>
import Rx from 'rxjs/Rx'

const aaa = Rx.Observable.from([10, 20, 30]).map(val => val)

export default {
  data () {
    return {
      a: 'this is a rxjs x vue use vue-rx demo page',
      b: aaa
    }
  },
  mounted () {
    Rx.Observable.fromEvent(document.querySelector('.btn'), 'click').subscribe(() => {
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
