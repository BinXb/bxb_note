# find 查询

::: tip
find 只可以进行属性查询，但是可以查多图层
:::

## 开始

### 准备地图

> 创建地图
>
> 叠加静态图层
>
> 叠加动态图层

::: code-group

```vue [地图准备:useFind.vue]
<templete>
  <div class="container">
    <-- 地图容器 -->
    <div class="map" id="map" ref="map"></div>
    <-- 搜索框 -->
    <div class="toolbar">
      <el-input size="small" type="text" v-model="value">
        <el-button slot="append" size="small" type="primary" @click="useFind">查询</el-button>
      </el-input>
    </div>
  </div>
</templete>
<script>
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 导入所需资源css、js、url
import { esriCss, esriJs, url, xingzhengUrl } from "@/config/map";
// 加载资源
esriLoader.loadScript({ url: esriJs });
esriLoader.loadCss(esriCss);
// 导入创建地图方法
import createMapApi from "@/api/createMapApi";
// 导入创建静态图层方法
import createTileLayerApi from "@/api/createTileLayerApi";
// 导入创建动态图层方法
import createDynamicLayerApi from "@/api/createDynamicLayerApi";
export default {
  data() {
    return {
      map: "", // 地图对象
      value: "", //查询条件
    };
  },
  methods: {
    async createMap() {
      const _this = this;
      if (_this.map === "") {
        // 创建地图
        _this.map = await createMapApi(_this.$refs.map);
        // 创建静态图层
        let layer1 = await createTileLayerApi(czdzUrl);
        _this.map.addLayer(layer1);
        // 创建动态图层
        let layer2 = await createDynamicLayerApi(xingzhengUrl);
        _this.map.addLayer(layer2);
      }
    },
  },
  mounted() {
    this.createMap();
  },
};
</script>
<style></style>
```

```js{8,9} [方法准备:useFindApi.js]
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 使用find查询,根据特定属性，可以使用模糊查询或者完全匹配
// 需要参数：地图对象，地图服务对象的url，查询条件
const useFindApi = async (map,url,searchText) => {
  const _this = this;
  const [FindTask,FindParameters] = await esriLoader.loadModules([
    "esri/tasks/FindTask",
    "esri/tasks/FindParameters"
  ]);//加载所需的arcgis组件
  let findTask = new FindTask(url);//传入服务的url
  let findParams = new FindParameters();//创建FindParameters
  let allLayerIds = [0]//需要查询的图层Id
  findParams.returnGeometry = true;//是否返回几何对象
  findParams.layerIds = allLayerIds;//设置查询的图层
  findParams.searchFields = ["XZQMC"];//限定查询的条件 *指所有
  findParams.searchText = searchText;//限定查询关键字
  // 启用查询
  let res = await findTask.execute(findParams,result => {
    console.log(result)
  })
  // 将结果返回
  return res
}

export {
  useFindApi
}

```

```vue{8} [使用:find]
<script>
// 导入find查询方法
import {useFindApi} from "@/api/useFindApi";
export default {
  methods:{
    async useFind(){
      const _this = this;
      let res = await useFindApi(_this.map,xingzhengUrl，this.val)
      if(res.length !== 0){
        let str = "";
        res.forEach((item,index) => {
          str += index + item.feature.attributes
        })
        console.log(str);
      }else{
        console.log("没有查到结果")
      }
    }
  }
}
</script>
```

:::

## 组件和方法

### 组件

#### FindTask组件

`esri/tasks/FindTask`

作用：激活地图服务，便于查询

用法：

```js
// 用法：new FindTask(url) - 动态服务地图url
let findTask = new FindTask(url)
```

#### FindParameters组件

`esri/tasks/FindParameters`

作用：创建FindParameters，进行查询配置

用法：

```js
// 用法：new FindParameters()
let findParams = new FindParameters()
```

### 方法

#### FindTask.execute()方法

作用：查询 - 返回查询结果

用法：

```js
let res = await findTask.execute(findParams,result => {
  // 查询结果result
})

```
