<!-- 路线漫游/飞行动画 -->

# 飞行动画

1. 加载本地路线数据列表

2. 添加路线

3. 删除路线

4. 编辑路线

5. 上传数据

6. 下载数据

7. 初始化事件（加载模型）

8. 开始漫游

9. 暂停

10. 继续

11. 结束

12. 改变视角

13. 设置循环

14. 设置漫游路线

15. 设置路线类型

16. 控制速度

## 加载已有路线数据 - loadData

`加载本地路线数据列表`

loadData()

```js
// 加载数据
let data = globalEarth.PathFly.loadData();
```

## 添加路线 - addPath

addPath(data)

> data
>
> > 类型：Object
> >
> > 说明：路线点坐标集合

示例：

```js
data = {
  guid: "61956da4-9cc7-47bb-b3de-3d4d564255fc",
  name: "newLine",
  points: [
    {
      id: "p0",
      x: -2709102.258974286,
      y: 4701292.87473466,
      z: 3341256.8371592355,
      height: 150,
      speed: 10,
      handing: 0,
      pitch: -25,
      roll: 0,
    },
    {
      id: "p1",
      x: -2708868.1842729505,
      y: 4701381.9087603325,
      z: 3341331.908717558,
      height: 150,
      speed: 10,
      handing: 0,
      pitch: -25,
      roll: 0,
    },
    {
      id: "p2",
      x: -2708707.084415765,
      y: 4701434.27919681,
      z: 3341383.7495167656,
      height: 150,
      speed: 10,
      handing: 0,
      pitch: -25,
      roll: 0,
    },
    {
      id: "p3",
      x: -2708671.291010983,
      y: 4701679.248935644,
      z: 3341198.8896885067,
      height: 150,
      speed: 10,
      handing: 0,
      pitch: -25,
      roll: 0,
    },
    {
      id: "p4",
      x: -2708671.2908991184,
      y: 4701679.249084873,
      z: 3341198.8899371466,
      height: 150,
      speed: 10,
      handing: 0,
      pitch: -25,
      roll: 0,
    },
  ],
};
globalEarth.PathFly.addPath(data);
```

## 删除路线 - delPath

`通过路线名称删除对应路线数据`

delPath(name)

> name
>
> > 类型：String
> >
> > 说明：已知路线名称

示例：

```js
globalEarth.PathFly.delPath("newLine");
```

## 编辑路线 - editPath

editPath(data)

示例：

```js
let newPath = {
  guid:"...",
  name:"...",
  points:[{...},{...}]
};

globalEarth.PathFly.editPath(newPath)
```

## 上传数据 - jsonFileLoad

jsonFileLoad(data)

示例：

```js
globalEarth.PathFly.jsonFileLoad(data);
```

## 下载数据 - jsonFileSave

jsonFileSave(name)

示例：

```js
globalEarth.PathFly.jsonFileSave(name);
```

## 初始化事件(加载模型) - init

`初始化事件，为漫游操作做好准备`

init(point,url)

> point
>
> > 类型：Object
> >
> > 说明：漫游起点位置
> >
> > url
> > 类型：String
> >
> > 说明：模型服务地址

示例：

```js
point = {
  x: 142.554699,
  y: -5.648204,
  z: 2841488.5,
  heading: 23.3,
  pitch: -89.8,
  roll: 0,
};
url = "http://....";
globalEarth.PathFly.init(point,url );
```

## 开始漫游 - start

start(num)

> num
> > 类型：Number
> >
> > 说明：漫游视角（1.第一人称、2.自由模式、3.第三人称）

示例：

```js
globalEarth.PathFly.start(2);
```

## 暂停 - pause

`暂停漫游动画`

```js
globalEarth.PathFly.pause();
```

## 继续 - resume

`继续漫游动画`

```js
globalEarth.PathFly.resume();
```

## 清除 - clear

`清除漫游动画`

```js
globalEarth.PathFly.clear();
```

## 改变视角 - setPersonView

`设置漫游视角`

setPersonView(num)

> num
> > 类型：Number
> >
> > 说明：漫游视角（1.第一人称、2.自由模式、3.第三人称）

示例：

```js
globalEarth.PathFly.setPersonView(2)
```

## 设置循环 - setLoop

setLoop(flag)

> flag
> > 类型：Boolean
> >
> > 说明：是否循环（true、false）

示例：

```js
globalEarth.PathFly.setLoop(false);
```

## 漫游路线 - setLineVisible

`设置漫游路线是否显示`

setLineVisible(flag)

> flag
> > 类型：Boolean
> > 
> > 说明：路线是否显示（true、false）

示例：

```js
globalEarth.PathFly.setLineVisible(true)
```

## 设置路线类型 - setCurve

setCurve(flag)

> flag
> > 类型：Boolean
> > 
> > 说明：路线是否显示（true:曲线、false:直线）

示例：

```js
globalEarth.PathFly.setCurve(true)
```

## 控制速度 - timeControl

`控制漫游动画的速度`

timeControl(num)

> num
> > 类型：Number
> >
> > 说明：控制漫游速度（时间）

示例：

```js
globalEarth.PathFly.timeControl(2);
```