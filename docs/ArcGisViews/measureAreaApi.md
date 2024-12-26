# 测面

::: tip 提醒
测面的逻辑与测距一样，先画面，再通过利用`turf`组件与 point 点结合进行测面。
:::

## 开始

### 准备地图

> 创建地图
>
> 创建静态图层

:::code-group

```vue [开始准备：measureArea.vue]
<template>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
  </div>
</template>
<script>
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 导入css，js，url等资源
import { esriJs, esriCss, czdzUrl } from "@/config/map";
// 加载资源
esriLoader.loadScript({ url: esriJs });
esriLoader.loadCss(esriCss);
// 导入创建地图
import createMapApi from "@/api/createMapApi";
// 导入静态图层
import createTileLayerApi from "@/api/createTileLayerApi";
export default {
  data() {
    return {
      map: "",
    };
  },
  methods: {
    // 创建地图
    async createMap() {
      const _this = this;
      if (_this.map === "") {
        // 創建地圖
        _this.map = await createMapApi(_this.$refs.map);
        // 创建静态图层
        let layer = await createTileLayerApi(czdzUrl);
        // 叠图
        _this.map.add(layer);
      }
    },
  },
  mounted() {
    this.createMap();
  },
};
</script>
```

```js{5,42-61} [测面方法：measureArea.js]
// 测面
//  加载arcgis依赖
import * as esriLoader from "esri-loader";
// 测面所需的依赖
import * as turf from "@turf/turf";
import {
  EPSG,
} from "@/config/map";
// 先画面，再计算面积
// 需要参数：地图对象

const measureAreaApi = async (map) => {
  const _this = this;
  const [Draw, Font, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Color, Graphic, Point, SpatialReference] = await esriLoader.loadModules([
    "esri/toolbars/draw",
    "esri/symbols/Font",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/TextSymbol",
    "esri/Color",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/SpatialReference"
  ]); // 加载所需的arcgis组件

  let toolbar = new Draw(map);// 创建工具栏并绑定到map上
  toolbar.activate(Draw.POLYGON);//激活POLYGON
  toolbar.on("draw-complete", evt => {
    toolbar.deactivate();//失效后绘画停止
    let symbol = new SimpleFillSymbol(
      SimpleFillSymbol.STYLE_SOLID,
      new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_SOLID,
        Color([255, 0, 0]),
        2
      ),
      new Color([0, 0, 0, 0.3])
    );
    let graphic = new Graphic(evt.geometry, symbol);//创建形状
    map.graphics.add(graphic);// 将形状添加到map的形状图层中
    // 下面开始计算
    let endX = (evt.geometry.getExtent().xmin + evt.geometry.getExtent().xmax) / 2;
    let endY = (evt.geometry.getExtent().ymin + evt.geometry.getExtent().ymax) / 2;
    let endPoint = new Point(
      endX,
      endY,
      new SpatialReference({ wkid: EPSG })
    );
    let areaVal = "";
    if (EPSG == 4490) {
      let polygon = turf.polygon(evt.geometry.rings);
      areaVal = turf.area(polygon);
    } else if (EPSG == 4528) {
      areaVal = computePolygonArea(evt.geometry.rings[0]);
    }
    let area = Number(areaVal).toFixed(4) + '平方米';
    let textSymbol = new TextSymbol(
      area,
      new Font("16pt", Font.STYLE_ITALIC),
      new Color([255, 0, 0])
    );
    let textGraphic = new Graphic(endPoint, textSymbol);
    map.graphics.add(textGraphic);
  });

}

const computePolygonArea = (points) => {
  let point_num = points.length;
  if (point_num < 3) {
    return 0.0
  }
  let s = points[0][1] * (points[point_num - 1][0] - points[1][0]);
  for (let i = 1; i < point_num; ++i) {
    s += points[i][1] * (points[i - 1][0] - points[(i + 1) % point_num][0]);
  }
  return Math.abs(s / 2.0);
}
export {
  measureAreaApi
}
```

```vue [用法：measureArea.vue]
<template>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
    <div class="toolbar">
      <el-button type="primary" @click="measureArea">测面</el-button>
      <el-button type="primary" @click="clear">清除</el-button>
    </div>
  </div>
</template>
<script>
// 导入测面方法
import { measureAreaApi } from "@/api/measureAreaApi";
export default {
  data() {
    return {
      map: "",
    };
  },
  methods: {
    measureArea() {
      const _this = this;
      // 直接使用 - 传入地图对象
      measureAreaApi(_this.map);
    },
    clear() {
      this.map.graphics.clear(); //清除
    },
  },
};
</script>
```

:::

## 组件和方法

:::info 测面中出现的组件和方法
在测面的过程中，可以发现，通过先`画面Draw`，再通过`turf`组件，将 draw 记录的`Point`进行测面。
:::

### 组件

通过看 esriLoader 加载可以看出，都是之前出现过的组件，这里就重新介绍一遍，还有出现的新的组件`turf`

#### 工具栏组件 - Draw

```js
// Draw - 通过此组件，可以实现工具栏画点，画线，画面操作
// 用法：
let toolbar = new Draw(map); //创建工具栏并绑定到map上
toolbar.activate(Draw.POLYGON); //激活工具栏，激活POLYGON
// 执行绘画逻辑。。。
```

activate 可选参数：

> 画点 - Draw[type]
>
> > type - POINT、MULTI_POINT
> > 画线 - Draw[type]
> > type - LINE、POLYLINE、FREEHAND_POLYLINE
> > 画面 - Draw[type]
> > type - CRICLE，RECTANGLE，POLYGON，ARROW，FREEHAND_POLYGON

#### 设置字体组件 - Font

```js
// 用于设置字体属性的组件
// 用法：new Font(字体大小,字体样式)
new Font("16pt", Font.STYLE_ITALIC); //斜体
```

#### 设置外层线条显示组件 - SimpleLineSymbol

```js
// 不管是画线还是画面，都需要设置显示线条
// 用法：new SimpleLineSymbol(线条样式,颜色,粗细)
new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, Color([255, 0, 0]), 2);
```

#### 设置填充样式 - SimpleFillSymbol

```js
// 在画面中，需要设置内层填充样式
// 用法：new SimpleFillSymbol(填充样式,线条显示,填充颜色)
new SimpleFillSymbol(
  SimpleFillSymbol.STYLE_SOLID,
  new SimpleLineSymbol(
    SimpleLineSymbol.STYLE_SOLID, 
    Color([255, 0, 0]), 
    2),
  new Color([0, 0, 0, 0.3])
);
```

#### 设置文本组件 - TextSymbol
~~~js
// 在测距和测面中，将测出的结果显示出来
// 用法：new TextSymbol(文本内容,样式,颜色)
new TextSymbol(
  "大家好",
  new Font("16pt"，Font.STYLE_ITALIC),
  new Color([255,0,0]),
)
~~~

#### 设置颜色组件 - Color
~~~js
// 功能性很强的组件，会发现很多地方都用到
// 设置线条颜色、设置填充颜色、设置字体颜色、设置边框颜色等，所有涉及到颜色的都可以使用
// 用法：new Color([颜色值rgb\rgba])
new Color[255,0,0]
~~~

#### 形状组件 - Graphic
~~~js
// 这是所有绘制形状所必需的
// 可以理解成graphic是预处理好的形状，最后要么将预处理好的形状添加到map自带的形状图层上，要么添加到形状图层上
// 用法：
new Graphic(evt.geometry,symbol)
~~~

#### 画点组件 - Point

#### SpatialReference
