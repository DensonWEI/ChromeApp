<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <transition appear :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>

  </div>
</template>
<script>
export default {
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to.meta, from.meta, this.$router)
      if (to.meta < from.meta) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  }

}
</script>
<style lang="stylus">
* {
  margin: 0;
  padding: 0
}

  ::-webkit-scrollbar {
  display: none;
}
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50;
  width: 310px;
  height: 600px;

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983

// 路由转场过度
.Router {
  position: absolute;
  width: 100%;
  transition: all .3s ease;
}

.slide-left-enter,
 .slide-right-leave-active {
    opacity: 0;
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    transform: translate(-100%, 0);
}
</style>
