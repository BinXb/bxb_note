<!-- 画面 -->
# 画面

::: tip 提醒
画线由两种方式，一种是工具栏画线`Draw`，一种是位置画线`points`
:::

## 开始

### 准备地图

> 创建地图
>
> 叠加静态图层

::: code-group
~~~vue [drawPolygon.vue]
<template>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
    <!-- 工具条开始 -->
    <div class="toolbar">
      <el-button type="primary" @click="drawPolygon1">画面(圆)</el-button>
      <el-button type="primary" @click="drawPolygon2">画面(矩形)</el-button>
      <el-button type="primary" @click="drawPolygon3">画面(箭头)</el-button>
      <el-button type="primary" @click="drawPolygon4">画面(多边形)</el-button>
      <el-button type="primary" @click="drawPolygon5">画面(随意边形)</el-button>
      <el-button type="primary" @click="drawPolygon6">画面(已有位置)</el-button>
      <el-button type="primary" @click="clear">清除</el-button>
    </div>
    <!-- 工具条结束 -->
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
    }
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
        _this.map.addLayer(_this.layer1)
      }
    },
    
  },
  mounted() {
    this.createMap();
  },
}
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

  .toolbar {
    position: absolute;
    left: 10px;
    top: 10px;
    display: flex;
    width: 80%;
  }
}
</style>
~~~

~~~js [画面方法：drawPolygonApi.js]
// 画面
import * as esriLoader from "esri-loader";
import {
    BORDERCOLOR,
    FILLCOLOR
} from "@/config/map";

// 使用工具栏画面
// 需要参数：地图对象、工具类型、边框颜色、填充颜色
const drawPolygonByToolbarApi = async (map, type, borderColor, fillColor) => {
    const _this = this;
    const [Graphic, SimpleLineSymbol, SimpleFillSymbol, PictureFillSymbol, Draw, Color] = await esriLoader.loadModules([
        "esri/graphic",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/PictureFillSymbol",
        "esri/toolbars/draw",
        "esri/Color",
    ]);// 加载所需的arcgis组件

    // 如果颜色不传，就给个默认值
    if (borderColor === undefined) {
        borderColor = BORDERCOLOR;
    };
    if (fillColor === undefined) {
        fillColor = FILLCOLOR;
    };

    // 创建工具栏
    let toolbar = new Draw(map);// 绑定到map上
    // 激活工具栏，type：CRICLE，RECTANGLE，POLYGON，ARROW，FREEHAND_POLYGON
    toolbar.activate(Draw[type]);
    toolbar.on("draw-complete", evt => {
        toolbar.deactivate();//失效后，绘画停止
        let symbol = new SimpleFillSymbol(
            SimpleFillSymbol.STYLE_SOLID,// 设置填充的样式,可以是实心、水平线、垂直线、交叉线、空心等等
            new SimpleLineSymbol(
                SimpleLineSymbol.STYLE_SOLID,//设定外层line样式，可以是虚线，实线、交叉线等等
                Color(borderColor),//设定line颜色
                2,// 设定line粗细
            ),
            new Color(fillColor),//设定填充颜色
        );
        // 也可以使用其他symbol来得到不同的效果
        // symbol = new PictureFillSymbol(require("@/assets/location.png"), new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 255]), 2), 20, 20)
        let graphic = new Graphic(evt.geometry,symbol);//创建一个图形，将symbol效果应用到图形上
        map.graphics.add(graphic);//map对象自带一个graphicLayer图形图层
    })
}

// 使用位置信息画面
// 需要参数：地图对象、位置信息、边框颜色、填充颜色
const drawPolygonByPointsApi = async (map,points,borderColor,fillColor) => {
    const _this = this;
    const [Graphic, SimpleLineSymbol, SimpleFillSymbol, Draw, Color, SpatialReference, Polygon, Point] = await esriLoader.loadModules([
        "esri/graphic",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/toolbars/draw",
        "esri/Color",
        "esri/SpatialReference",
        "esri/geometry/Polygon",
        "esri/geometry/Point"
    ]);//加载arcgis组件


    // 如果颜色不传，就给默认值
    if(borderColor === undefined){
        borderColor = BORDERCOLOR;
    };
    if(fillColor === undefined){
        fillColor = FILLCOLOR;
    };
    // 创建多边形对象
    const polygon = new Polygon(new SpatialReference({
        wkid:4490
    }));
    console.log(points);
    polygon.addRing(points);
    // 创建显示形状
    let symbol = new SimpleFillSymbol(
        SimpleFillSymbol.STYLE_SOLID,//设定填充样式，可以是实心、水平线、垂直线、交叉线等等
        new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,// 设定外层line样式，可以是虚线，点，实线等等
            Color(borderColor),// 设定line的颜色
            2,// 设定line的粗细
        ),
        new Color(fillColor),// 设定填充颜色
    );
    console.log(symbol);
    let graphic = new Graphic(polygon,symbol);//创建图形
    map.graphics.add(graphic);//map对象自带一个图形图层graphicLayer，就是map.graphics
	// map.setExtent(graphic.geometry.getExtent().expand(1.5));//定位到地理位置
    return graphic;
}

export {
    drawPolygonByToolbarApi,
    drawPolygonByPointsApi,
}
~~~

~~~vue [用法：drawPolygon.vue]
methods:{
    // 使用工具栏画圆
    drawPolygon1() {
      const _this = this;
      let borderColor = [100, 100, 255];// 比那狂颜色
      let fillColor = [50, 90, 211];// 填充颜色
      drawPolygonByToolbarApi(_this.map, "CIRCLE", borderColor, fillColor);
    },
    // 使用工具栏画矩形
    drawPolygon2() {
      const _this = this;
      let borderColor = [100, 100, 255];
      let fillColor = [50, 90, 211];
      drawPolygonByToolbarApi(_this.map, "RECTANGLE", borderColor, fillColor);
    },
    // 使用工具栏画面(箭头)
    drawPolygon3() {
      const _this = this;
      drawPolygonByToolbarApi(_this.map, "ARROW");
    },
    // 使用工具栏画多边形
    drawPolygon4() {
      const _this = this;
      drawPolygonByToolbarApi(_this.map, "POLYGON")
    },
    // 使用工具栏画随意边形
    drawPolygon5() {
      const _this = this;
      drawPolygonByToolbarApi(_this.map, "FREEHAND_POLYGON");
    },
    // 根据位置信息画面
    drawPolygon6() {
      const _this = this;
      let points = [
        [119.397128, 31.916527],
        [119.410703, 31.897555],
        [119.402292, 31.892353],
        [119.389846, 31.891365],
        [119.385756, 31.899754],
        [119.397128, 31.916527],
      ];
      drawPolygonByPointsApi(_this.map,points);
    },
    clear() {
      this.map.graphics.clear()
    },
}
~~~
:::

## 组件和方法

`画面的操作中也出现了不同的组件和方法，下面主要介绍一下用法`

### 组件

`使用Draw工具栏画面与画线没什么不同，主要就是传入的type类型不同`
> type画面可选值：
>
> 圆形 - CRICLE
>
> 矩形 - RECTANGLE
>
> 多边形 - POLYGON
>
> 箭头 - ARRAOW
>
> 随意边形 - FREEHAND_POLYGON

`使用位置画面points`

> Polygon
> > ~~~js
> > // 用法
> > const polygon = new Polygon(new SpqtialReference({wkid:4490}))
> > ~~~
> Polygon方法：
> > addRing(points) - 参数是传入的位置连成的面

::: warning 最后
不管是画点、画线还是画面，我们都可以通过利用工具栏Draw或者传入位置进行绘制，先绘制形状graphic，然后将形状应用到图层中。如果是利用工具栏Draw绘制的形状，则需要使用map自带的图形图层map.graphics，添加到map自带的图层中,如果不是，则需要有返回值，将形状(graphic)返回,并利用图形图层(GraphicsLayer),将形状添加到图形图层上。

:::