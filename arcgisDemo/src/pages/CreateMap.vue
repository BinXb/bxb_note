<template>
  <div class="CreateMap">
    <!-- 创建地图容器 -->
     <div class="map" id="map" ref="map"></div>
  </div>  
</template>

<script>
// 导入arcgis依赖esri-loader
import * as esriLoader from "esri-loader";
// 引入所需的js,css
import {esriJs,esriCss} from "@/config/map";
// 加载js
esriLoader.loadScript({url:esriJs});
// 加载css
esriLoader.loadCss(esriCss);
// 创建地图
import createMapApi from "@/api/createMapApi";
export default {
  data() { 
    return {
      map:"",//地图
    }
  },
  methods:{
    async createMap(){
      const _this = this;
      if(_this.map === ""){
        // createMapApi()两个参数 地图容器，范围
        _this.map = await createMapApi(_this.$refs.map);
      }
    }
  },
  mounted(){
    this.createMap();
  },
 }
</script>

<style lang="scss" scoped>
  .CreateMap{
    height: 100vh;
    .map{
      width: 100%;
      height: 100%;
    }
  }
</style>