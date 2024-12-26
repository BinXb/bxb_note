const mapUrl = "http://192.168.1.115:8081";//
const popupUrl = mapUrl + "/popups"; //国家电子底图
const esriJs = "http://192.168.1.115:8081/arcgis_js_api/library/3.30/3.30/init.js"; //基础js
const esriCss = mapUrl + "/arcgis_js_api/library/3.30/3.30/esri/css/esri.css"; //基础css
//http://192.168.1.6:8399/arcgis/rest/services/CzsjtlyMap_compact/MapServer
const czdzUrl = 'https://arcgis-waf.qj-xc.cn:6443/arcgis/rest/services/CZ_Vector/MapServer'; //常州电子底图
// const czdzMarkUrl = 'https://arcgis-waf.qj-xc.cn:6443/arcgis/rest/services/CZ_Vector_Anno/MapServer'; //常州电子底图-标记
// const czdzMarkUrl = 'https://61.177.71.243:8184/historyraster/rest/services/historyVector/js_sldt_grey/MapServer'; //常州电子底图-标记
// const czdzImageMarkUrl = 'http://58.216.48.11:6080/arcgis/rest/services/Image_2021/MapServer'; //常州影像底图-标记
// // 没有常州影像-标记底图
// const computeUrl = "http://10.4.1.50:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer";
// // const computeUrl = "http://58.216.48.11:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer"; //这个服务是用来计算距离的
// const xingzhengUrl = "http://www.czch.com.cn:6080/arcgis/rest/services/DJT_XZJX/MapServer"; //行政区域的服务
// const testUrl = "http://www.czch.com.cn:6080/arcgis/rest/services/jkws_base/MapServer"; //(动态图层)测试服务
// const serverUrl = "http://www.czch.com.cn:6080/arcgis/rest/services/DJT/MapServer"; //宗地，地籍，地籍子区的服务
// 切片：https://61.177.71.243:8184/historyraster/rest/services/historyVector/js_sldt_grey/MapServer
// 矢量：https://61.177.71.243:8184/arcgis/rest/services/SZGJ/MapServer
// const szgjUrl = "https://61.177.71.243:8184/arcgis/rest/services/SZGJ/MapServer";

const EPSG = 4490; //空间参考系，因为地球不是一张平面，而是被铺成了一张平面，必须使用坐标系来精确定位

// 初始化地图所展示的范围，矩形区域
const EXTENT = {
  xmin: 118.7042822445701,
  ymin: 31.046740023691534,
  xmax: 120.9270752928116,
  ymax: 32.33481673514486
};
const BORDERCOLOR = [0,0,255]; // 全局边框(线条)颜色
const FILLCOLOR = [205,209,211,0.5];// 全局填充颜色
export {
  esriJs,
  esriCss,
  czdzUrl,
  popupUrl,
  // czdzImageMarkUrl,
  // czdzMarkUrl,
  // computeUrl,
  // xingzhengUrl,
  // testUrl,
  // serverUrl,
  // szgjUrl,
  EPSG,
  EXTENT,
  BORDERCOLOR,
  FILLCOLOR
}



