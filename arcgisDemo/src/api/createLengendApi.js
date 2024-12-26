// 创建图例
import * as esriLoader from "esri-loader";

// 打开或者关闭图例
// 需要参数：地图对象、图例盒子Id
const createLegendApi = async (map,id) => {
  const _this = this;
  const [Legend] = await esriLoader.loadModules([
    "esri/dijit/Legend",
  ]);//加载所需要的组件
  let legend = new Legend({
    map: map
  },id);
  return legend;
}
export {
  createLegendApi,
}