// 画面
import * as esriLoader from "esri-loader";
import {
    BORDERCOLOR,
    FILLCOLOR
} from "@/config/map";

// 使用工具栏画面
// 需要参数：地图对象、工具类型、边框颜色、填充颜色
const drawPolygonByToolbarApi = async (map, type, borderColor, fillColor) => {
    const _this = this;
    const [Graphic, SimpleLineSymbol, SimpleFillSymbol, PictureFillSymbol, Draw, Color] = await esriLoader.loadModules([
        "esri/graphic",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/PictureFillSymbol",
        "esri/toolbars/draw",
        "esri/Color",
    ]);// 加载所需的arcgis组件

    // 如果颜色不传，就给个默认值
    if (borderColor === undefined) {
        borderColor = BORDERCOLOR;
    };
    if (fillColor === undefined) {
        fillColor = FILLCOLOR;
    };

    // 创建工具栏
    let toolbar = new Draw(map);// 绑定到map上
    // 激活工具栏，type：CRICLE，RECTANGLE，POLYGON，ARROW，FREEHAND_POLYGON
    toolbar.activate(Draw[type]);
    toolbar.on("draw-complete", evt => {
        toolbar.deactivate();//失效后，绘画停止
        let symbol = new SimpleFillSymbol(
            SimpleFillSymbol.STYLE_SOLID,// 设置填充的样式,可以是实心、水平线、垂直线、交叉线、空心等等
            new SimpleLineSymbol(
                SimpleLineSymbol.STYLE_SOLID,//设定外层line样式，可以是虚线，实线、交叉线等等
                Color(borderColor),//设定line颜色
                2,// 设定line粗细
            ),
            new Color(fillColor),//设定填充颜色
        );
        // 也可以使用其他symbol来得到不同的效果
        // symbol = new PictureFillSymbol(require("@/assets/location.png"), new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 255]), 2), 20, 20)
        let graphic = new Graphic(evt.geometry,symbol);//创建一个图形，将symbol效果应用到图形上
        map.graphics.add(graphic);//map对象自带一个graphicLayer图形图层
    })
}

// 使用位置信息画面
// 需要参数：地图对象、位置信息、边框颜色、填充颜色
const drawPolygonByPointsApi = async (map,points,borderColor,fillColor) => {
    const _this = this;
    const [Graphic, SimpleLineSymbol, SimpleFillSymbol, Draw, Color, SpatialReference, Polygon, Point] = await esriLoader.loadModules([
        "esri/graphic",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/toolbars/draw",
        "esri/Color",
        "esri/SpatialReference",
        "esri/geometry/Polygon",
        "esri/geometry/Point"
    ]);//加载arcgis组件


    // 如果颜色不传，就给默认值
    if(borderColor === undefined){
        borderColor = BORDERCOLOR;
    };
    if(fillColor === undefined){
        fillColor = [0,0,0,0.3];
    };
    // 创建多边形对象
    const polygon = new Polygon(new SpatialReference({
        wkid:4490
    }));
    console.log(points);
    polygon.addRing(points);
    // 创建显示形状
    let symbol = new SimpleFillSymbol(
        SimpleFillSymbol.STYLE_SOLID,//设定填充样式，可以是实心、水平线、垂直线、交叉线等等
        new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,// 设定外层line样式，可以是虚线，点，实线等等
            Color(borderColor),// 设定line的颜色
            2,// 设定line的粗细
        ),
        new Color(fillColor),// 设定填充颜色
    );
    console.log(symbol);
    let graphic = new Graphic(polygon,symbol);//创建图形

    map.graphics.add(graphic);//map对象自带一个图形图层graphicLayer，就是map.graphics
	// map.setExtent(graphic.geometry.getExtent().expand(1.5));//定位到地理位置
    return graphic;//将图层返回，方便定位
}

export {
    drawPolygonByToolbarApi,
    drawPolygonByPointsApi,
}
