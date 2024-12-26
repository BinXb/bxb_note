<!-- 三维工具 -->

# 三维工具

## 获取鼠标当前位置 - getCurrentMousePosition

getCurrentMousePosition()

示例：

```js
let position = globalEarth.Tool.getCurrentMousePosition();
console.log(position);
```

## 获取相机当前姿态数据 - getCameraView

getCameraView(viewer)

> viewer
>
> 说明：地球（globalEarth.viewer）

示例：

```js
let obj = globalEarth.Tool.getCameraView(viewer);
```

## 获取两点的中心点 - getMidPosition

getMidPosition(t , e)

> t,e
>
> 说明：笛卡尔坐标

示例：

```js
let t = {
  x: -2708302.177344939,
  y: 4701901.5325118145,
  z: 3341051.060163092,
};
let e = {
  x: -2708293.1458729664,
  y: 4701914.060276213,
  z: 3341042.4133265074,
};
let mid = globalEarth.Tool.getMidPosition(t, e);
```

## 笛卡尔转经纬度 - CartesiansToLngLats

CartesiansToLngLats(position,flag)

> position
>
> > 说明：笛卡尔坐标
>
> flag
>
> > 说明：true 返回一维数组、false 返回二维数组

示例：

```js
let position = [
  {
    x: -2708302.177344939,
    y: 4701901.5325118145,
    z: 3341051.060163092,
  },
  {
    x: -2708292.4916460603,
    y: 4701903.831459629,
    z: 3341055.6808458273,
  },
  {
    x: -2708287.995879581,
    y: 4701913.430771285,
    z: 3341045.845717428,
  },
  {
    x: -2708293.1458729664,
    y: 4701914.060276213,
    z: 3341042.4133265074,
  },
];
// 一维数组
let point1 = globalEarth.Tool.CartesiansToLngLats(position, true);
// 二维数组
let point2 = globalEarth.Tool.CartesiansToLngLats(position, false);
```

## 经纬度转笛卡尔 - LngLatsToCartesians

LngLatsToCartesians(position)

> position
>
> > 说明:经纬度坐标

示例：

```js
let position = [
  [119.942006, 31.794135, 0],
  [119.941905, 31.794184, 0],
  [119.941813, 31.79408, 0],
  [119.941857, 31.794039, 0.8],
];
let point = globalEarth.Tool.LngLatsToCartesians(position);
```

## 点选对象（三维信息查询、模型高亮） - SelectObject

SelectObject()

- 开启
  > SelectObj()
- 关闭
  > stop()

示例：

```js
// 开启
globalEarth.SelectObject.selectObj((obj, point) => {
  console.log(obj); //信息
  console.log(point); //坐标点
});
// 关闭
globalEarth.SelectObject.stop();
```

## 点选图层(二维信息查询) - getPickInfo

`适用于二维信息查询`

getPickInfo(position,viewer)

> position - 笛卡尔坐标
>
> viewer - 地球 GlobalEarth.viewer

示例：

```js
let config = {
  position: {
    x: -2708302.22022029,
    y: 4701901.5339981755,
    z: 3341051.059691208,
  },
};
let info = globalEarth.Tool.getPickInfo(viewer, config);
```

## 信息弹窗 - imgPopup

`可用于自定义信息弹窗、适用于二三维`

imgPopup(config)

> titlew - 弹窗标题
>
> position - 笛卡尔坐标
>
> viewer - 地球 GlobalEarth.viewer
>
> imgurl - 弹窗背景图片路径
>
> contenttext - 弹窗内容（1.json 对象、2.dom 元素）
>
> uuid - 同时显示多个弹窗，id 不可重复
>
> appID - 加载地球 dom 元素的 id
>
> line - 角标位置（left、center、right）

示例：

```js
let config = {
  titlew: "信息弹窗",
  contenttext: [
    {
      序号: "01",
      姓名: "王五",
      文本内容: "信息弹窗",
      时间: "2023-12-22  08:36:10",
    },
  ],
  //"contenttext": ' <div class="text_cont"><div class="name">'+"姓名:外网"+'</div><div class="value">'+"姓名:外网"+'</div><img src="../assets/tk-1.png" /></div>',
  //"domclass": "",(不用传)
  uuid: "info",
  appID: "cesiumContainer",
  line: "left",
};
//加载弹窗
let popup = globalEarth.imgPopup.creatPopup(viewer, config, position, imgurl);
//控制显隐
popup.ShowOrHide(uuid, true / false);
//销毁
popup.destory();
```

## 普通弹窗 - PopWindow

PopWindow(data,position,htmlstr,width,height)

> data - json 内容
>
> position - 笛卡尔坐标
>
> htmlstr - html 片段
>
> width - 弹窗宽度
>
> height - 弹窗高度

示例：

```js
let position: {
  x: -2708302.22022029,
  y: 4701901.5339981755,
  z: 3341051.059691208,
};
let htmlstr = ' <div class="text_cont">XXXXXXXXXXX</div>';
globalEarth.PopWindow.popShowHtml(htmlstr, position, 160, 80);
globalEarth.PopWindow.popShow(data, position, 160, 80);
//隐藏
globalEarth.PopWindow.popHide();
```

## 材质 - createMaterial

createMaterial(config)

config -

> type - 创建类型（颜色：Color、水面：Water、图片：Image）
>
> color - 颜色
>
> imgurl - 图片路径
>
> IsAlpha - 图片是都透明（true、false）
>
> frequency - 水面波动频率（1000）
>
> animationSpeed - 动画速度（0.02）
>
> amplitude - 水面振幅（5.0）
>
> specularIntensity - 镜面反射强度（5.0）
>
> repeatX - 横向重复个数（1）
>
> repeatY - 纵向重复个数（1）

示例：

```js
let config: {
  type: "", //type为空默认为颜色
  color: "",
  imgurl: "",
  IsAlpha: false,
  frequency: 1000.0,
  animationSpeed: 0.02,
  amplitude: 5.0,
  specularIntensity: 5.0,
  repeatX: 1,
  repeatY: 1,
};
let material = globalEarth.Tool.createMaterial(config);
```

## 钳击箭头 - CartesiansToPincerArrowPoints

CartesiansToPincerArrowPoints(points)

> points - 笛卡尔坐标数组

示例：

```js
let points: [
  {
    x: -2709971.050469433,
    y: 4702214.8386326255,
    z: 3339281.594229358,
  },
  {
    x: -2710634.810332343,
    y: 4701956.339871428,
    z: 3339108.1071455413,
  },
  {
    x: -2710639.5666858885,
    y: 4702226.428410219,
    z: 3338726.6287194276,
  },
  {
    x: -2709998.274988554,
    y: 4702595.197878873,
    z: 3338727.8193600583,
  },
  {
    x: -2710217.5236139405,
    y: 4702130.63798729,
    z: 3339200.7238147114,
  }
];
let positions = globalEarth.Tool.CartesiansToPincerArrowPoints(points);
```

## 阵型坐标 - CartesiansToFormationPoints

CartesiansToFormationPoints(points,type)

> points - 笛卡尔坐标数组
>
> type - 0:防御、1:进攻

示例：

```js
let points: [
  {
    x: -2709971.050469433,
    y: 4702214.8386326255,
    z: 3339281.594229358,
  },
  {
    x: -2710634.810332343,
    y: 4701956.339871428,
    z: 3339108.1071455413,
  },
  {
    x: -2710639.5666858885,
    y: 4702226.428410219,
    z: 3338726.6287194276,
  },
  {
    x: -2709998.274988554,
    y: 4702595.197878873,
    z: 3338727.8193600583,
  },
  {
    x: -2710217.5236139405,
    y: 4702130.63798729,
    z: 3339200.7238147114,
  }
];
let positions = globalEarth.Tool.CartesiansToFormationPoints(points);
```

## 进攻箭头坐标 - CartesiansToAttackArrowPoints

CartesiansToAttackArrowPoints(points)

> points - 笛卡尔坐标数组

示例：

```js
let points: [
  {
    x: -2709971.050469433,
    y: 4702214.8386326255,
    z: 3339281.594229358,
  },
  {
    x: -2710634.810332343,
    y: 4701956.339871428,
    z: 3339108.1071455413,
  },
  {
    x: -2710639.5666858885,
    y: 4702226.428410219,
    z: 3338726.6287194276,
  },
  {
    x: -2709998.274988554,
    y: 4702595.197878873,
    z: 3338727.8193600583,
  },
  {
    x: -2710217.5236139405,
    y: 4702130.63798729,
    z: 3339200.7238147114,
  }
];
let positions = globalEarth.Tool.CartesiansToAttackArrowPoints(points);
```
