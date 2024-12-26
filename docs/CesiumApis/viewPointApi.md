<!-- 视点定位 -->

# 视点定位

## 加载视点 - init

`获取视点列表中已有的视点`

示例：

```js
globalEarth.ViewPoint.init();
```

## 新增视点 - add

add(name,type)

> name - 视点名称
>
> type - 视点类型（1.飞行视点、2.定位视点）

示例：

```js
globalEarth.Viewer.add("视点1", 1);
```

## 删除视点 - del

del(name)

> name - 对应视点名称

示例：

```js
globalEarth.Viewer.del("视点1", 1);
```

## 上传视点到列表 - jsonFileLoad

jsonFileLoad(data)

> data - 视点对应的数组

示例：

```js
let data = [
  {
    name: "视点一",
    type: 2,
    data: {
      x: 142.554699,
      y: -5.648204,
      z: 2841488.5,
      heading: 23.3,
      pitch: -89.8,
      roll: 0,
    },
  },
];
globalEarth.ViewPoint.jsonFileLoad(data);
```

## 下载视点列表 - jsonFileSave

jsonFileSave(name)

> name - 为下载的文件命名

示例：

```js
globalEarth.ViewPoint.jsonFileSave("视点");
```

## 设置视点位置 - setView

setView(point)

> point - 视点要切换到的位置

示例：

```js
let point = {
  x: 142.554699,
  y: -5.648204,
  z: 2841488.5,
  heading: 23.3,
  pitch: -89.8,
  roll: 0,
};
globalEarth.ViewPoint.setView(point);
```

## 视点定位 - flyObj、flyTo

flyObj(obj,duration)

flyTo(point,duration)

> obj - 实体对象(模型、entity对象)
>
> point - 视点坐标
> 
> duration - 定位所用的飞行时间

示例：

```js
// 可通过时间参数控制定位动画时长
globalEarth.ViewPoint.flyObj(obj,3)
globalEarth.ViewPoint.flyTo(point,3)
```