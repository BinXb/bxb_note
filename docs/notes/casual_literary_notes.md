# 随笔

### window.postMessage

`父子窗口通信`多用于页面嵌套`iframe`可以进行页面通信

举个栗子 -

父传子通讯

::: code-group

```js [父窗口]
// 父页面
// 获取子页面窗口
let chi = document.getElementById("myIframe").contentWindow;
// 向子窗口页面发送
chi.postMessage("hello world", "*");
// postMessage(message,origin) - 参数：信息，来源
```

```js [子窗口]
window.addEventListener("message", function (event) {
  console.log(event.data);
  // 查看来源
  console.log(event.origin);
});
```

:::

子传父通讯

::: code-group

```js [子窗口]
function send() {
  window.parent.postMessage("Hello", "*");
}
```

```js [父窗口]
window.addEventListener("message", function (event) {
  console.log(event.data);
});
```

:::

### nodejs 命令：

清缓存:npm cache clean --force

### nvm 包管理器命令：

下载版本：nvm install 版本号

切换版本：nvm use 版本号

查看已安装版本：nvm list

### yarn 安装配置

npm yarn

### git 常用命令

【git 新建分支】

`git checkout -b bwl` // 新建并切换到新建分支

`checkout` - 切换分支

-b 新建分支

// 删除分支 - 分支分为本地分支和远程分支

`git branch -D 分支名称` //git branch -D bwl 删除本地分支

`git push origin -d 分支名称` // git push origin -d bwl 删除远程分支

`git checkout bwl` // 切换到 bwl 分支

【合并主分支】

//更新分支

`git push origin bwl`

// 切换到主分支

`git checkout master`

// 查看当前分支

`git branch`

//合并到主分支

`git merge bwl`

// 拉取主分支最新记录

`git pull`

// 推送到主分支

`git push origin master`

//切换到分支

`git checkout bwl`

【git 删除项目/新建项目】

// 删除此 git 项目

`rm -rf .git` // rm - 删除 -rf - 不需要确认

// 新建项目

`git init` // 初始化 git

// 新建项目

git remote add origin http....

// 初始化

`git add .`

`git commit - m "初始化"`

`git push origin master` // 推送到远程仓库

如果出现报错“ LF will be replaced by CRLF ...”

尝试命令：

`git config core.autocrlf true`

// 回退指定版本

先用`git log`查看版本信息，选择需要回退的版本

再用`git checkout commit` 回退的指定版本

```Git
git log

git checkout 0204039848bc79d2f5fb56f6d0713d9d944175a3

```

回退版本前尽量将本地代码提交之后保证工作区为最新的代码

使用`git checkout commit`方法回退好处就是不会丢失之前提交的代码

`切换本地git账号`

git config --list // 查看账号是否符合

git config --global user.name "你的账号名称"
git config --global user.email "你的邮箱"

// 修改本地ssh
ssh-keygen -t rsa -C "设置的邮箱"

`git修改分支名称`

前提：本地分支已经同步更新远程分支

1.重命名远程分支对应的本地分支
```shell
git branch -m oldBranchName newBranchName
```

2.删除远程分支
```shell
git push --delete origin oldBranchName
```

3.上传新的本地分支
```shell
git push origin newBranchName
```

## Echarts 不常用但实用属性

设置阴影模糊值

```js
option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      itemStyle: {
        normal: {
          borderRadius: [300, 300, 0, 0], //设置圆角 - 左上、右上、右下、左下
          shadowOffsetX: 0, //水平偏移量
          shadowOffsetY: 0, //垂直偏移量
          shadowColor: "rgba(255, 0, 0, 1)", // 阴影颜色
          shadowBlur: 10, //羽化值
          // 柱状图填充色 - 可以是纯色或者渐变色
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#FFABAC",
              // #29a5a4,#79b3b2
            },
            {
              offset: 1,
              color: "#FF6772",
            },
          ]),
        },
      },
      // 鼠标放置显示模式 - hover
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#f00" },
            { offset: 0.7, color: "#2378f7" },
            { offset: 1, color: "#83bff6" },
          ]),
        },
      },
    },
  ],
};
```

如果想针对每一块数据单独设置样式

```js
// 柱状图
option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [
        120,
        {
          value: 200,
          itemStyle: {
            borderRadius: [300, 300, 0, 0],
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 10,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#FFABAC",
                // #29a5a4,#79b3b2
              },
              {
                offset: 1,
                color: "#FF6772",
              },
            ]),
          },
        },
        150,
        80,
        70,
        110,
        130,
      ],
      type: "bar",
      itemStyle: {
        normal: {
          borderRadius: [300, 300, 0, 0], //设置圆角 - 左上、右上、右下、左下
          shadowOffsetX: 0, //水平偏移量
          shadowOffsetY: 0, //垂直偏移量
          shadowColor: "rgba(255, 0, 0, 1)", // 阴影颜色
          shadowBlur: 10, //羽化值
          // 柱状图填充色 - 可以是纯色或者渐变色
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#FFABAC",
              // #29a5a4,#79b3b2
            },
            {
              offset: 1,
              color: "#FF6772",
            },
          ]),
        },
      },
      // 鼠标放置显示模式 - hover
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#f00" },
            { offset: 0.7, color: "#2378f7" },
            { offset: 1, color: "#83bff6" },
          ]),
        },
      },
    },
  ],
};
```

```js
// 环形图
option = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: 1048,
          name: "Search Engine",
          // 单独设置样式
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#f00" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
};
```

## 简单使用三方拖拽库

`sortable.js`

github地址：[sortableJs](!https://github.com/SortableJS/Sortable)

引入 npm 或 直接引入

::: code-group

```shell [npm引入]
npm install sortablejs --save
```

```html [cdn引入]
// 这里使用的是相对路径
<script src="./js/sortable-1.15.6-min.js"></script>
```

:::

### 使用

```vue
<template>
  <div id="app">
    <div class="list" id="list">
      <div data-id="1">1</div>
      <div data-id="2">2</div>
      <div data-id="3" class="not-sort">3</div>
      <div data-id="4">4</div>
      <div data-id="5">5</div>
      <div data-id="6">6</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    initTreeData() {
      let el = document.getElementById("list");
      console.log(el);

      var sortable = new Sortable(el, {
        animation: 150,
        sort: true,
        ghostClass: "blue-background-class",
        // 通过类名过滤不需要拖动的元素
        filter:".not-sort",
        //拖动结束
        onEnd: function (evt) {
          console.log(evt);
          //获取拖动后的排序
          var arr = sortable.toArray();
        },
      });
      console.log(sortable);
    },
  },
  created() {},
  mounted() {
    this.initTreeData();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
