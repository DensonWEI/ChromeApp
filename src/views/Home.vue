<template>
  <v-app
    :class="{home: true, enter: enter}"
    ref="dropbox"
    >
    <!-- 输入框组件 -->
    <v-container v-ripple>
      <v-layout row wrap>
        <v-text-field
          solo
          :autofocus="true"
          v-model.trim="value"
          label="请输入关键词"
          clearable
          prepend-inner-icon="search"
          @keyup.native.enter="doSearch"
        ></v-text-field>
      </v-layout>
      <!-- 图片做背景 -->
      <img src="./../assets/img/home.png" ref="imgOrigin" class="bj" draggable="true">
      <div ref="box" class="box">
        <img v-for="(item, index) in imgArr" :key="index" :src="item" :alt="index">
      </div>
      <!-- dialog -->
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">关键词呢</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialog = false">忘填了</v-btn>
            <v-btn color="green darken-1" flat @click="dialog = false">知道了</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import './../assets/js/gif'

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      dialog: false,
      value: '',
      enter: false,
      imgArr: []
    }
  },
  mounted () {
    console.log(`运行环境：${process.env.NODE_ENV}`)
    // var dropbox = this.$refs.dropbox
    var dropbox = document.querySelector('.home')
    dropbox.addEventListener('dragenter', this.onDragEnter, false)
    dropbox.addEventListener('dragover', this.onDragOver, false)
    dropbox.addEventListener('drop', this.onDrop, false)

    // var canvas = document.createElement('canvas')
    // var context = canvas.getContext('2d')
    // var img = new Image()
    // img.crossOrigin = ''
    // img.onload = function () {
    //   context.drawImage(this, 0, 0)
    //   var data = canvas.toDataURL('image/jpeg')
    //   console.log(data)
    // }
    // img.src = 'https://avatars3.githubusercontent.com/u/496048?s=120&v=4'
  },
  methods: {
    // 搜索表情
    doSearch () {
      if (!this.value) {
        this.dialog = true
        return
      }
      this.$router.push({ path: '/about', query: { keyword: this.value } })
      console.log(this.$refs.dropbox)
    },
    // 转Gif格式
    toGIF (imgElement = this.$refs.imgOrigin) {
      // workerScript 放在了专门建的文件里面，因为webpack不打包，所以单独存放了
      var box = this.$refs.box
      var gif = new GIF({
        workers: 2,
        quality: 10,
        height: imgElement.naturalHeight,
        width: imgElement.naturalWidth,
        workerScript: './js/gif.worker.js'
      })
      // 填入图片
      gif.addFrame(imgElement)
      // 转码Gif完毕，新建图片添加到容器
      gif.on('finished', blob => {
        var ne = new Image()
        ne.src = URL.createObjectURL(blob)
        box.appendChild(ne)
      })
      // Gif渲染
      gif.render()
    },
    getBase64Image (img) {
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 0, img.width, img.height)
      var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      var dataURL = canvas.toDataURL('image/' + ext)
      return dataURL
    },
    // 处理数据类型
    handleDataTransferItems (items) {
      for (var i = 0; i < items.length; i += 1) {
        var kind = items[i].kind
        var type = items[i].type
        // 逻辑开始
        if (kind === 'string') {
          if (type === 'text/plain') {
            items[i].getAsString(function (str) {
              console.log('产出纯文本：' + str)
              // str是纯文本，该怎么处理，就在这里处理
            })
          } else if (type === 'text/html') {
            items[i].getAsString(function (str) {
              console.log('产出富文本：' + str)
              // str是富文本，就在这里处理
            })
          } else if (type === 'text/uri-list') {
            var that = this
            items[i].getAsString(function (str) {
              // str是uri地址，在这里进行处理
              console.log('产出url地址：' + str)
              var img = new Image()
              img.crossOrigin = ''

              img.onload = () => {
                that.toGIF(img)
              }
              img.src = str
            })
          }
        } else if (kind === 'file') {
          // 如果是文件类型
          if (type === 'image/gif') {
            console.log('.gif不用处理')
          } else if (type.indexOf('image/') >= 0) {
            var file = items[i].getAsFile()
            console.log('产出图片对象：' + file)
            this.uploadFile(file)
          }
        }
      }
    },
    onDrop (e) {
      this.enter = false
      console.log('释放')
      e.preventDefault()
      e.stopPropagation()
      var dt = e.dataTransfer
      this.handleDataTransferItems(dt.items)
    },
    onDragEnter (e) {
      this.enter = true
      console.log('进入')
      e.preventDefault()
      e.stopPropagation()
    },
    onDragOver (e) {
      console.log('移动')
      e.preventDefault()
      e.stopPropagation()
    },
    // 图片上传显示
    uploadFile (file) {
      if (file.type.search('image') === 0) {
        var reader = new FileReader()
        var box = this.$refs.box

        reader.onload = e => {
          // base64 图片格式
          var BsaeImg = new Image()
          BsaeImg.src = e.target.result
          box.appendChild(BsaeImg)
          // 图片加载完，调用转Gif
          BsaeImg.onload = () => {
            var canvas = document.createElement('canvas')
            var maximum = (BsaeImg.naturalWidth > BsaeImg.naturalHeight) ? BsaeImg.naturalWidth : BsaeImg.naturalHeight

            var width = BsaeImg.naturalWidth / (maximum / 480)
            var height = BsaeImg.naturalHeight / (maximum / 480)
            canvas.width = width
            canvas.height = height
            canvas.getContext('2d').drawImage(BsaeImg, 0, 0, width, height)
            this.toGIF(canvas)
          }
        }

        reader.readAsDataURL(file)
      } else {
        console.log('文件格式错误！')
      }
    }

  }
}
</script>

<style lang="stylus">
.home{
  background red
}
.enter{
  border: 2px solid red
}
  .bj {
    width 90%;
    margin-top 50px
  }
  .box{
    width 90%
    margin 0 auto
    img{
      width 100%
    }
  }
  .test{
    height 500px;
    width 100%
    background red
  }
</style>
