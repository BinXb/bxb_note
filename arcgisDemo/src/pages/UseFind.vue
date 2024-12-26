<template>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
    <div class="toolbar">
      <el-input size="small" type="text" v-model="value">
        <el-button slot="append" size="small" type="primary" @click="useFind">查询</el-button>
      </el-input>
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
import { useFindApi } from "@/api/useFindApi";
export default {
  data() { 
    return {
      map:'',// 地图对象
      value:"",//查询条件
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
    // find查询只可进行属性查询，但是可以查多图层
    // 鼠标点击查询 - 仅使用空间查询
    async useFind(){
      const _this = this;
      let res = await useFindApi(_this.map,xingzhengUrl,this.value);
      if(res.length !== 0){
        let str = "";
        res.forEach((item,index) => {
          str += index + item.feature.attributes.XZQMC+"\n";
        })
        alert(str);
      }else{
        alert("没有查到结果，请检查输入")
      }

    }
  },
  mounted(){
    this.createMap();
  }
 }
</script>

<style lang="scss" scoped>
  
</style>