# extentions

### Chrome 商店链接[https://chrome.google.com/webstore/detail/%E5%BF%AB%E6%8D%B7%E8%A1%A8%E6%83%85%E6%90%9C%E7%B4%A2/jgnhibgfofllcbdhhbakpnaignhbbcke?hl=zh-CN&gl=US](https://chrome.google.com/webstore/detail/%E5%BF%AB%E6%8D%B7%E8%A1%A8%E6%83%85%E6%90%9C%E7%B4%A2/jgnhibgfofllcbdhhbakpnaignhbbcke?hl=zh-CN&gl=US)

## 备注

处理图片转 gif 使用了 web worker，打包后的代码本地无法使用，需启动服务或放到线上。
gif.worker.js 独立放在了一个文件夹，因为 webpack 不处理它

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### chrome/mainifest.json 配置

```
{
 "content_scripts": [
    {
      <!-- 请求跨域地址设置 -->
      "matches": [
        "https://pic.sogou.com/napi/wap/pic/json.jsp/"
      ],
      <!-- js链入文件 -->
      "js": [
        "js/app.988b1547.js",
        "js/chunk-vendors.085602d1.js"
      ],
      <!-- css文件 -->
      "css": [
        "css/app.75e6020c.css",
        "css/chunk-vendors.779f7d1d.css"
      ],
      <!-- 执行事件 -->
      "run_at": "document_start"
    }
  ]
}
```

TODO: 更换了表情包接口，跟换了 manifest v3; 安装到浏览器有可能导致浏览器卡顿，待解决
