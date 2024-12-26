<template>
  <div class="container">
    <!-- 地图容器开始 -->
    <div class="map" id="map" ref="map"></div>
    <!-- 地图容器结束 -->
    <!-- 工具栏开始 -->
    <div class="toolBar">
      <el-button type="primary" @click="addTileLayer">添加图层(只需要添加一次)</el-button>
      <el-button type="primary" @click="hideMarkLayer">隐藏</el-button>
      <el-button type="primary" @click="showMarkLayer">显示</el-button>
    </div>
    <!-- 工具栏结束 -->
  </div>
</template>

<script>
// 加载arcgis依赖
import * as esriLoader from "esri-loader";
// 引入所需要的参考系，url，js，css
// czdzUrl - 常州电子地图
// czdzMarkUrl - 常州电子地图(标记)
import { esriJs, esriCss, czdzUrl, czdzMarkUrl } from "@/config/map";
import createTileLayerApi from "@/api/createTileLayerApi";
import createMapApi from "@/api/createMapApi";
esriLoader.loadScript({ url: esriJs }); //加载js
esriLoader.loadCss(esriCss); // 加载css
export default {
  data() {
    return {
      map: "", //地图
      layer1: "", // 图层1
      layer2: "", // 图层2
    };
  },
  methods: {
    // 创建静态切片图层
    // 静态切片图层一般固定几个,不太会变化
    async createTileLayer() {
      const _this = this;
      if (_this.map === "") {
        // 地图初始化
        // 第一步创建地图
        _this.map = await createMapApi(_this.$refs.map);
        // 第二步创建静态地图
        _this.layer1 = await createTileLayerApi(czdzUrl);
        // 第三步将静态地图添加到map上 - 也叫叠图
        _this.map.addLayer(_this.layer1);
      }
    },
    // 添加图层
    async addTileLayer() {
      const _this = this;
      if (_this.layer2 === "") {
        _this.layer2 = await createTileLayerApi(czdzMarkUrl);
        _this.map.addLayer(_this.layer2);
      }
    },
    // 隐藏标记图层
    async hideMarkLayer() {
      const _this = this;
      if (_this.layer2 !== "") {
        // hide方法隐藏指定图层
        _this.layer2.hide();
      }
    },
    // 显示隐藏图层
    async showMarkLayer() {
      const _this = this;
      if (_this.layer2 !== "") {
        // show()方法显示指定图层
        _this.layer2.show();
      }
    },
  },
  mounted() {
    this.createTileLayer();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;

  .map {
    width: 100%;
    height: 100%;
  }
  .toolBar{
    position: absolute;
    top: 10px;
    left: 10px;
  }
}
</style>
