// 加载arcgis依赖
import * as esriLoader from "esri-loader";
// 创建图形图层
const createGraphicsLayerApi = async ()=> {
  const _this = this;
  // 加载图形图层组件
  const [GraphicsLayer] = await esriLoader.loadModules([
    "esri/layers/GraphicsLayer"
  ]);
  // 实例图形图层，在上面画图形
  let graphicsLayer = new GraphicsLayer();
  return graphicsLayer;
}
export default createGraphicsLayerApi;