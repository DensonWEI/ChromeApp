# extentions

### Chrome商店链接[https://chrome.google.com/webstore/detail/%E5%BF%AB%E6%8D%B7%E8%A1%A8%E6%83%85%E6%90%9C%E7%B4%A2/jgnhibgfofllcbdhhbakpnaignhbbcke?hl=zh-CN&gl=US](https://chrome.google.com/webstore/detail/%E5%BF%AB%E6%8D%B7%E8%A1%A8%E6%83%85%E6%90%9C%E7%B4%A2/jgnhibgfofllcbdhhbakpnaignhbbcke?hl=zh-CN&gl=US)

## 备注
处理图片转gif使用了web worker，打包后的代码本地无法使用，需启动服务或放到线上。
gif.worker.js 独立放在了一个文件夹，因为webpack不处理它


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



### chrome/mainifest.json配置
```
{
 "content_scripts": [
    {
      <!-- 请求跨域地址设置 -->
      "matches": [
        "https://pic.sogou.com/pics/json.jsp/" 
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