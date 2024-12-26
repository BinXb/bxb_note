import * as esriLoader from "esri-loader"; //加载arcgis依赖类，必须
// 创建静态图层（矢量，一般是底图）
// 需要参数: 1、layerUrl:静态图层的url
const createTileLayerApi = async (layerUrl) => {
  const _this = this;
  const [ArcGISTiledMapServiceLayer] = await esriLoader.loadModules([
    "esri/layers/ArcGISTiledMapServiceLayer",
  ]);//加载所需的arcgis组件

  let tileLayer = new ArcGISTiledMapServiceLayer(layerUrl); //创建静态图层

  return tileLayer;
}

export default createTileLayerApi;