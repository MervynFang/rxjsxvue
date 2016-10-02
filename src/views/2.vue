<!-- <template lang="html">
  <div class="two">
    {{b}}
    <router-link to="/hello">to 1</router-link>
  </div>
</template> -->

<script>
export default {
  data () {
    return {
      b: 'this is a vue 2.0 jsx demo page'
    }
  },
  render (h) {
    return (
      <div class={'two'}>
        {this.b}
        <router-link to='/hello' class={'haha'}>to 1</router-link>
      </div>
    )
  }
}
</script>

<style lang="css">
.two {
  color: #aed123;
}
.haha {
  display: block;
}
</style>
