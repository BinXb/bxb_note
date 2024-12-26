# identify 查询

::: tip
identify 只可以进行空间查询，但是可以查多图层
:::

## 开始

### 准备地图

> 创建地图
>
> 叠加静态图层
>
> 叠加动态图层

:::code-group

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
import { esriCss, esriJs, czdzUrl, xingzhengUrl } from "@/config/map";
esriLoader.loadScript({ url: esriJs });
esriLoader.loadCss(esriCss);
// 导入创建地图api
import createMapApi from "@/api/createMapApi";
// 导入创建静态图层api
import createTileLayerApi from "@/api/createTileLayerApi";
// 导入创建动态图层
import createDynamicLayerApi from "@/api/CreateDynamicLayerApi";
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
        // 创建动态图层
        let layer2 = await createDynamicLayerApi(xingzhengUrl);
        _this.map.addLayer(layer2);
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

```js [useIdentifyApi.js]
// identify查询
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 使用identify查询，进行空间查询
// 需要参数：地图对象、地图服务对象的url
const useIdentifyApi = async (map, url) => {
  const _this = this;
  const [
    Draw,
    SimpleFillSymbol,
    SimpleLineSymbol,
    Color,
    Graphic,
    IdentifyTask,
    IdentifyParameters,
  ] = await esriLoader.loadModules([
    "esri/toolbars/draw",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/graphic",
    "esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters",
  ]); //导入所需的arcgis组件
  // 使用promise将值传出去
  function func() {
    return new Promise((resolve, reject) => {
      let toolbar = new Draw(map); // 创建工具栏并绑定到map上
      toolbar.activate(Draw["RECTANGLE"]); //激活特定工具，这里是矩形
      toolbar.on("draw-complete", async (evt) => {
        toolbar.deactivate(); //失效后绘画停止
        let symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, //设置填充样式
          new SimpleLIneSymbol(
            SimpleLineSymbol.STYLE_SOLID, // 设置线条样式
            Color([0, 0, 255]), // 设置外层线条颜色
            2 //设置线条粗细
          ),
          new Color([205, 209, 211, 0.5]) //设置填充颜色
        );
        let graphic = new Graphic(evt.geometry, symbol); //创建形状
        map.graphics.add(graphic); //将形状添加到map的形状图层(map.graphics)上
        let identifyTask = new IdentifyTask(url); //创建IdentifyTask对象，传入地图服务
        let identifyParams = new IdentifyParameters(); //创建IdentifyParamters对象，下面设置条件
        identifyParams.returnGeometry = true; //设置是否返回几何信息
        identifyParams.layerIds = [0]; //设置要查询的图层Id
        identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL; //设置查询的地图选项
        identifyParams.tolerance = 3; //设置容差值，标识允许误差范围,默认0，如果想多查，可以设置3、5等
        identifyParams.width = map.width; //传递地图宽度
        identifyParams.height = map.height; //传递地图高度
        identifyParams.mapExtent = evt.geometry; //具体位置
        identifyTask.execute(identifyParams, (result) => {
          return resolve(result);
        });
      });
    });
  }
  let res = await func();
  return res;
};
export { useIdentifyApi };
```

:::

## 组件和方法

### 组件

> identifyTask - 作用：激活地图服务
>
> 组件："esri/tasks/IdentifyTask"
>
> > ```js
> > // 用法：new IdentifyTask(url)
> > let identifyTask = new IdentifyTask(url);
> > ```
> >
> > identifyParameters - 作用：设置规范
>
> 组件："esri/tasks/IdentifyParameters"
>
> > ```js
> > // 用法：new IdentifyParameters()
> > let identifyParams = IdentifyParameters();
> > ```

### 方法

#### identifyTask 方法

identifyTask.execute(identifyParameters,callback)

```js
// 用法
identifyTask.execute(identifyParams, (result) => {
  return resolve(result); //直接传到最外面
});
```

#### identifyParameters 方法

identifyParameters.returnGeometry

value

> Boolean

```js
// 设置是否返回几何信息
identifyParameters.returnGeometry = true;
```

identifyParameters.layerIds

value

> Number[]

```js
// 设置要查询的图层
identifyParams.layerIds = [0];
```

identifyParameters.layerOption

value

> String
>
> IdentifyParameters.LAYER_OPTION_ALL

```js
// 设置查询的地图选项
identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
```

identifyParameters.tolerance

value

> Numebr

```js
// 设置容差，容差越大，查的越多。默认是0
identifyParams.tolerance = 3;
```

identifyParameters.width

value

> Number

```js
// 传递地图宽度
identifyParams.width = map.width
```

identifyParameters.height

value

> Number

```js
// 传递地图高度
identifyParams.height = map.height;
```

identifyParameters.mapExtent

value

> Extent

```js
// 传递地图范围
identifyParams.mapExtent = map.extent;
```
identifyParameters.geometry

value

> Geometry

```js
// 具体位置
identifyParams.geometry = evt.geometry
```
