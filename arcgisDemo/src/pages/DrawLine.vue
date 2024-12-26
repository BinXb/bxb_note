<template>
  <div class="container">
    <!-- 地图容器 -->
    <div class="map" id="map" ref="map"></div>
    <div class="toolbar">
      <el-button type="primary" @click="drawLine1">画线1(单线段)</el-button>
      <el-button type="primary" @click="drawLine2">画线1(多线段)</el-button>
      <el-button type="primary" @click="drawLine3">画线1(随意线段)</el-button>
      <el-button type="primary" @click="deleteLines">删除</el-button>
    </div>
  </div>
</template>

<script>
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 导入所需要的css、js、url资源
import { esriCss,esriJs,czdzUrl } from '@/config/map';
esriLoader.loadCss(esriCss);
esriLoader.loadScript({url:esriJs});
// 创建地图
import createMapApi from '@/api/createMapApi';
// 创建静态图层
import createTileLayerApi from '@/api/createTileLayerApi';
// 导入画线方法
import { drawLineApi } from "@/api/drawLineApi";

export default {
  data() { 
    return {
      map:"", // 地图对象
      layer1:"", // 静态图层
    }
  },
  methods:{
    async createMap(){
      const _this = this;
      if(_this.map === ""){
        // 创建地图
        _this.map = await createMapApi(_this.$refs.map);
        // 创建静态图层
        _this.layer1 = await createTileLayerApi(czdzUrl);
        // 将静态图层叠加到map上
        _this.map.addLayer(_this.layer1);
      }
    },
    // 使用工具栏画线(单线段),画线操作少
    drawLine1(){
      const _this = this;
      drawLineApi(_this.map,'LINE',[255,0,0])
    },
    // 使用工具栏画线(多线段)
    drawLine2(){
      const _this = this;
      drawLineApi(_this.map,"POLYLINE",[0,255,255])
    },
    // 使用工具栏画线(随意线段)
    drawLine3(){
      const _this = this;
      drawLineApi(_this.map,"FREEHAND_POLYLINE")
    },
    // 清除
    deleteLines(){
      this.map.graphics.clear();
    }
  },
  mounted(){
    this.createMap();
  },
 }
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
    height: 100%;
    position:relative;
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