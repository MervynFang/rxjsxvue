<template lang="html">
  <div>
    <div class="rerer a">
      vue2 webpack2
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      a: 'ha123'
    }
  },
  methods: {},
  components: {}
}
</script>

<style lang="css">
@import "./assets/css/reset.css";

.rerer {
  color: #ca699d;
}
</style>
