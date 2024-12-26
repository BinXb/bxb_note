<!-- 粒子特效 -->

# 粒子特效

`粒子特效可以通过remove方法移除`

## 加载火 - setFire

setFire(position,config)

> position
>
> > 类型：Object
> >
> > 说明：笛卡尔坐标
> >
> > config
> > emissionRate - 速率（5）
> >
> > gravity - 重力参数（"0.0"）
> >
> > minimumParticleLife - 最小粒子密度（"1"）
> >
> > maximumParticleLife - 最大粒子密度（"6"）
> >
> > minimumSpeed - 粒子发射最小速度（"1.0"）
> >
> > maximumSpeed - 粒子发射最大速度（"4.0"）
> >
> > startScale - 开始范围（"1.0"）
> >
> > endScale - 结束范围（"10.0"）
> >
> > particleSize - 粒子大小（"25.0"）

示例：

```js
// position = {"x":,"y":,"z":}
// config = {
//   emissionRate: 5,
//   gravity: 0,
//   minimumParticleLife: 1,
//   maximumParticleLife: 6,
//   minimumSpeed: 1,
//   maximumSpeed: 4,
//   startScale: 1,
//   endScale: 10,
//   particleSize: 25,
// };
globalEarth.SpecialEffects.setFire(position, config);
```

## 爆炸 - setExplot

setExplot(position,config)

> position
>
> > 类型：Object
> >
> > 说明：笛卡尔坐标
> >
> > config
> > emissionRate - 速率（5）
> >
> > gravity - 重力参数（"0.0"）
> >
> > minimumParticleLife - 最小粒子密度（"1"）
> >
> > maximumParticleLife - 最大粒子密度（"6"）
> >
> > minimumSpeed - 粒子发射最小速度（"1.0"）
> >
> > maximumSpeed - 粒子发射最大速度（"4.0"）
> >
> > startScale - 开始范围（"1.0"）
> >
> > endScale - 结束范围（"10.0"）
> >
> > particleSize - 粒子大小（"25.0"）

示例：

```js
// position = {"x":,"y":,"z":}
// config = {
//   emissionRate: 5,
//   gravity: 0,
//   minimumParticleLife: 1,
//   maximumParticleLife: 6,
//   minimumSpeed: 1,
//   maximumSpeed: 4,
//   startScale: 1,
//   endScale: 10,
//   particleSize: 25,
// };
globalEarth.SpecialEffects.setExplot(position, config);
```

## 烟雾 - setSmoke

setSmoke(position,config)

> position
>
> > 类型：Object
> >
> > 说明：笛卡尔坐标
> >
> > config
> > emissionRate - 速率（5）
> >
> > gravity - 重力参数（"0.0"）
> >
> > minimumParticleLife - 最小粒子密度（"1"）
> >
> > maximumParticleLife - 最大粒子密度（"6"）
> >
> > minimumSpeed - 粒子发射最小速度（"1.0"）
> >
> > maximumSpeed - 粒子发射最大速度（"4.0"）
> >
> > startScale - 开始范围（"1.0"）
> >
> > endScale - 结束范围（"10.0"）
> >
> > particleSize - 粒子大小（"25.0"）

示例：

```js
// config = {
//   emissionRate: 5,
//   gravity: 0,
//   minimumParticleLife: 1,
//   maximumParticleLife: 6,
//   minimumSpeed: 1,
//   maximumSpeed: 4,
//   startScale: 1,
//   endScale: 10,
//   particleSize: 25,
// };
// 加载烟雾
let smoke = globalEarth.SpecialEffects.setSmoke(position,config);
// 删除烟雾
smoke.remove();
```

都是一样的参数，不同的是方法

## 喷雾 - setSpray

setSpray(position,config)

示例：

```js
// 加载喷雾
let spray = globalEarth.SpecialEffects.setSpray(position,config);
// 删除喷雾
spray.remove();
```

## 喷泉 - setWater

setWater(position,config)

示例：

```js
// 加载喷泉
let water = globalEarth.SpecialEffects.setWater(position,config);
// 删除喷泉
water.remove();
```

## 风场 - setWind

setWind(position,config)

示例：

```js
// 加载风场
let wind = globalEarth.SpecialEffects.setWind(position,config);
// 删除风场
wind.remove();
```

## 雪天 - setSnow

setSnow(position,config)

示例：

```js
// 加载雪天
let snow = globalEarth.SpecialEffects.setSnow(position,config);
// 删除雪天
snow.remove();
```

## 雨天 - setRan

setRan(position,config)

示例：

```js
// 加载
let ran = globalEarth.SpecialEffects.setRan(position,config);
// 删除
ran.remove();
```

## 雾天 - setFog

setFog(position,config)

示例：

```js
// 加载
let fog = globalEarth.SpecialEffects.setFog(position,config);
// 删除
fog.remove();
```