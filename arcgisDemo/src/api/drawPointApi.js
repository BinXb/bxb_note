// 画点
import * as esriLoader from "esri-loader";//加载arcgis依赖
import { EPSG,BORDERCOLOR,FILLCOLOR } from "@/config/map";

// 根据坐标画点，因为大小是像素，所以缩放地图，点的显示大不会变化
// 需要参数：x,y坐标，边框颜色，填充颜色
const drawPointByLocationApi = async (x,y,borderColor,fillColor)=>{
    const _this = this;
    const [Point,SpatialReference,Graphic,SimpleMarkerSymbol,SimpleLineSymbol,Color] = await esriLoader.loadModules([
        "esri/geometry/Point",
        "esri/SpatialReference",
        "esri/graphic",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/Color",
    ]);//加载所需的arcgis组件

    // 如果颜色不传，就给个默认值
    if(borderColor === undefined){
        borderColor = BORDERCOLOR;//边框颜色
    }
    if(fillColor === undefined){
        fillColor = FILLCOLOR;//填充颜色
    }

    let point = new Point(x,y,new SpatialReference({wkid:EPSG}));//创建点，传入坐标和坐标系
    let symbol = new SimpleMarkerSymbol(
        SimpleMarkerSymbol.STYLE_COLOR,//设定填充的样式,正方形、圆形、三角形等等
        20,// 设定点半径的大小(单位是像素)，默认12
        new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_COLOR,//设定外层line的样式
            Color(borderColor),//设定line的颜色
            2,//设定line的粗细
        ),
        new Color(fillColor)//设定填充的颜色
    );
    let graphic = new Graphic(point,symbol);//创建graphic

    return graphic;
}

// 根据坐标画点(使用图片，最常用)
// 需要参数:x,y坐标、图片地址
const drawPicPointByLocationApi = async (x,y,url) => {
    const _this = this;
    const [Point,SpatialReference,Graphic,PictureMarkerSymbol] = await esriLoader.loadModules([
        "esri/geometry/Point",
        "esri/SpatialReference",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol",
    ]);//加载所需的arcgis组件
    
    let point = new Point(x,y,new SpatialReference({wkid:EPSG}));//创建点，传入坐标和坐标系
    let symbol;
    if(url === undefined){
        // 如果不传图片，就给个默认值
        symbol = new PictureMarkerSymbol(require('@/assets/location.png'),20,30);//默认图片和尺寸

    }else{
        symbol = new PictureMarkerSymbol(require('@/assets/'+url),30,30);// 传入图片和大小
    }
    let graphic = new Graphic(point,symbol)
    return graphic;
}

// 使用工具栏画点（点击画点）
// 需要参数：地图对象、工具类型、图片地址
const drawPointByToolbarApi = async (map,type,url) => {
    const _this = this;
    const [Graphic,PictureMarkerSymbol,Draw] = await esriLoader.loadModules([
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol",
        "esri/toolbars/draw"
    ]);//加载所需的arcgis组件
    let toolbar = new Draw(map);//创建工具栏,绑定到map上
    toolbar.activate(Draw[type]);// 激活特定工具,POINT和MULTI_POINT是点
    toolbar.on("draw-complete",evt => {
        toolbar.deactivate();//失效后，绘画就停止了
        let symbol;
        if(url === undefined){
            // 如果图片不传，就给默认值
            symbol = new PictureMarkerSymbol(require('@/assets/location.png'),30,30);// 默认图片和尺寸

        }else{
            symbol = new PictureMarkerSymbol(require('@/assets/'+url),20,30);// 传入图片和尺寸
        }
        let graphic = new Graphic(evt.geometry,symbol);// 创建graphic
        map.graphics.add(graphic);//map对象自带一个graphicsLayer,就是map.graphics,所以也可以往这个上面添加graphic
    })
}

export {
    drawPointByLocationApi,
    drawPicPointByLocationApi,
    drawPointByToolbarApi,
}
