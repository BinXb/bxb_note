# query 查询

:::tip
query 查询可以对空间和属性联合查询，对单图层。
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

```js [useQueryApi.js：点、面查询]
// query查询
// 加载arcgis依赖
import * as esriLoader from "esri-loader";
// 单点
// 需要参数：地图对象、地图服务url、坐标信息
const useQueryByPointApi = async (map, url, geometry) => {
  const _this = this;
  const [Query, QueryTask] = await esriLoader.loadModules([
    "esri/tasks/query",
    "esri/tasks/QueryTask",
  ]); //加载所需的arcgis组件
  let queryTask = new QueryTask(url); //传入图层
  let query = new Query(); //初始化query对象
  query.returnGeometry = true; //使结果返回geometry信息
  query.outFields = ["*"]; //需要返回的信息，*就是全部，一般拿全部
  query.geometry = geometry; //设置查询位置信息
  let info = await queryTask.execute(query, (result) => {
    console.log(result);
  });
  return info;
};

// 面 - 框选查询
// 需要参数：地图对象、地图服务对象的url
const useQueryByAreaApi = async (map, url) => {
  const _this = this;
  const [
    Draw,
    SimpleFillSymbol,
    SimpleLineSymbol,
    Color,
    Graphic,
    Query,
    QueryTask,
  ] = await esriLoader.loadModules([
    "esri/toolbars/draw",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/graphic",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
  ]); //加载所需的arcgis组件

  // 使用promise将值传出去
  function func() {
    return new Promise((resolve, reject) => {
      let toolbar = new Draw(map); //创建工具栏，绑定到map上
      toolbar.activate(Draw["RECTANGLE"]); //激活特定工具 - 这里是矩形
      toolbar.on("draw-complete", async (evt) => {
        toolbar.deactivate(); //失效后绘画停止
        let symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, //设置填充样式
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID, //设置外层线条样式
            Color([0, 0, 255]), //设置线条颜色
            2 // 设置线条粗细
          ),
          new Color([205, 209, 211, 0.5]) //设置填充颜色
        );
        let graphic = new Graphic(evt.geometry, symbol); //创建形状
        map.graphic.add(graphic); //将形状添加到map上
        let queryTask = new QueryTask(url); //传入图层
        let query = new Query(); //初始化query对象
        query.returnGeometry = true; //使结果返回geometry
        query.outFields = ["*"]; //设置需要返回哪些属性，*是拿所有
        query.geometry = evt.geometry; //设置查询的位置信息
        queryTask.execute(query, (result) => {
          return resolve(result); //直接传到最外层
        });
      });
    });
  }
  let data = await func();
  return data;
};

export { useQueryByPointApi, useQueryByAreaApi };
```

```vue [使用：useQuery.vue]
<script>
// 导入query查询方法
import {useQueryByPointApi,useQueryByAreaApi} from "@/api/useQueryApi";
export default{
  methods:{
    // query查询 - 点
    // 参数：地图对象、地图服务url、坐标信息
    useQueryPoint(){
      const _this = this;
      if(_this.mapClick === ""){
        // 先给map绑定单击事件
        // 通过evt.mapPoint可以得到点击的坐标位置
        _this.mapClick = _this.map.on("click",async (evt) => {
          let res = await useQueryByPointApi(
            _this.map,xingzhengUrl+"/0",evt.mapPoint
          );//这里第二个参数的写法，因为地图服务会有多个子图层，所以要精确到子图层
          if(res.features.length !== 0){
            alert("该行政区是"+res.features[0].attributes.XZQMC)
          }else{
            alert("超出常州区域")
          }
        })
      }
    },
    // query查询 - 面
    // 参数：地图对象、地图服务对象的url
    useQueryByArea(){
      const _this = this;
      let res = await useQueryByAreaApi(_this.map,xingzhengUrl+"/0");
      // 下面对结果进行自行处理
      if(res.features.length !== 0){
        let str = "";
        res.features.forEach((item,index) => {
          str += index + item.attributes.XZQMC + "/n";
        })
        alert("str");
      }else{
        alert("超出常州区域");
      }
    }
  }
}
</script>
```

:::

:::warning
查询必须在动态图层上进行。
:::

## 组件和方法

### 组件

> query - 作用：初始化 query 对象
>
> 组件"esri/tasks/query"
>
> > ```js
> > // 用法 - new Query()
> > let query = new Query();
> > ```
> >
> > QueryTask - 作用：传入图层，查询位置信息
>
> 组件"esri/tasks/QueryTask"
>
> > ```js
> > //用法 - new QueryTask(url)
> > let queryTask = new QueryTask(url);
> > ```

### 方法

#### query 方法

query.returnGeometry - 设置返回 geometry 结果

value

> Boolean
>
> true - 使结果返回 geometry 信息

```js
// 用法
query.returnGeometry = true;
```

query.outFields

value

> String[]
>
> ["NAME", "STATE_ABBR", "POP04"] - 获取某些指定属性
>
> ["*"] - 获取全部属性

```js
// 用法
query.outFields = ["*"];
```

query.geometry

value

> Geometry

```js
//用法
query.geometry = geometry; //设置查询位置信息
```

#### QueryTask 方法：

queryTask.execute(query,callback)

```js
// 用法
let info = queryTask.execute(query, (result) => {
  console.log("查询结果", result);
});
return info; //将查询信息结果返回
```
