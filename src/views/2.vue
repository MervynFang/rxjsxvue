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
      b: 'this is a vue 2.0 jsx demo page',
      d: [10, 20, 30]
    }
  },
  render (h) {
    const coljsx = []
    this.d.map((val, index) => {
      coljsx.push(<li>{val}</li>)
    })
    
    return (
      <div class={'two'}>
        {this.b}
        <ul>
          {/* we dont need v-for directive here with jsx writing style */}
          {coljsx}
        </ul>
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
