<template>
  <v-app class="denson_list">
    <div>
      <!-- 头部 -->
      <v-toolbar dark color="primary">
        <v-btn icon to="/">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title class="white--text">{{value}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator='{ on }'>
            <v-btn icon v-on="on">
              <v-icon color="pink">favorite</v-icon>
            </v-btn>
          </template>
          <span>Coming</span>
        </v-tooltip>
      </v-toolbar>

      <!-- 图片内容区 -->
      <v-container
        id="scroll-target"
        class="scroll-y"
        style="height: calc(100vh - 56px)"
        grid-list-lg
        ref="father"
        @click="getDetil"
      >
        <v-layout
          v-scroll:#scroll-target="onScroll"
          row
          wrap
          ref="child"
        >
          <v-flex
              v-for="(n,i) in imgList"
              :key="i"
              xs6
              d-flex
              v-ripple
              class="myimgbox"
            >
              <img
                :class="['elevation-4', 'myImg']"
                :src="n.thumbUrl"
                alt="" >
                <!-- <span class="gif">gif {{n.locImageLink.lastIndexOf('.gif')}}</span> -->
            </v-flex>
        </v-layout>
      </v-container>
    </div>
     <!-- 回到顶部 -->
    <v-fab-transition>
      <v-btn
        v-show="!hidden"
        fixed
        dark
        fab
        bottom
        right
        :loading="load"
        ref="button"
        @click="topTop"
        color="pink">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-fab-transition>
    <!-- 提示 -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="6000"
    >{{snackbarTxt}}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
var api = ''
if (process.env.NODE_ENV === 'development') {
  api = 'api'
} else {
  api = 'https://pic.sogou.com/pics'
}
export default {
  data: () => ({
    distance: 30,
    load: false,
    page: 0,
    value: '',
    imgList: [],
    hidden: true,
    snackbar: false,
    snackbarColor: 'error',
    snackbarTxt: ''
  }),
  computed: {
  },
  mounted () {
    this.value = this.$route.query.keyword
    this.doSearch()
  },
  methods: {
    // 滚动监听事件
    onScroll (e) {
      var offsetTop = e.target.scrollTop
      let childH = this.$refs.child.offsetHeight
      if (childH - (e.target.scrollTop + this.$refs.father.offsetHeight - 32) <= this.distance && !this.load) {
        console.log('触底，需要加载')
        this.doSearch()
      }

      if (offsetTop > 100 && this.hidden === true) {
        this.hidden = false
      } else if (offsetTop <= 0) {
        this.hidden = true
      }
    },
    // 请求搜索
    getDetil (e) {
      // var height = this.$refs.father.offsetHeight
      // var child = this.$refs.child.offsetHeight
      // console.lo()
      // this.snackbar = true
    },
    // 搜索
    doSearch () {
      if (!this.value) return false
      this.load = true
      this.$Axios.get(api, {
        params: {
          query: `${this.value} 表情`,
          mode: 1,
          mood: 0,
          dm: 0,
          start: this.page * 48,
          reqType: 'ajax',
          reqFrom: 'result',
          tn: 0
        }
      }).then(res => {
        if (res.data.items) {
          this.imgList = this.imgList.concat(res.data.items)
          if (res.data.items.length !== 48) {
            this.snackbarTxt = '额，被你榨干了！'
            this.snackbar = true
            return
          }
          setTimeout(() => {
            this.load = false
          }, 500)

          this.page++
        }
      }).catch(err => {
        console.log(err)
        this.snackbarTxt = '请求出错，请稍后再试！'
        this.snackbar = true
      })
    },
    // 回到顶端
    topTop () {
      let currentScroll = this.$refs.father.scrollTop
      if (currentScroll > 0) {
        // 告诉浏览器——希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画，传入回调函数为参数
        window.requestAnimationFrame(this.topTop)
        this.$refs.father.scrollTo(0, currentScroll - currentScroll / 5)
      }
    }
  }
}
</script>
<style lang="stylus">
.denson_list{
  .myImg{
    width 100%;
    border-radius 4px;
    display inline-block;
    height 132px;
    background: url('data:image/gif;base64,R0lGODlhEAAQAKIAAMvLy8nJyf7+/s3NzczMzP///wAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM0RkI3MjE2OTBENzExRTlCQkI2RUFBMjRBNzhEQzc2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM0RkI3MjE3OTBENzExRTlCQkI2RUFBMjRBNzhEQzc2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzRGQjcyMTQ5MEQ3MTFFOUJCQjZFQUEyNEE3OERDNzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzRGQjcyMTU5MEQ3MTFFOUJCQjZFQUEyNEE3OERDNzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAEAAQAAADNBi6Wv5uyCmFvRborSGklPcQZEliGMeJEVihFsOwdCEvsOVKtLrRu0FOYDL1fIBhkHZTJAAAOw==');
    background-size: 18px 18px;
  }
  .myimgbox{
    position relative
  }
  .gif{
    position absolute;
    right 10px
    top 8px
    color #1976d2
  }
}
</style>
