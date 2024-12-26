<!-- 绘制事件 -->
# 绘制事件

`所有的事件都带一个参数，即回调函数`

## 点 - drawPoint()

## 线 - drawLine()

## 面 - drawPolygon()

## 圆 - drawCircle()

## 围墙 - drawWall()

## 多边形 - drawPolylineVolume()

## 管道 - drawPolygonVolume()

## 盒子 - drawBox()

## 球 - drawSphere()

## 圆柱 - drawCylineder()

## 钳击箭头 - drawPincerArrow()

## 防御/进攻阵型 - drawFormation()

## 攻击箭头 - drawAttackArrow()

示例：

```js
globalEarth.Draw.drawPoint(res => {
  console.log(res);//坐标点信息
})
```