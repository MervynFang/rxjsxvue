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
  methods: {
    eventinjsx (data) {
      console.log(data)
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
        <button on-click={this.eventinjsx.bind(this, 1)}>haha</button>
        <router-link to='/hello' class={'haha'}>to 1</router-link>
      </div>
    )
  }
}
</script>

<style lang="css" scoped>
.two {
  color: #0ed123;
}
.haha {
  display: block;
  color: #e4729d;
}
</style>
