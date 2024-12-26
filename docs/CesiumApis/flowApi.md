<!-- 动态对象 -->

# 动态对象

## 墙体类 - addWall

addWall(position,config)

> position
>
> > 类型：Array
> > 说明：笛卡尔积坐标点、线、面
>
> config
>
> > 类型/值：Object
> >
> > color - 颜色（16 进制）
> >
> > width - 宽度（5.0）
> >
> > Alpha - 透明度（0.6）
> >
> > duration - 闪烁时间（3000）
> >
> > minheight - 最小高度（0）
> >
> > maxheight - 最大高度（1500）

示例：

```js
// position = [{"x":,"y":,"z":}]
globalEarth.Flow.addWall(position, config);
```

## 扫描雷达类 - addRadarScanPostStage

addRadarScanPostStage(position,config)

> position
>
> > 类型：Array
> > 说明：笛卡尔积坐标点、线、面
>
> config
>
> > 类型/值：Object
> >
> > radius - 半径（10）
> >
> > speed - 扫描速度（15.0）
> >
> > height - 离地高度（20）
> >
> > color - 扫描颜色（16 进制）
> >
> > outline - 是否显示外框（true，false）
> >
> > outlineColor - 外框颜色（16 进制）

```js
globalEarth.Flow.addRadarScanPostStage(position, config);
```

## 扩散雷达类 - addWarnings

addWarnings(position,config)

> position
>
> > 类型：Object
> >
> config
> > 类型：Object
> >
> > semiMinor - 短半轴(10)
> >
> > semiMaj - 长半轴(10)
> >
> > duration - 扩散持续时间(3000)
> >
> > height - 离地高度(20)
> >
> > color - 扩散颜色(16 进制)
> >
> > Alpha - 透明度(0.6)
> >
> > num - 扩散波数量(2)
> >
> > gradient - 渐变(0.6)

示例：

```js
// position = {"x":,"y":,"z":}
globalEarth.Flow.addWarnings(position, config);
```

## 流动箭头类 - addJtLine

addJtLine(position,config)

> position
>
> > 类型：Array
> >
> config
> > 类型：Object
> >
> > width - 宽度(20)
> >
> > duration 流动速度(3000)
> >
> > color - 颜色
> >
> > repeat - 箭头重复个数(80)

示例：

```js
// position = [{"x":,"y":,"z":}]
globalEarth.Flow.addJtLine(position, config);
```

## 水面类 - addWater

addWater(position,config)

> position
>
> > 类型：Array
> >
> > 说明：笛卡尔坐标点、面
> >
> config
> > 类型：Object
> >
> > height - 水面高度（2.0）
> >
> > fre - （2000）
> >
> > speed - 晃动频率（0.04）

示例：

```js
globalEarth.Flow.addWater(position, config);
```

## 河流类 - addRiver

addRiver(position.config)

> position
>
> > 类型：Array
> >
> > 说明：笛卡尔坐标点、线
> >
> config
> > 类型：Object
> >
> > height - 水面高度（2.0）
> >
> > width - 水面宽度（2）
> >
> > alpha - 透明度（0.4）

示例：

```js
globalEarth.Flow.addRiver(position, config);
```

## 飞线类：addFlyline

addFlyline(center,config,position)

> center
>
> > 类型：Object
> >
> > 说明：笛卡尔坐标点
> >
> config
> > 类型：Object
> >
> > height - 最大高度(2000)
> >
> > num - 竖直飞线数量(20) "抛物线数量取决于坐标点个数"
> >
> > color - 竖直飞线颜色 "不设置即随机色"
> >
> > speed - 速度
> >
> > percent - 密度
> >
> > gradient
> >
> > step - 步长
> >
> > type - 飞线类型（"竖直飞线","抛物线"）
> >
> > width - 线轨宽度
> >
> > outwidth - 飞线宽度
> >
> > mater - 抛物线颜色
> >
> > position - （抛物线）
> > 类型：Array
> > 说明：经纬度坐标（点集合）

示例：

```js
// center = {"x":,"y":,"z":}
// position = [[120,31],[119,31]];
// 竖直飞线
globalEarth.Flow.addFlyline(center, config);
// 抛物线
globalEarth.Flow.addFlyline(center, config, position);
```

## 旋转类 - addcircleRotate

addcircleRotate(position,config)

> position
>
> > 类型：Object
> >
> > 说明：笛卡尔坐标点（中心点）
> >
> config
> > 类型：Object
> >
> > id
> >
> > height - 高度
> >
> > semiMin - 水面宽度（短半轴）
> >
> > semiMaj - 长半轴
> >
> > url - 图片
> >
> > label - 文字及颜色`label:{text:"",color:""}`

示例：

```js
// position = {"x":,"y":,"x":};
// config = {
//   "id":"c01",
//   "height":"20",
//   "semiMin":"40",
//   "semiMaj":"40",
//   "url":"...",
//   "label":{
//     "text":"文字",
//     "color":"#f00"
//   }
// }
globalEarth.Flow.addcircleRotate(position,config);
```

## 热力图 - addHeatmap

addHeatmap()

create(viewer,bounds,config)

setWGS84Data()

> viewer
>
> > 类型：Object
> > 说明：视图层
> >
> > bounds
> > 类型：Object
> > 说明：矩阵坐标
> >
> > config
> > 类型：Object
> >
> > backgroundColor - 背景色
> >
> > radius - 圆角
> >
> > maxOpacity - 最大透明度
> >
> > minOpacity - 最小透明度
> >
> > blur
> >
> > gradient - 渐变色
> >

示例：

```js
// 坐标热力值
// position = [
//     {
//         "x": 119.914938171,
//         "y": 31.955584011499393,
//         "value": 33.9555840114994
//     },
//     {
//         "x": 119.84671717399999,
//         "y": 32.014020807199394,
//         "value": 34.014020807199394
//     }
//     ...
// ]
// // 矩阵坐标
// bounds = {
//           west: 119.08,
//           south: 31.09,
//           east: 120.12,
//           north: 32.04,
//       };
// // 配置参数
// config = {
//           backgroundColor: "rgba(0,0,0,0)",
//           radius: 30,
//           maxOpacity: 0.5,
//           minOpacity: 0,
//           blur: 0.75,
//           gradient: {
//             0.25: "rgb(0,0,255)",
//             0.55: "rgb(0,255,0)",
//             0.85: "red",
//             1.0: "rgb(255,0,0)",
//           },
//         }
// 创建
let heatMap = globalEarth.Flow.addHeatmap();
heatmap.create(globalEarth.viewer,bounds,config);
heatmap.setWGS84Data(0,100,position);
// 销毁
heatmap.destory()
```
