<!-- 静态对象 -->

# 静态对象

:::tip 提示
根据绘制事件得到的坐标位置，设置相应参数配置，创建对应实体对象

最终都返回创建的实体对象
:::

## 点类型 - addPoint

addPoint(position,config)

> position
>
> > 类型：Object
> >
> > 说明：笛卡尔坐标点
> >
> config
> >
> > 类型：Object
> >
> > id:点 ID
> >
> > name:点名称
> >
> > color:点颜色
> >
> > size:点大小
> >
> > outlineColor：点边缘颜色
> >
> > lineWidth

示例：

```js
// position = {"x":,"y":,"z":}
// config = {
//   id: "坐标轴专用点",
//   color: "#f00",
//   size: 15,
//   lineWidth: 2,
//   outlineColor: "#00f",
// };
globalEarth.createObj.addPoint(position, config);
```

## 线类型 - addPolyline

addPolyline(position,config)

> position
>
> > 类型：Array
> >
> > 说明：笛卡尔坐标点
> >
> config
> >
> > 类型：Object
> >
> > id - 线 ID
> >
> > name - 线名称
> >
> > color - 线颜色
> >
> > width - 线宽度
> >
> > Alpha - 透明度

示例：

```js
// position = [{"x":,"y":,"z":},{...}]
// config = {
//   width: 5,
//   color: "#FFD700",
//   minheight: 20,
//   maxheight: 100,
//   Alpha: 0.6,
// };
globalEarth.CreateObj.addPolyline(position, config);
```

## 面类型 - addPolygon

addPolygon(position,config)

`适用对象：普通平面、立体面、钳击箭头、攻击箭头等`

> position
>
> > 类型：Array
> >
> > 说明：笛卡尔坐标点
> >
> config
> > 类型：Object
> >
> > id - 面 ID
> >
> > name - 面名称
> >
> > height - 离地高度
> >
> > extrudedHeight - 厚度
> >
> > color - 面颜色
> >
> > Alpha - 透明度
> >
> > closeTop - 是否封顶（true、false）
> >
> > closeBottom - 是否封底（true、false）
> >
> > outlineWidth - 边框线宽度
> >
> > outline - 是否显示边框线（true、false）
> >
> > outlineColor - 边框线颜色
> >
> > Gradient - 是否设置渐变色（true、false）

示例：

```js
// position = [{"x":,"y":,"z":}]
// config = {
//   height: "0",
//   extrudedHeight: "0",
//   color: "#FFD700",
//   Alpha: "0.8",
//   closeTop: false,
//   closeBottom: true,
//   outlineWidth: "",
//   outline: false,
//   outlineColor: "",
// };
globalEarth.CreateObj.addPolygon(position, config);
// 如果设置贴地，就不传height和extrudedHeight
```

## 圆类型 - addCircle

`适用对象：圆、圆柱、圆锥、球体`

addCircle(position,config)

> position
>
> > 类型：Object
> >
> > 说明：笛卡尔坐标点
> >
> config
> > 类型：Object
> >
> > id
> >
> > name - 名称
> >
> > color - 颜色（16 进制）
> >
> > semiMin - 最小半径
> >
> > semiMaj - 最大半径
> >
> > outline - 是否显示边框（true、false）
> >
> > outlineWidth - 边框宽度
> >
> > outlineColor - 边框颜色
> >
> > stRotation
> >
> > length - 高度
> >
> > topRadius - 顶部半径（圆锥）
> >
> > bottomRadius - 底部半径（圆锥）
> >
> > type - 类型（圆、圆柱、圆锥、球）

示例：

```js
// position = {"x":,"y":,"z":}
// config = {
//   id: "1769351415-213110-410911-8111412-48159370106907",
//   color: "#FFD700",
//   semiMin: 21.80347415049127,
//   semiMaj: 21.80347415049127,
//   outline: true,
//   outlineColor: "#c02cd9",
//   outlineWidth: "",
//   stRotation: "",
//   length: "",
//   topRadius: "",
//   bottomRadius: "",
//   type: "圆",
// };
globalEarth.CreateObj.addCircle(position, config);
```

## 文字标记类 - addText

`适用对象：文字`

addText(position,config)

> position
>
> > 类型：Object
> >
> > 说明：笛卡尔坐标点
> >
> config
> > id
> >
> > color - 颜色
> >
> > name - 名称
> >
> > text - 文字

示例：

```js
// position = {"x":,"y":,"z":}
// config = {
//   id: "",
//   color: "#FFD700",
//   text: "公园",
// };
globalEarth.CreateObj.addText(position, config);
```

## 图片标记类 - addImg

`适用对象：图片`

addImg(position,config)

> position
>
> > 类型：Object
> >
> > 说明：笛卡尔坐标点
> >
> config
> > 类型：Object
> >
> > url - 图片地址
> >
> > height - 高度
> >
> > width - 宽度
> >
> > rotation - 逆时针旋转度数
> >
> > pixelOffset - 偏移量（{x:20,y:0}）
> >
> > minShow - 最小显示区间（0）
> >
> > maxShow - 最大显示区间（1500）

示例：

```js
// position = {
//   x: -2707457.783866934,
//   y: 4702366.562799605,
//   z: 3341087.6697505345,
// };
// config = {
//   url: "...",
//   height: "30",
//   width: "30",
//   rotation: "20",
//   pixelOffset: {
//     x: 10,
//     y: 5,
//   },
//   minShow: "0",
//   maxShow: "1500",
// };
globalEarth.CreateObj.addImg(position, config);
```

## 管道类 - addPolylineVolume

`适用对象：管道`

addPolylineVolume(config)

> config
>
> > 类型：Object
> >
> > positions - 笛卡尔坐标（线集合）
> >
> > width - 直径
> >
> > Alpha - 透明度

示例：

```js
// config = {
//   position: {
//     x: -2707457.783866934,
//     y: 4702366.562799605,
//     z: 3341087.6697505345,
//   },
//   Alpha: 0.8,
//   width: 5,
// };
globalEarth.CreateObj.addPolylineVolume(config);
```

## 模型类 - addNodel

addModel(position,config)

> position
>
> > 类型：Object
> >
> > 说明：笛卡尔坐标点
> >
> config
> > 类型：Object
> >
> > id
> >
> > name - 名称
> >
> > url - 模型地址
> >
> > minShow - 最小显示范围
> >
> > maxShow - 最大显示范围

示例：

```js
// config = {
//   id:"..."
//   name:"模型1"
//   url:"",   //模型地址
//   minShow:0,   //最小显示范围
//   maxShow:500,  //最大显示范围
// }
// position:{
//   "x": -2707457.783866934,
//   "y": 4702366.562799605,
//   "z": 3341087.6697505345
// }
let model = globalEarth.CreateObj.addModel(position,config)

```
