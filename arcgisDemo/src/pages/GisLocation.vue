<template>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
    <div class="toolbar">
      <el-button type="primary" @click="locationByPoint">定位</el-button>
      <el-button type="primary" @click="locationByArea">定位面1</el-button>
      <el-button type="primary" @click="locationBySetExtent">定位面setExtent</el-button>
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
import { drawPointByLocationApi } from "@/api/drawPointApi";
import { drawPolygonByPointsApi } from "@/api/drawPolygonApi";
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
    // 通过传入坐标进行定位
    async locationByPoint(){
      const _this = this;
      _this.map.graphics.clear();//定位之前清楚形状
      let x = 119.57669883042644;
      let y = 31.42483273064232;
      let graphic = await drawPointByLocationApi(x,y);//创建点
      _this.map.graphics.add(graphic);//将图形添加到map上
      // graphic.geometry就是一个带坐标的点,如果仅创建一个point，也可以用point定位
      _this.map.centerAndZoom(graphic.geometry,15);//设置点并且指定缩放级别
      // _this.map.centerAt(graphic.geometry);//仅设置点不缩放
    },
    // 定位面 使用centerAndZoom
    async locationByArea(){
      const _this = this;
      _this.map.graphics.clear();//定位之前清楚形状
      let points = [
        [119.397128, 31.916527],
        [119.410703, 31.897555],
        [119.402292, 31.892353],
        [119.389846, 31.891365],
        [119.385756, 31.899754],
        [119.397128, 31.916527],
      ];//位置信息，有一个一个点组成,此处是4490坐标系
      let graphic = await drawPolygonByPointsApi(_this.map,points);//创建面
      console.log(graphic.geometry.getExtent());
      console.log(graphic.geometry.getExtent().getCenter());
      
      // 定位面
      _this.map.centerAndZoom(graphic.geometry.getExtent().getCenter(),15);
    },

    async locationBySetExtent(){
      const _this = this;
      _this.map.graphics.clear();//定位之前清楚形状
      let points = [
        [119.497128, 31.816527],
        [119.510703, 31.797555],
        [119.502292, 31.792353],
        [119.489846, 31.791365],
        [119.485756, 31.799754],
        [119.497128, 31.816527],
      ];//位置信息
      let graphic = await drawPolygonByPointsApi(_this.map,points);
      _this.map.setExtent(graphic.geometry.getExtent().expand(1.5));//将面的范围，设置到地图的范围也可以做到，类似定位效果
    }

  },
  mounted(){
    this.createMap();
  }
 }
</script>

<style lang="scss" scoped>
</style>