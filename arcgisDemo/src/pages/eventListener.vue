<template>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
    <div class="toolbar">
      <el-button type="primary" @click="listener">监听事件</el-button>
    </div>
  </div>
</template>

<script>
import * as esriLoader from "esri-loader";
import { esriJs,esriCss,czdzUrl, xingzhengUrl } from "@/config/map";
esriLoader.loadScript({url:esriJs});
esriLoader.loadCss(esriCss);
import createMapApi from "@/api/createMapApi";
import createTileLayerApi from "@/api/createTileLayerApi";
import createDynamicLayerApi from "@/api/CreateDynamicLayerApi";
import { eventListenerApi } from "@/api/eventListenerApi";
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
        _this.map = await createMapApi(_this.$refs.map);
        let layer1 = await createTileLayerApi(czdzUrl);
        _this.map.addLayer(layer1);
        let layer2 = await createDynamicLayerApi(xingzhengUrl);
        _this.map.addLayer(layer2);
      }
    },
    async listener(){
      const _this = this;
      await eventListenerApi(_this.map);
    }
  },
  mounted(){
    this.createMap();
  }
 }
</script>

<style lang="scss" scoped>
</style>