<template>
  <v-app id="about">
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
              <v-icon>star</v-icon>
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
        grid-list-md
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
              xs4
              d-flex
            >
              <img v-ripple :src="n.locImageLink" alt="" class="myImg">
              <!-- <v-card
                flat
                tile
              >
                <v-img
                  :src=n.locImageLink
                  :lazy-src="`https://picsum.photos/10/6?image=25`"
                  aspect-ratio="1"
                >

                <template v-slot:placeholder>
                    <v-layout
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-layout>
                  </template></v-img>
              </v-card> -->
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
  api = 'https://pic.sogou.com/pics/json.jsp'
}
export default {
  data: () => ({
    distance: 30,
    load: true,
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
    onScroll (e) {
      var offsetTop = e.target.scrollTop
      let childH = this.$refs.child.offsetHeight
      if (childH - (e.target.scrollTop + this.$refs.father.offsetHeight - 32) <= this.distance && this.load) {
        console.log('触发，加载')
        this.doSearch()
      }

      if (offsetTop > 100 && this.hidden === true) {
        this.hidden = false
      } else if (offsetTop <= 0) {
        this.hidden = true
      }
    },
    getDetil (e) {
      // var height = this.$refs.father.offsetHeight
      // var child = this.$refs.child.offsetHeight
      // console.lo()
      // this.snackbar = true
    },
    // 搜索
    doSearch () {
      if (!this.value) return false
      this.load = false
      this.$Axios.get(api, {
        params: {
          query: `${this.value} 表情`,
          st: 5,
          start: this.page * 60,
          xml_len: 60
        }
      }).then(res => {
        if (res.data.items) {
          this.imgList = this.imgList.concat(res.data.items)
          if (res.data.items.length === 0) {
            this.snackbarTxt = '收手吧，内容到此为止了！'
            this.snackbar = true
            return
          }
          this.load = true
          this.page++
        }
      }).catch(err => {
        console.log(err)
        this.snackbarTxt = '请求出错，请稍后再试！'
        this.snackbar = true
      })
    },
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
  .fixed{
    position: fixed;
    top: 0;
    z-index 999;
    background #fff
  }
  .myImg{
    width 100%;
    display inline-block;
    height 88px;
    background #BBDEFB

    // background: url('../assets/img/load.gif') center center;
    // background-size: cover
  }
</style>
