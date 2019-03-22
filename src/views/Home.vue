<template>
  <v-app class="home">
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
      <img src="../assets/img/home.png" class="bj">
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

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      dialog: false,
      value: ''
    }
  },
  mounted () {
    console.log(`运行环境：${process.env.NODE_ENV}`)
  },
  methods: {
    doSearch () {
      if (!this.value) {
        this.dialog = true
        return
      }
      this.$router.push({ path: '/about', query: { keyword: this.value } })
    }
  }
}
</script>

<style lang="stylus">
  .bj {
    width 90%;
    margin-top 50px
  }
</style>
