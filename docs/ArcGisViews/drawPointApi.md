# 画点

::: tip 提醒
arcgis 提供有图形图层组件`GraphicsLayer`，可以在图形图层上进行作画。
:::

## 开始

### 1.准备地图

`像最开始一样`

> 创建地图
>
> 叠加图层

::: code-group

```vue [显示页面：drawPoint.vue]
<!-- 创建地图 - drawPoint.vue -->
<template>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
  </div>
</template>
<script>
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 导入所需要的js、css、url资源等
import { esriCss, esriJs, czdzUrl } from "@/config/map";
esriLoader.loadScript({ url: esriJs });
esriLoader.loadCss(esriCss);
// 导入创建地图api
import createMapApi from "@/api/createMapApi";
// 导入创建静态图层api
import createTileLayerApi from "@/api/createTileLayerApi";
export default {
  data() {
    return {
      map: "",
      layer1: "",
      graphicsLayer: "",
    };
  },
  methods: {
    // 创建地图
    async createMap() {
      const _this = this;
      if (_this.map === "") {
        // 创建地图
        _this.map = await createMapApi(_this.$refs.map);
        // 创建静态图层
        _this.layer1 = await createTileLayerApi(czdzUrl);
        // 叠图
        _this.map.addLayer(_this.layer1);
      }
    },
  },
  mounted() {
    this.createMap();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;

  .map {
    width: 100%;
    height: 100%;
  }
}
</style>
```

```js [创建地图：createMapApi.js]
import * as esriLoader from "esri-loader"; //加载arcgis依赖
// 导入默认坐标和初始化区域
import { EPSG, EXTENT } from "@/config/map";

// 创建地图
// 需要参数：地图容器 - mapContainer、地图范围 - mapExtent
const createMapApi = async (mapContainer, mapExtent) => {
  console.log("准备创建地图");
  const _this = this;
  // Map - ArcGis核心组件 - 用作渲染
  // Extent - 一个二维平面上的矩形区域，用来定义地图的可视范围或空间查询范围
  // SpatialReference - 对象，地理空间信息
  // ArcGISTiledMapServiceLayer - 图层
  const [Map, Extent, SpatialReference, ArcGISTiledMapServiceLayer] =
    await esriLoader.loadModules([
      "esri/map",
      "esri/geometry/Extent",
      "esri/SpatialReference",
      "esri/layers/ArcGISTiledMapServiceLayer",
    ]); //加载所需的arcgis组件
  // 定位位置
  const sp = new SpatialReference(EPSG);
  if (mapExtent === undefined) {
    // 说明没有传extent过来
    // 那么便使用默认的范围
    mapExtent = EXTENT;
    mapExtent.spatialReference = {
      wkid: EPSG,
    };
  } else {
    // 有extent传过来
    if (mapExtent.spatialReference === undefined) {
      mapExtent.spatialReference = {
        wkid: EPSG,
      };
    }
  }
  // 准备地图显示区域
  const _extent = new Extent(mapExtent);
  let map = new Map(mapContainer, {
    logo: true, // 是否在地图右下角显示esri的logo，默认true
    slider: false, // 是否显示左上角放大缩小的滑块，只有叠加静态或者动态图层后才显示，默认true
    spatialReference: sp, // 加上空间坐标系
    extent: _extent, // 设置地图初始范围
    zoom: 11, // 设置地图缩放等级，越大离地面越近(一般最大20)
    minZoom: 10, // 设定地图的最小缩放等级
  });
  return map;
};

export default createMapApi;
```

```js [创建静态图层：createTileLayerApi.js]
import * as esriLoader from "esri-loader"; //加载arcgis依赖类，必须
// 创建静态图层（矢量，一般是底图）
// 需要参数: 1、layerUrl:静态图层的url
const createTileLayerApi = async (layerUrl) => {
  const _this = this;
  const [ArcGISTiledMapServiceLayer] = await esriLoader.loadModules([
    "esri/layers/ArcGISTiledMapServiceLayer",
  ]); //加载所需的arcgis组件

  let tileLayer = new ArcGISTiledMapServiceLayer(layerUrl); //创建静态图层

  return tileLayer;
};

export default createTileLayerApi;
```

:::

### 2.叠加图形图层

> 创建图形图层
>
> 将图形图层叠加到 map 上

::: code-group

```js{7-9} [1.创建图形图层：createGraphicsLayerApi.js]
// 加载arcgis依赖
import * as esriLoader from "esri-loader";
// 创建图形图层
const createGraphicsLayerApi = async ()=> {
  const _this = this;
  // 加载图形图层组件
  const [GraphicsLayer] = await esriLoader.loadModules([
    "esri/layers/GraphicsLayer"
  ]);
  // 实例图形图层，在上面画图形
  let graphicsLayer = new GraphicsLayer();
  return graphicsLayer;
}
export default createGraphicsLayerApi;
```

```vue{18-20} [2.导入图形图层并叠图：drawPoint.vue]
<script>
// 导入图形图层
import createGraphicsLayerApi from "@/api/createGraphicsLayerApi";

export default {
  methods: {
    // 创建地图
    async createMap() {
      const _this = this;
      if (_this.map === "") {
        // 创建地图
        _this.map = await createMapApi(_this.$refs.map);
        // 创建静态图层
        _this.layer1 = await createTileLayerApi(czdzUrl);
        // 叠图
        _this.map.addLayer(_this.layer1);
        // 创建图形图层,可以在上面画图
        _this.graphicsLayer = await createGraphicsLayerApi();
        // 叠图
        _this.map.addLayer(_this.graphicsLayer);
      }
    },
  },
};
</script>
```

:::

### 3.画点

:::tip 提示

可画单点和多点，并且可以替换图片

:::

> 通过坐标画点
>
> 通过图片画点
>
> 通过工具栏画点

:::code-group

```js [通过坐标画点]
// 画点
import * as esriLoader from "esri-loader"; //加载arcgis依赖
import { EPSG, BORDERCOLOR, FILLCOLOR } from "@/config/map";

// 根据坐标画点，因为大小是像素，所以缩放地图，点的显示大不会变化
// 需要参数：x,y坐标，边框颜色，填充颜色
const drawPointByLocationApi = async (x, y, borderColor, fillColor) => {
  const _this = this;
  const [
    Point,
    SpatialReference,
    Graphic,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    Color,
  ] = await esriLoader.loadModules([
    "esri/geometry/Point",
    "esri/SpatialReference",
    "esri/graphic",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
  ]); //加载所需的arcgis组件

  // 如果颜色不传，就给个默认值
  if (borderColor === undefined) {
    borderColor = BORDERCOLOR; //边框颜色
  }
  if (fillColor === undefined) {
    fillColor = FILLCOLOR; //填充颜色
  }

  let point = new Point(x, y, new SpatialReference({ wkid: EPSG })); //创建点，传入坐标和坐标系
  let symbol = new SimpleMarkerSymbol(
    SimpleMarkerSymbol.STYLE_COLOR, //设定填充的样式,正方形、圆形、三角形等等
    20, // 设定点半径的大小(单位是像素)，默认12
    new SimpleLineSymbol(
      SimpleLineSymbol.STYLE_COLOR, //设定外层line的样式
      Color(borderColor), //设定line的颜色
      2 //设定line的粗细
    ),
    new Color(fillColor) //设定填充的颜色
  );
  let graphic = new Graphic(point, symbol); //创建graphic

  return graphic;
};

export { drawPicPointByLocationApi };
```

```js [通过图片画点]
// 画点
import * as esriLoader from "esri-loader"; //加载arcgis依赖
import { EPSG, BORDERCOLOR, FILLCOLOR } from "@/config/map";

// 根据坐标画点(使用图片，最常用)
// 需要参数:x,y坐标、图片地址
const drawPicPointByLocationApi = async (x, y, url) => {
  const _this = this;
  const [Point, SpatialReference, Graphic, PictureMarkerSymbol] =
    await esriLoader.loadModules([
      "esri/geometry/Point",
      "esri/SpatialReference",
      "esri/graphic",
      "esri/symbols/PictureMarkerSymbol",
    ]); //加载所需的arcgis组件

  let point = new Point(x, y, new SpatialReference({ wkid: EPSG })); //创建点，传入坐标和坐标系
  let symbol;
  if (url === undefined) {
    // 如果不传图片，就给个默认值
    symbol = new PictureMarkerSymbol(require("@/assets/location.png"), 20, 30); //默认图片和尺寸
  } else {
    symbol = new PictureMarkerSymbol(require("@/assets/" + url), 30, 30); // 传入图片和大小
  }
  let graphic = new Graphic(point, symbol);
  return graphic;
};

export { drawPicPointByLocationApi };
```

```js [通过工具栏画点]
// 画点
import * as esriLoader from "esri-loader"; //加载arcgis依赖
import { EPSG, BORDERCOLOR, FILLCOLOR } from "@/config/map";

// 使用工具栏画点（点击画点）
// 需要参数：地图对象、工具类型、图片地址
const drawPointByToolbarApi = async (map, type, url) => {
  const _this = this;
  const [Graphic, PictureMarkerSymbol, Draw] = await esriLoader.loadModules([
    "esri/graphic",
    "esri/symbols/PictureMarkerSymbol",
    "esri/toolbars/draw",
  ]); //加载所需的arcgis组件
  let toolbar = new Draw(map); //创建工具栏,绑定到map上
  toolbar.activate(Draw[type]); // 激活特定工具,POINT和MULTI_POINT是点
  toolbar.on("draw-complete", (evt) => {
    toolbar.deactivate(); //失效后，绘画就停止了
    let symbol;
    if (url === undefined) {
      // 如果图片不传，就给默认值
      symbol = new PictureMarkerSymbol(
        require("@/assets/location.png"),
        30,
        30
      ); // 默认图片和尺寸
    } else {
      symbol = new PictureMarkerSymbol(require("@/assets/" + url), 20, 30); // 传入图片和尺寸
    }
    let graphic = new Graphic(evt.geometry, symbol); // 创建graphic
    map.graphics.add(graphic); //map对象自带一个graphicsLayer,就是map.graphics,所以也可以往这个上面添加graphic
  });
};

export { drawPointByToolbarApi };
```
:::

## 组件和方法

### 组件

画点功能又出现了新的组件`GraphicsLayer``SimpleMarkerSymbol``SimpleLineSymbol`等等

> GraphicsLayer
>
> Point
>
> SpatialReference
>
> Graphic
>
> SimpleMarkerSymbol
>
> SimpleLineSymbol
>
> Color
>
> PictureMarkerSymbol
>
> Draw


### 方法

Draw的方法

> activate - 激活工具栏
>
> on - 开始画点
>
> deactivate - 停止

map的方法

`map对象自带一个graphicsLayer,就是map.graphics`

> map.graphics.add - 将工具栏画的点添加到图形图层上

图形图层（GraphicsLayer）的方法

> add - 将图形加到图形图层上
>
> clear - 清除图形图层上的graphicsLayer
>