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
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 导入css、js、url资源
import { esriJs,esriCss,czdzUrl } from '@/config/map';
// 加载资源
esriLoader.loadScript({url:esriJs});
esriLoader.loadCss(esriCss);
// 创建地图
import createMapApi from "@/api/createMapApi";
// 导入静态图层
import createTileLayerApi from "@/api/createTileLayerApi";
// 导入测面方法
import { measureAreaApi } from "@/api/measureAreaApi";
export default {
  data() { 
    return {
      map:"",
    }
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
      }
    },
    measureArea(){
      const _this = this;
      measureAreaApi(_this.map);
    },
    clear(){
      this.map.graphics.clear();//清除
    }
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