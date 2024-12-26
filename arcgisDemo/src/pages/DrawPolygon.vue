<template>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
    <!-- 工具条开始 -->
    <div class="toolbar">
      <el-button type="primary" @click="drawPolygon1">画面(圆)</el-button>
      <el-button type="primary" @click="drawPolygon2">画面(矩形)</el-button>
      <el-button type="primary" @click="drawPolygon3">画面(箭头)</el-button>
      <el-button type="primary" @click="drawPolygon4">画面(多边形)</el-button>
      <el-button type="primary" @click="drawPolygon5">画面(随意边形)</el-button>
      <el-button type="primary" @click="drawPolygon6">画面(已有位置)</el-button>
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
// 导入画线方法
import { drawPolygonByToolbarApi, drawPolygonByPointsApi } from "@/api/drawPolygonApi";
export default {
  data() {
    return {
      map: "",
      layer1: "",
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
      }
    },
    // 使用工具栏画圆
    drawPolygon1() {
      const _this = this;
      let borderColor = [100, 100, 255];// 比那狂颜色
      let fillColor = [50, 90, 211];// 填充颜色
      drawPolygonByToolbarApi(_this.map, "CIRCLE", borderColor, fillColor);
    },
    // 使用工具栏画矩形
    drawPolygon2() {
      const _this = this;
      let borderColor = [100, 100, 255];
      let fillColor = [50, 90, 211];
      drawPolygonByToolbarApi(_this.map, "RECTANGLE", borderColor, fillColor);
    },
    // 使用工具栏画面(箭头)
    drawPolygon3() {
      const _this = this;
      drawPolygonByToolbarApi(_this.map, "ARROW");
    },
    // 使用工具栏画多边形
    drawPolygon4() {
      const _this = this;
      drawPolygonByToolbarApi(_this.map, "POLYGON")
    },
    // 使用工具栏画随意边形
    drawPolygon5() {
      const _this = this;
      drawPolygonByToolbarApi(_this.map, "FREEHAND_POLYGON");
    },
    // 根据位置信息画面
    drawPolygon6() {
      const _this = this;
      let points = [
        [119.397128, 31.916527],
        [119.410703, 31.897555],
        [119.402292, 31.892353],
        [119.389846, 31.891365],
        [119.385756, 31.899754],
        [119.397128, 31.916527],
      ];
      drawPolygonByPointsApi(_this.map,points);
    },
    clear() {
      this.map.graphics.clear()
    },
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
</style>