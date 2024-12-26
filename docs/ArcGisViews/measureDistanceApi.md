# 测距

:::tip 提醒
测距主要用到`Draw`与测距图层，通过传入的结束点坐标，进行计算
:::

## 开始

### 准备地图

> 创建地图
>
> 叠加静态图层

::: code-group

```vue [measureDistance.vue]
<templete>
  <div class="container">
    <!-- 地图容器 -->
    <div class="map" id="map" ref="map"></div>
  </div>
</templete>
<script>
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 导入css，js，url资源
import { esriCss, esriJs, czdzUrl } from "@/config/map";
esriLoader.loadScript({ url: esriJs });
esriLoader.loadCss(esriCss);
// 导入创建地图api
import createMapApi from "@/api/createMapApi";
// 导入创建静态图层api
import createTileLayerApi from "@/api/createTileLayerApi";
import {}
export default {
  data(){
    return {
      map:"",//地图对象
    }
  },
  methods:{
    // 创建地图
    async createMap(){
      const _this = this;
      id(_this.map === ""){
        // 创建地图底图
        _this.map = await createMapApi(_this.$refs.map);
        // 创建静态图层
        let layer = await createTileLayerApi(czdzUrl);
        // 叠图
        _this.map.addLayer(layer);
      }
    },
  },
  mounted(){
    this.createMap();
  }
}
</script>
<style></style>
```

```js [测距方法：measureDistanceApi.js]
// 测距
import * as esriLoader from "esri-loader"; //加载arcgis依赖
import { EPSG, computeUrl, szgjUrl } from "@/config/map"; // 导入资源依赖

// 先画线，再计算距离
// 需要参数，地图对象,线条颜色，文本颜色
const measureDistanceApi = async (map, borderColor, textColor) => {
  const _this = this;
  // 注意，不要忽略await
  const [
    Dojo,
    Draw,
    Font,
    SimpleLineSymbol,
    TextSymbol,
    Color,
    Graphic,
    GeometryService,
    LengthsParameters,
    SpatialReference,
    Point,
  ] = await esriLoader([
    "dojo",
    "esri/toolbars/draw",
    "esri/symbols/Font",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/TextSymbol",
    "esri/Color",
    "esri/graphic",
    "esri/tasks/GeometryService",
    "esri/tasks/LengthsParameters",
    "esri/SpatialReference",
    "esri/geometry/Point",
  ]); //加载所需的arcgis组件
  if (borderColor === undefined) {
    // 当没有边框颜色时，显示默认
    borderColor = [255, 0, 0];
  }
  if (textColor === undefined) {
    // 当没有传入字体颜色时，使用默认颜色
    textColor = [255, 0, 0];
  }
  // 绑定工具栏到map上
  let toolbar = new Draw(map);
  // 激活工具栏，激活POLYLINE（多线）
  toolbar.activate(Draw.POLYLINE);
  // 绘制线条，计算距离
  toolbar.on("draw-complete", (evt) => {
    toolbar.deactivate(); //失效后，绘画停止
    let symbol = new SimpleLineSymbol(
      SimpleLineSymbol.STYLE_SOLID, //设置线条样式
      Color(borderColor), //设置线条颜色
      2 //设置线条粗细
    );
    // 创建形状graphic
    let graphic = new Graphic(evt.geometry, symbol);
    // 将形状应用到map上
    map.graphics.add(graphic); //map对象自带一个形状图层就是map.graphics
    // 画线到此为止，下面就是计算距离
    let geometryService = new GeometryService(computeUrl); //创建测距图层
    // 计算结束点坐标
    let endX = evt.geometry.psths[0][evt.geometry.paths[0].length - 1][0];
    let endY = evt.geometry.psths[0][evt.geometry.paths[0].length - 1][1];
    // 添加结束点坐标
    let endPoint = new Point(endX, endY, new SpatialReference({ wkid: EPSG }));
    // 计算距离
    let lengthParams = new LengthsParameters();
    lengthParams.polylines = [evt.geometry];
    lengthParams.lengthUnit = GeometryService.UNIT_METER;
    lengthParams.geodesic = true;
    lengthParams.polylines[0].spatialReference = new SpatialReference(EPSG);
    geometryService.lengths(lengthParams);
    //
    Dojo.connect(geometryService, "onLengthsComplete", (result) => {
      let distance = Number(result.length[0].toFixed(4) + "米");
      let textSymbol = new TextSymbol(
        distance,
        new Font("16px", Font.STYLE_ITALIC),
        new Color(color)
      );
      let graphic = new Graphic(endPoint, textSymbol);
      map.graphics.add(graphic);
    });
  });
};
export { measureDistanceApi };
```

```vue [用法：measureDistance.vue]
<template>
  <div class="container">
    <!-- 创建地图容器 -->
    <div class="map" id="map" ref="map"></div>
    <div class="toolbar">
      <el-button type="primary" @click="meansureDistance">测距</el-button>
      <el-button type="primary" @click="clear">清除</el-button>
    </div>
  </div>
</template>
<script>
// 导入测距方法
import { measureDistanceApi } from "@/api/measureDistanceApi";
export default {
  data(){
    return {}
  }
  methods: {
    measureDsiatance(){
    const _this = this;
      measureDistanceApi(_this.map);
    },
    clear(){
      this.map.graphics.clear();
    }
  },
};
</script>
```

:::

## 组件和方法

:::info 测距出现的组件和方法
在测距中，可以发现，实现通过`画线`然后再进行`测距`的，所以我们可以知道哪些是针对测距的组件，哪些又是画线的组件。
:::

对于之前出现的组件就不一一说明了，主要介绍出现的新的组件

### 组件

> Dojo
>
> Font - 设置字体大小和样式
> > ~~~js
> > // 用法
> > new Font('16px',Font.STYLE_ITALIC)
> > ~~~
> >
> TextSymbol
> > ~~~js
> > //设置字体显示样式 - 用法：
> > new TextSymbol(文本,字体样式,字体颜色)
> > 
> > ~~~
> GeometryService
> > ~~~js
> > // 计算距离 - 用法：
> > new GeometryService(计算距离图层url)
> > ~~~
> LengthsParameters
> > ~~~js
> > // 进行精确长度测量 - 用法
> >  new LengthsParameters()
> > ~~~
通过以上方法，结合画线逻辑，便能实现测距功能。
