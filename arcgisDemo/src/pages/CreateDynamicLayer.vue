<template>
  <div class="container">
    <!-- 动态矢量图层(矢量) -->
    <div class="map" id="map" ref="map"></div>
    <div class="toolBar">
      <el-button type="primary" @click="addLayer"
        >添加新图层(只可以添加一次)</el-button
      >
      <el-button type="primary" @click="hideDynamicLayer">隐藏</el-button>
      <el-button type="primary" @click="showDynamicLayer">显示</el-button>
      <el-button type="primary" @click="addszgj">添加szgj</el-button>
    </div>
  </div>
</template>

<script>
// 导入Arcgis依赖
import * as esriLoader from "esri-loader";
// 加载所需要的js，css，url，参考系
import { esriJs, esriCss, czdzUrl, xingzhengUrl, szgjUrl } from "@/config/map";
// 加载css、加载Js
esriLoader.loadScript({ url: esriJs });
esriLoader.loadCss(esriCss);
// 导入加载地图底图
import createMapApi from "@/api/createMapApi";
// 加载静态地图
import createTileLayer from "@/api/createTileLayerApi";
// 导入加载矢量图层
import createDynamicLayerApi from "@/api/CreateDynamicLayerApi";
export default {
  data() {
    return {
      map: "", // 底图
      layer1: "", // 静态图层
      layer2: "", // 动态图层
      layer3: "", // szgj
    };
  },
  methods: {
    // 创建地图
    async createMap() {
      const _this = this;
      if (this.map === "") {
        // 1.创建底图
        _this.map = await createMapApi(_this.$refs.map);
        // 2.创建图层
        _this.layer1 = await createTileLayer(czdzUrl);
        // 3.叠加图层
        _this.map.addLayer(_this.layer1);
      }
    },
    // 添加szgj
    async addszgj() {
      const _this = this;
      if (this.layer3 === "") {
        _this.layer3 = await createDynamicLayerApi(szgjUrl);
        _this.map.addLayer(_this.layer3);
      }
    },
    // 添加动态图层
    async addLayer() {
      const _this = this;
      if (this.layer2 === "") {
        // 创建动态图层
        _this.layer2 = await createDynamicLayerApi(xingzhengUrl);
        _this.map.addLayer(_this.layer2);
      }
    },
    // 隐藏动态图层
    hideDynamicLayer() {
      const _this = this;
      if (_this.layer2 !== "") {
        _this.layer2.hide();
      }
    },
    // 显示动态图层
    showDynamicLayer() {
      const _this = this;
      if (_this.layer2 !== "") {
        _this.layer2.show();
      }
    },
  },
  mounted() {
    this.createMap();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .map {
    height: 100%;
    width: 100%;
  }
  .toolBar {
    position: absolute;
    top: 10px;
    left: 12px;
  }
}
</style>
