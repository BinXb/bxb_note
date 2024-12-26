// 测面
//  加载arcgis依赖
import * as esriLoader from "esri-loader";
// 测面所需的依赖
import * as turf from "@turf/turf";
import {
  EPSG,
} from "@/config/map";
// 先画面，再计算面积
// 需要参数：地图对象

const measureAreaApi = async (map) => {
  const _this = this;
  const [Draw, Font, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Color, Graphic, Point, SpatialReference] = await esriLoader.loadModules([
    "esri/toolbars/draw",
    "esri/symbols/Font",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/TextSymbol",
    "esri/Color",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/SpatialReference"
  ]); // 加载所需的arcgis组件

  let toolbar = new Draw(map);// 创建工具栏并绑定到map上
  toolbar.activate(Draw.POLYGON);//激活POLYGON
  toolbar.on("draw-complete", evt => {
    toolbar.deactivate();//失效后绘画停止
    let symbol = new SimpleFillSymbol(
      SimpleFillSymbol.STYLE_SOLID,
      new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_SOLID,
        Color([255, 0, 0]),
        2
      ),
      new Color([0, 0, 0, 0.3])
    );
    let graphic = new Graphic(evt.geometry, symbol);//创建形状
    map.graphics.add(graphic);// 将形状添加到map的形状图层中
    // 下面开始计算
    let endX = (evt.geometry.getExtent().xmin + evt.geometry.getExtent().xmax) / 2;
    let endY = (evt.geometry.getExtent().ymin + evt.geometry.getExtent().ymax) / 2;
    let endPoint = new Point(
      endX,
      endY,
      new SpatialReference({ wkid: EPSG })
    );
    let areaVal = "";
    if (EPSG == 4490) {
      let polygon = turf.polygon(evt.geometry.rings);
      areaVal = turf.area(polygon);
    } else if (EPSG == 4528) {
      areaVal = computePolygonArea(evt.geometry.rings[0]);
    }
    let area = Number(areaVal).toFixed(4) + '平方米';
    let textSymbol = new TextSymbol(
      area,
      new Font("16pt", Font.STYLE_ITALIC),
      new Color([255, 0, 0])
    );
    let textGraphic = new Graphic(endPoint, textSymbol);
    map.graphics.add(textGraphic);
  });

}

const computePolygonArea = (points) => {
  let point_num = points.length;
  if (point_num < 3) {
    return 0.0
  }
  let s = points[0][1] * (points[point_num - 1][0] - points[1][0]);
  for (let i = 1; i < point_num; ++i) {
    s += points[i][1] * (points[i - 1][0] - points[(i + 1) % point_num][0]);
  }
  return Math.abs(s / 2.0);
}
export {
  measureAreaApi
}