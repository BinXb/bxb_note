<template>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
    <div class="toolbar">
      <el-button type="primary" @click="useQueryByPoint">点击查询</el-button>
      <el-button type="primary" @click="useQueryByArea">框选查询</el-button>
      <el-button type="primary" @click="clear">清除</el-button>
    </div>
  </div>
</template>

<script>
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 导入所需资源
import { esriJs, esriCss, czdzUrl, xingzhengUrl } from "@/config/map";
// 加载资源
esriLoader.loadScript({ url: esriJs });
esriLoader.loadCss(esriCss);
// 导入创建地图
import createMapApi from "@/api/createMapApi";
// 导入创建静态图层方法
import createTileLayerApi from "@/api/createTileLayerApi";
import createDynamicLayerApi from "@/api/CreateDynamicLayerApi";
import { useQueryApiByPointApi, useQueryByAreaApi } from "@/api/useQueryApi";
export default {
  data() {
    return {
      map: "",
      mapClick: "",
    };
  },
  methods: {
    async createMap() {
      const _this = this;
      if (_this.map === "") {
        // 创建地图
        _this.map = await createMapApi(_this.$refs.map);
        // 创建静态图层
        let layer1 = await createTileLayerApi(czdzUrl);
        _this.map.addLayer(layer1);
        // 创建动态图层
        let layer2 = await createDynamicLayerApi(xingzhengUrl);
        _this.map.addLayer(layer2);
      }
    },
    // query可以进行空间和属性联合查询，对单图层
    // 框选查询-空间查询和条件查询都使用了
    useQueryByPoint() {
      const _this = this;
      if (_this.mapClick === "") {
        // 先给map绑定点击事件
        // 通过evt.mapPoint可以得到点击的坐标位置
        _this.mapClick = _this.map.on("click", async (evt) => {
          let res = await useQueryApiByPointApi(
            _this.map,
            xingzhengUrl + "/0",
            evt.mapPoint
          );//这里第二个参数的写法，因为地图服务会有多个子图层，所以要精确到子图层
          console.log('查询结果',res);
          // 下面进行处理
          if(res.features.length !== 0){
            alert("该行政区是："+res.features[0].attributes.XZQMC);
          }else{
            alert("超出常州区域")
          }
        });
      }
    },
    async useQueryByArea(){
      const _this = this;
      let res = await useQueryByAreaApi(_this.map,xingzhengUrl+"/0");
      // 下面对结果进行自行处理
      if(res.features.length !== 0){
        let str = "";
        res.features.forEach((item,index) => {
          str += index + item.attributes.XZQMC + "\n";
        });
        alert(str);
      }else {
        alert("超出常州区域");
      }
    },
    clear(){
      this.map.graphics.clear();
    }
  },
  mounted() {
    this.createMap();
  },
};
</script>

<style lang="scss" scoped></style>
