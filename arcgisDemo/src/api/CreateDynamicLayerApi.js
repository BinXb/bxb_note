import * as esriLoader from 'esri-loader';// 加载arcgis所依赖的类

// 创建动态矢量图层
// 需要参数：1.layerUrl - 动态图层Url
const createDynamicLayerApi = async (layerUrl) => {
  const _this = this;
  const [ArcGISDynamicMapServiceLayer] = await esriLoader.loadModules([
    "esri/layers/ArcGISDynamicMapServiceLayer"
  ]);// 加载所需要的arcgis组件
  let dynamicLayer = new ArcGISDynamicMapServiceLayer(layerUrl);//创建动态图层
  return dynamicLayer
}

export default createDynamicLayerApi;






