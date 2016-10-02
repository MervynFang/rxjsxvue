<template lang="html">
  <div class="one">
    {{a}}
    <router-link to="/hi">to 2</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      a: 1
    }
  }
}
</script>

<style lang="css">
.one {
  color: #acdead;
}
</style>
