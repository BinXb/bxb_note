<!-- 漫游控制 -->

# 漫游控制

## 加载漫游事件 - init

init(point,url,type,viewtype)

> point
>
> > 类型：Object
> >
> > 说明：漫游起点
> >
> > url
> > 类型：String
> >
> > 说明：模型服务地址
> >
> > type
> > 类型：Number
> >
> > 说明：动画类型（1.人车动画、2.飞机动画） - 默认人车动画
> >
> > viewtype
> > 类型：Number
> >
> > 说明：视角（1.第一人称、2.自由模式、3.第三人称） - 默认第三人称

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
url = "http:...";
type = 1;
viewtype = 2;
globalEarth.AnimationOperation.init(point,url,type,viewtype)
```

## 结束 - clear

clear()

```js
globalEarth.AnimationOperation.clear()
```

## 模型控制

> W - 向前（飞机 - 抬升）
>
> S - 向后（飞机 - 下降）
>
> A - 向左
> 
> D - 向右
> 
> \+ - 加速
> 
> \- - 减速
> 
> shift+A - 向左倾斜（飞机）
> 
> shift+B - 向右倾斜（飞机）
