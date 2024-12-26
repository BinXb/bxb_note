import * as esriLoader from "esri-loader";//加载arcgis依赖
// 导入默认坐标和初始化区域
import {
  EPSG,
  EXTENT
} from "@/config/map";

// 创建地图
// 需要参数：地图容器 - mapContainer、地图范围 - mapExtent
const createMapApi = async (mapContainer,mapExtent) => {
  console.log('准备创建地图');
  const _this = this;
  // Map - ArcGis核心组件 - 用作渲染
  // Extent - 一个二维平面上的矩形区域，用来定义地图的可视范围或空间查询范围
  // SpatialReference - 对象，地理空间信息
  // ArcGISTiledMapServiceLayer - 图层
  const [Map, Extent, SpatialReference, ArcGISTiledMapServiceLayer] = await esriLoader.loadModules([
    "esri/map",
    "esri/geometry/Extent",
    "esri/SpatialReference",
    "esri/layers/ArcGISTiledMapServiceLayer",
  ]);//加载所需的arcgis组件
  // 定位位置
  const sp = new SpatialReference(EPSG);
  if(mapExtent === undefined){
    // 说明没有传extent过来
    // 那么便使用默认的范围
    mapExtent = EXTENT;
    mapExtent.spatialReference = {
      wkid:EPSG,
    }
  }else{
    // 有extent传过来
    if(mapExtent.spatialReference === undefined){
      mapExtent.spatialReference = {
        wkid:EPSG,
      }
    }
  }
  // 准备地图显示区域
  const _extent = new Extent(mapExtent);
  let map = new Map(mapContainer ,{
    logo:true,// 是否在地图右下角显示esri的logo，默认true
    slider:false,// 是否显示左上角放大缩小的滑块，只有叠加静态或者动态图层后才显示，默认true
    spatialReference:sp,// 加上空间坐标系
    extent:_extent,// 设置地图初始范围
    zoom:11, // 设置地图缩放等级，越大离地面越近(一般最大20)
    minZoom:10,// 设定地图的最小缩放等级
  })
  return map
}


export default createMapApi;