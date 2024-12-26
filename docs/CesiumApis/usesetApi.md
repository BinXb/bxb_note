<!-- 地球工具 -->
# 地球工具

## 雪天 - setSnow

setSnow(flag,size,speed)

参数：

> flag
> > 类型：Boolean
> >
> > 说明：开启/关闭
> >
> > 默认值：
>
> size
> > 类型：Number
> >
> > 说明：大小
> >
> > 默认值：20
>
> speed
> > 类型：Number
> >
> > 说明：速度
> >
> > 默认值：210

示例：
```js
globalEarth.CommonUseSet.setSnow(true);//开启
globalEarth.CommonUseSet.setSnow(false);//关闭
```

## 雨天 - setRan

setRan(flag,inc,size,apeed)

> flag
> > 类型：Boolean
> >
> > 说明：是否开启
> >
> > 默认值：
>
> inc
> > 类型：Number
> >
> > 说明：倾斜角度
> >
> > 默认值：-0.6
>
> size
> > 类型：Number
> >
> > 说明：大小
> >
> > 默认值：0.6
>
> speed
> > 类型：Number
> >
> > 说明：速度
> >
> > 默认值：120.0

示例：
```js
globalEarth.CommonUseSet.setRan(true);//开启
globalEarth.CommonUseSet.setRan(false);//关闭
```

## 雾天 - setFog

setFog(flag,alpha)

> flag
> > 类型：Boolean
> >
> > 说明：是否开启
> >
> > 默认值：
>
> alpha
> > 类型：Number
> >
> > 说明：烟雾浓度
> >
> > 默认值：0.4

示例：
```js
globalEarth.CommonUseSet.setFog(true);//开启
globalEarth.CommonUseSet.setFog(false);//关闭
```

## 阴影 - setShadows

setShadows(flag)

> flag
> > 类型：Boolean
> >
> > 说明：是否开启
> >
> > 默认值：

示例：
```js
globalEarth.CommonUseSet.setShadows(true);//开启
globalEarth.CommonUseSet.setShadows(false);//关闭
```

## 深度 - depthTest

depthTest(flag)

> flag
> > 类型：Boolean
> >
> > 说明：是否开启
> >
> > 默认值：

示例：
```js
globalEarth.CommonUseSet.depthTest(true);//开启
globalEarth.CommonUseSet.depthTest(false);//关闭
```

## 网格 - terrainwireframe

terrainwireframe(flag)

> flag
> > 类型：Boolean
> >
> > 说明：是否开启
> >
> > 默认值：

示例：
```js
globalEarth.CommonUseSet.terrainwireframe(true);//开启
globalEarth.CommonUseSet.terrainwireframe(false);//关闭
```

## 泛光 - setBloom

setBloom(flag)

> flag
> > 类型：Boolean
> >
> > 说明：是否开启
> >
> > 默认值：

示例：
```js
globalEarth.CommonUseSet.setBloom(true);//开启
globalEarth.CommonUseSet.setBloom(false);//关闭
```

## 抗锯齿 - setFxaa

setFxaa(flag)

> flag
> > 类型：Boolean
> >
> > 说明：是否开启
> >
> > 默认值：

示例：
```js
globalEarth.CommonUseSet.setFxaa(true);//开启
globalEarth.CommonUseSet.setFxaa(false);//关闭
```

## 地下 - setUnderground

setUnderground(flag)

> flag
> > 类型：Boolean
> >
> > 说明：是否开启
> >
> > 默认值：

示例：
```js
globalEarth.CommonUseSet.setUnderground(true);//开启
globalEarth.CommonUseSet.setUnderground(false);//关闭
```

## 显隐 - globeVisible

globeVisible(flag)

> flag
> > 类型：Boolean
> >
> > 说明：是否开启
> >
> > 默认值：

示例：
```js
globalEarth.CommonUseSet.globeVisible(true);//开启
globalEarth.CommonUseSet.globeVisible(false);//关闭
```

## 透明度 - setGlobeAlpha

setGlobeAlpha(num)

> num
> > 类型：Number
> >
> > 说明：透明度
> >
> > 默认值：1

示例：
```js
globalEarth.CommonUseSet.setGlobeAlpha(0.6);//开启
```

## 打印 - exportViewer

示例：
```js
globalEarth.CommonUseSet.exportViewer();
```

## 全屏 - FullMap

示例：
```js
globalEarth.CommonUseSet.FullMap();
```

## 模型隐藏 - modelHideOpen

示例：
```js
globalEarth.CommonUseSet.modelHideOpen();
```

## 模型显示 - modelHideClose

示例：
```js
globalEarth.CommonUseSet.modelHideClose();
```

