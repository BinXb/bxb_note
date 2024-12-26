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
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 导入所需的css，js，url资源
import { esriCss,esriJs,czdzUrl } from "@/config/map";
// 加载css，js
esriLoader.loadScript({url:esriJs});
esriLoader.loadCss(esriCss);
// 创建地图
import createMapApi from "@/api/createMapApi";
// 导入静态图层
import createTileLayerApi from "@/api/createTileLayerApi";
// 导入测距方法
import { measureDistanceApi } from "@/api/measureDistanceApi";
export default {
  data() { 
    return {
      map:"",//地图容器
    }
  },
  methods:{
    async createMap(){
      const _this = this;
      if(_this.map === ""){
        // 创建地图
        _this.map = await createMapApi(_this.$refs.map);
        // 创建静态图层
        let tileLayer = await createTileLayerApi(czdzUrl);
        // 叠图
        _this.map.addLayer(tileLayer);
      }
    },
    meansureDistance(){
      const _this = this;
      measureDistanceApi(_this.map);
    },
    clear(){
      this.map.graphics.clear();
    },
  },
  mounted(){
    this.createMap();
  }
 }
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
    height: 100%;
    position: relative;
    .map{
      width: 100%;
      height: 100%;
    }
    .toolbar{
      position: absolute;
      top: 10px;
      left: 8px;
    }
  }
</style>