<template>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
    <!-- 工具条开始 -->
    <div class="toolbar">
			<el-button type="primary" @click="drawPointByLocation">画点1(根据坐标)</el-button>
			<el-button type="primary" @click="drawPointByLoactionUseImg">画点2(根据坐标-使用图片)</el-button>
			<el-button type="primary" @click="drawPointUseToolbar">画点3(手绘单点)</el-button>
			<el-button type="primary" @click="drawPointsUseToolbar">画点4(手绘多点)</el-button>
			<el-button type="primary" @click="clear">清除</el-button>
    </div>
    <!-- 工具条结束 -->
  </div>
</template>

<script>
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 导入所需要的js、css、url资源等
import { esriCss, esriJs, czdzUrl } from "@/config/map";
esriLoader.loadScript({ url: esriJs });
esriLoader.loadCss(esriCss);
// 导入创建地图api
import createMapApi from "@/api/createMapApi";
// 导入创建静态图层api
import createTileLayerApi from "@/api/createTileLayerApi";
// 导入图形图层
import createGraphicsLayerApi from "@/api/createGraphicsLayerApi";
// 画点
import {
  drawPicPointByLocationApi,
  drawPointByLocationApi,
  drawPointByToolbarApi
} from "@/api/drawPointApi";
export default {
  data() {
    return {
      map: "",
      layer1: "",
      graphicsLayer: ""
    }
  },
  methods: {
    // 创建地图
    async createMap() {
      const _this = this;
      if (_this.map === "") {
        // 创建地图
        _this.map = await createMapApi(_this.$refs.map);
        // 创建静态图层
        _this.layer1 = await createTileLayerApi(czdzUrl);
        // 叠图
        _this.map.addLayer(_this.layer1)
        // 创建图形图层,可以在上面画图
        _this.graphicsLayer = await createGraphicsLayerApi();
        // 叠图，
        _this.map.addLayer(_this.graphicsLayer);
      }
    },
    // 根据坐标画点
    async drawPointByLocation() {
      let x = 119.57669883042644;//先得到x和y的坐标值
      let y = 31.42483273064232;
      let graphic = await drawPointByLocationApi(x, y);//创建点
      this.graphicsLayer.add(graphic);//将图形加到图形图层上,即可显示图形
    },
    // 根据坐标画点使用图片
    async drawPointByLoactionUseImg() {
      let x = 119.67669883042644; //先得到x和y的坐标值
      let y = 31.42483273064232;
      let graphic = await drawPicPointByLocationApi(x,y,"location.png");//创建图片点
      this.graphicsLayer.add(graphic);
    },
    // 使用工具栏画点
    async drawPointUseToolbar() {
      const _this = this;
      drawPointByToolbarApi(_this.map, "POINT");//画单个点
    },
    // 使用工具栏画点(多点)
    async drawPointsUseToolbar() { 
      const _this = this;
      drawPointByToolbarApi(_this.map,"MULTI_POINT","location.png");
    },
      // 清除
      clear() {
        this.graphicsLayer.clear();//图形图层的clear方法,可以将该图层上的graphic清理掉
        this.map.graphics.clear();//清除
      }
    },
    mounted() {
      this.createMap();
    },
  }
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
  .toolbar {
    position: absolute;
    left: 10px;
    top: 10px;
    display: flex;
    width: 80%;
  }
}
</style>@/api/drawPointApi