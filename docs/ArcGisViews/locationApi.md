# 定位

::: tip 
通过map对象的方法可以实现定位效果`centerAndZoom`、`setExtent`,可以定位点，也可以定位面
:::

## 进行定位的map方法

### map.centerAndZoom

`说明：用于设置地图中心点和缩放级别`

map.centerAndZoom(center,zoom)

center - 中心点

> value: 中心点坐标

zoom - 缩放级别

> value: number

实例：

```js
let graphic = await drawPolygonByPointsApi(_this.map,points);//创建面
// graphic.geometry.getExtent() - 形状的坐标组
// graphic.geometry.getExtent().getCenter() - 形状所在位置的中心点坐标
// 15缩放级别
this.map.centerAndZoom(graphic.geometry.getExtent().getCenter(),15);

```

### map.setExtent

`通过setExtent方法来设置地图显示范围，模拟实现定位的效果`

map.setExtent(extent)

extent

> value: 显示范围

实例：

```js
let graphic = await drawPolygonByPointsApi(_this.map,points);
// expand()设置缩放比例
//将面的范围，设置到地图的范围也可以做到，类似定位效果
this.map.setExtent(graphic.geometry.getExtent().expand(1.5));
```

### centerAt(evt.mapPoint) - 定位中心点

map.centerAt(evt.mapPoint)

