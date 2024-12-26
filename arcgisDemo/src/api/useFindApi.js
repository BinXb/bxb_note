// 导入arcgis依赖
import * as esriLoader from "esri-loader";

// 使用find查询，根据特定属性，可以模糊查询或者完全匹配
// 需要参数：地图对象、地图服务对象的url、查询条件
const useFindApi = async (map,url,searchText)=> {
  const _this = this;
  const [FindTask,FindParameters] = await esriLoader.loadModules([
    "esri/tasks/FindTask",
    "esri/tasks/FindParameters",
  ]);//加载所需的arcgis组件
  let findTask = new FindTask(url);//传入服务url
  let findParams = new FindParameters();//创建FindParameters
  let allLayerIds = [0];// 需要查询的所有图层Id，即url最后一位，这边列表的顺序会成为查询的顺序
  findParams.returnGeometry= true;//是否返回集合对象
  findParams.layerIds = allLayerIds;//设置能够查询的图层
  findParams.searchFields = ["XZQMC"];//限定查询的字段
  findParams.searchText = searchText;//设置查询关键字
  let res = await findTask.execute(findParams,result => {
    console.log(result);
  })
  return res;
}

export {
  useFindApi,
}