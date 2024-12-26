# 创建图例

:::tip 提示
创建图例只能在动态图层上面进行，并且可以添加多个动态图层，需要组件`Legend`
:::

## 开始

### 准备地图

> 准备地图
>
> 创建静态图层
>
> 创建动态图层

:::code-group
~~~vue [地图准备:createLegend.vue]
<template>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
    <div class="toolbar">
      <el-button type="primary" @click="createLegend">显示图例</el-button>
      <el-button type="primary" @click="closeLegend">关闭图例</el-button>
    </div>
    <!-- 工具条结束 -->
    <!-- 图例开始 -->
    <div class="legendBox" id="legendBox" v-if="showLegendBox"></div>
    <!-- 图例结束 -->
  </div>
</template>
<script>
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 导入所需资源
import { esriJs, esriCss, czdzUrl, testUrl } from "@/config/map.js"; //引入所需要的参考系，js，css，底图url
esriLoader.loadScript({ url: esriJs }); //加载js，必须
esriLoader.loadCss(esriCss); //加载css，必须
// 导入地图
import createMapApi from "@/api/createMapApi";
// 导入静态图层
import createTileLayerApi from "@/api/createTileLayerApi";
// 导入动态图层
import createDynamicLayerApi from "@/api/CreateDynamicLayerApi";
export default {
  data() {
    return {
      map:"",
      legend:"",
      showLegendBox:false
    };
  },
  methods:{
    async createMap(){
      const _this = this;
      if(_this.map === ""){
        // 创建地图
        _this.map = await createMapApi(_this.$refs.map);
        // 创建静态图层
        let layer = await createTileLayerApi(czdzUrl);
        // 叠图
        _this.map.addLayer(layer);
        // 创建动态图层，添加了动态图层后才会有图例
        let testLayer = await createDynamicLayerApi(testUrl);
        // 叠图
        _this.map.addLayer(testLayer);
      }
    },
  },
  mounted(){
    this.createMap();
  }
};
</script>

<style lang="scss" scoped>
.legendBox {
    position: absolute !important; //需要加上!important，否则会被覆盖掉
    right: 10px;
    bottom: 10px;
    width: 200px;
    border: 1px solid #000;
		background: rgba(255, 255, 255, 0.8);
		padding: 10px;
		z-index: 9999
  }
</style>
~~~

~~~js{7-8,11} [创建图例：createLegendApi.js]
import * as esriLoader from "esri-loader";

// 创建图例
// 需要参数：地图对象、图例盒子Id
const createLegendApi = async (map,id)=> {
  const _this = this;
  const [Legend] = await esriLoader.loadModules([
    "esri/dijit/Legend",
  ]);//加载arcgis所需要组件
  // 开始创建图例
  let legend = new Legend({map},id);
  return legend
}
export {
  createLegendApi,
}
~~~

~~~vue{11-13,20-24} [使用：createLegend.vue]
<script>
// 导入创建图例
import { createLegendApi } from "@/api/createLengendApi";
methods:{
    // 创建图例
    async createLegend(){
      const _this = this;
      if(_this.legend === ""){
        // 显示图例
        _this.showLegendBox = true;
        _this.legend = await createLegendApi(_this.map,"legendBox");
        //启动图例
        _this.legend.startup();
      }
    },
    // 关闭图例
    closeLegend(){
      const _this = this;
      if(_this.legend !== ""){
        _this.showLegendBox = false;//必须异步，不然会将外部盒子一起销毁
        setTimeout(()=>{
          _this.legend.destroy();//销毁图例
          _this.legend = "";
        },200)
      }
    }
}
</script>

~~~
:::

## 组件和方法

:::warning 组件
在创建图例中只出现了一个组件`Legend`,利用此组件通过传入map对象和图例容器Id，可以创建图例。
:::

### 组件

#### Legend

~~~js
let [Legend] = await esriLoader.loadModules([
  "esri/dijit/Legend"
])

// 用法：new Legend({map},id);
new Legend({map},id)
~~~

### 方法

legend的方法

#### startup() - 启动图例
~~~js
// 用法 
legend.startup()
~~~

#### destroy() - 销毁图例
~~~js
// 用法 
legend.destroy()
~~~
