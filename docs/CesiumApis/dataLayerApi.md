<!-- 图层服务  -->

# 图层服务

## 加载图层 - initLayers

`拿到图层服务数据进行加载、给初始化的地球叠加相应图层`

initLayers(layerData)

> layerData - 服务数组

示例：

```js
globalEarth.DataLayer.initLayers(layerData);
```

## 定位图层 - layerCenterAt

`通过传入对应图层的guid，实现视角定位到该图层对应的为止`

layerCenterAt(guid)

> guid - 图层对应的 guid

示例：

```js
globalEarth.DataLayer.layerCenterAt(guid);
```

## 添加图层 - addLayer

`手动向图层服务中添加新的图层`

addLayer(guid,type,show,options,index,comlyops)

> guid - 图层对应的 guid
>
> type - 图层类型
>
> show - 是否显示（true、false）
>
> options - 图层配置
>
> index
>
> comlyops

示例：

```js
name = "影像";
guid = "x1244";
show = true;
// source: 'url',
type = "arcgis";
options = {
  name: "影像",
  type: "arcgis",
  url: "http://58.216.48.11:6080/arcgis/rest/services/Image_2021/MapServer",
  uuid: "x1244",
};
globalEarth.DataLayer.addLayer(guid,type,show,options);
```

## 获取图层 - getById

getById(guid)

> guid - 对应涂层Id

示例：

```js
globalEarth.DataLayer.getById(guid)
```

## 删除图层 - removeById

removeById(guid)

> guid - 图层id

示例：

```js
globalEarth.DataLayer.removeById(guid)
```

## 改变图层透明度 - setAlpha

> setAlpha(guid,value)
>
> guid - 图层对应id
> 
> value - 设置透明度数值

示例：

```js
globalEarth.DataLayer.setAlpha(guid,0.6)
```

控制图层显隐 - show、showLayer、setComLayerVisble

show(guid,isShow,node)

showLayer(guid,isShow,node)

setComLayerVisble(guid,index,visble)

> guid - 对应图层id
> 
> isShow/visble - 是否显示（true、false）
> 
> node - 图层目录树对应的node

示例：

```js
globalEarth.DataLayer.show(guid,true)
globalEarth.DataLayer.showLayer(guid,true,{})
globalEarth.DataLayer.setComLayerVisble(guid,index,true)
```