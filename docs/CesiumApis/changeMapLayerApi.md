<!-- 切换底图 -->

# 切换底图

`通过加载不同的底图服务，实现切换底图效果`

## 加载百度地图 - BaiduImageryLayerProvider

BaiduImageryLayerProvider(config)

> config - `{url,crs,style}`
>
> url - 服务地址
>
> crs - 坐标类型（WGS84）
>
> style - 样式（normal）

示例：

```js
config = {
  url: "...",
  crs: "WGS84",
  style: "normal",
};
globalEarth.ChangeMapLayerProvider.BaiduImageryLayerProvider(config);
```

## 加载谷歌地图 - UrlTemplateImageryProvider

UrlTemplateImageryProvider(config)

> config - `{url,fileExtension}`
>
> url - 服务地址
>
> fileExtension - "png"

示例：

```js
config = {
  url: "...",
  fileExtension: "png",
};
globalEarth.ChangeMapLayerProvider.UrlTemplateImageryProvider(config);
```

## 加载腾讯地图 - TencentImageryLayerProvider

TencentImagerylayerProvider(config)

> config - `{url,style,crs}`
>
> url - 服务地址
>
> style - 底图样式（2,4,6,7,8）
>
> crs - 坐标类型（WGS84）

示例：

```js
config = {
  url: "...",
  style: "4",
  crs: "WGS84",
};
globalEarth.ChangeMapLayerProveder.TencentImageryLayerProvider(config);
```

## 加载高德地图 - AmapImageryLayerProvider

AmapImageryLayerProvider(config)

> config - `{url,crs}`
>
> url - 服务地址
>
> crs - 坐标类型（WGS84）

示例：

```js
config = {
  url: "...",
  crs: "WGS84",
};
globalEarth.ChangeMapLayerProveder.AmapImageryLayerProvider(config);
```

## 加载天地图 - WebMapTileServiceImageryProvider

WebMapTileServiceImageryProvider(config)

> config - `{url,layer,style,format,subdomains,tileMatrixSetID}`
>
> url - 服务地址
>
> layer - 图层名称（天地图影像）
>
> style - 底图样式（default）
>
> format - "image/jpeg"
>
> subdomains - ["0","1","2","3","4","5","6","7"]
>
> tileMatrixSetID - "GoogleMapsCompatible"

示例：

```js
config = {
  url: "...",
  layer: "天地图影像",
  style: "defalut",
  format: "image/jpeg",
  subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
  tileMatrixSetID: "GoogleMapsCompatible",
};
globalEarth.ChangeMapLayerProveder.WebMapTileServiceImageryProvider(config);
```

## 加载 Arcgis - ArcGisMapServerImageryProvider

ArcGisMapServerImageryProvider(config)

> config `{url,layer}`
>
> url - 服务地址
>
> layer - "0"

示例：

```js
config = {
  url: "...",
  layer: "0",
};
globalEarth.ChangeMapLayerProveder.ArcGisMapServerImageryProvider(config);
```

## 清除图层 - remove

remove(layer)

```js
// 添加底图
let layer =
  globalEarth.ChangeMapLayerProveder.UrlTemplateImageryProvider(config);
// 删除底图
globalEarth.viewer, imageryLayers.remove(layer);
```
