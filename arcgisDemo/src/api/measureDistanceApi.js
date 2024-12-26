import * as esriLoader from "esri-loader";//加载arcgis依赖
import { EPSG, computeUrl, szgjUrl } from "@/config/map";// 导入资源依赖

// 先画线，再计算距离
// 需要参数，地图对象
const measureDistanceApi = async (map, color) => {
  const _this = this;
  const [Dojo, Draw, Font, SimpleLineSymbol, TextSymbol, Color, Graphic, GeometryService, LengthsParameters, SpatialReference, Point] = await esriLoader.loadModules([
    "dojo",
    "esri/toolbars/draw",
    "esri/symbols/Font",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/TextSymbol",
    "esri/Color",
    "esri/graphic",
    "esri/tasks/GeometryService",
    "esri/tasks/LengthsParameters",
    "esri/SpatialReference",
    "esri/geometry/Point"
  ]);//加载所需的arcgis组件
  console.log(color);
  if (color == undefined) {
    // 如果没有传入颜色，择显示默认颜色
    color = [255, 0, 0];
  }

  // 绑定工具栏到map上
  let toolbar = new Draw(map);
  // 激活工具栏,激活POLYLINE
  toolbar.activate(Draw.POLYLINE);
  // 绘制形状，计算距离
  toolbar.on("draw-complete", evt => {
    toolbar.deactivate();//失效后，绘画停止
    console.log(evt.geometry);
    let symbol = new SimpleLineSymbol(
      SimpleLineSymbol.STYLE_SOLID,// 设置线条样式，可以是实线，虚线等
      Color(color),// 设置线条颜色
      2,//设置线条粗细
    );
    // 创建形状graphic
    let graphic = new Graphic(evt.geometry, symbol);
    // 将形状应用到map上
    map.graphics.add(graphic);// map对象自带一个图形图层就是map.graphics,可以在上面添加形状
    // 画线到此为止
    // 下面就是计算距离
    let geometryService = new GeometryService(computeUrl);
    let endX = evt.geometry.paths[0][evt.geometry.paths[0].length - 1][0];
    let endY = evt.geometry.paths[0][evt.geometry.paths[0].length - 1][1];
    let endPoint = new Point(
      endX,
      endY,
      new SpatialReference({ wkid: EPSG })
    );
    let lengthParams = new LengthsParameters();
    lengthParams.polylines = [evt.geometry];
    lengthParams.lengthUnit = GeometryService.UNIT_METER;
    lengthParams.geodesic = true;
    lengthParams.polylines[0].spatialReference = new SpatialReference(EPSG);
    geometryService.lengths(lengthParams);
    Dojo.connect(geometryService, "onLengthsComplete", result => {
      let distance = Number(result.lengths[0].toFixed(4) + "米");
      let textSymbol = new TextSymbol(
        distance,
        new Font("16px", Font.STYLE_ITALIC),
        new Color(color)
      );
      let graphic = new Graphic(endPoint, textSymbol);
      map.graphics.add(graphic);
    })
  })
}
export {
  measureDistanceApi,
}