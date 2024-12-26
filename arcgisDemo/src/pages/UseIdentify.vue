<template>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
    <div class="toolbar">
      <el-button type="primary" @click="useIdentify">框选查询</el-button>
      <el-button type="primary" @click="clear">清除</el-button>
    </div>
  </div>
</template>

<script>
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 导入所需要的资源
import { esriJs,esriCss,czdzUrl, xingzhengUrl } from "@/config/map";
esriLoader.loadScript({url:esriJs});
esriLoader.loadCss(esriCss);
// 导入创建地图
import createMapApi from "@/api/createMapApi";
// 导入创建静态图层
import createTileLayerApi from "@/api/createTileLayerApi";
// 导入创建动态图层
import createDynamicLayerApi from "@/api/CreateDynamicLayerApi";
import { useIdentifyApi } from "@/api/useIdentifyApi";
export default {
  data() { 
    return {
      map:'',// 地图对象
    }
  },
  methods:{
    async createMap(){
      const _this = this;
      if(_this.map === ""){
        _this.map = await createMapApi(_this.$refs.map);
        let layer1 = await createTileLayerApi(czdzUrl);
        _this.map.addLayer(layer1)
        let layer2 = await createDynamicLayerApi(xingzhengUrl);
        _this.map.addLayer(layer2);
      }
    },
    async useIdentify(){
      // 使用identify查询只可进行空间查询，但是可以查询多图层
      const _this = this;
      let res = await useIdentifyApi(_this.map,xingzhengUrl);
      console.log(res);
      if(res.length!==0){
        let str = "";
        res.forEach((item,index) => {
          str += index+item.feature.attributes.XZQMC+"\n";
        });
        alert(str);
      }else{
        alert("没有查询结果")
      }
    },
    clear(){
      this.map.graphics.clear();
    }
  },
  mounted(){
    this.createMap();
  }
 }
</script>

<style lang="scss" scoped>
  
</style>