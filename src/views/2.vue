<template lang="html">
  <div class="two">
    {{b}}
    <router-link to="/hello">to 1</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      b: 2
    }
  }
}
</script>

<style lang="css">
.two {
  color: #aed123;
}
</style>
