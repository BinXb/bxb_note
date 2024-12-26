// 画线
// 导入arcgis依赖
import * as esriLoader from 'esri-loader';
// 导入全局边框线条
import { BORDERCOLOR } from '@/config/map';

// 使用工具栏画线(在地图上点击画线)
// 需要参数：地图对象、工具类型、线条颜色
const drawLineApi = async (map,type,lineColor) => {
  const _this = this;
  // 加载arcgis所需要的组件
  const [Graphic,SimpleLineSymbol,Draw,Color] = await esriLoader.loadModules([
    "esri/graphic",
    "esri/symbols/SimpleLineSymbol",
    "esri/toolbars/draw",
    "esri/Color"
  ]);
  // 如果颜色不传，就给个默认值
  if(lineColor === undefined){
    lineColor = BORDERCOLOR;
  }
  // 绑定工具栏到map上
  let toolbar = new Draw(map);
  // 激活工具栏,LINE和POLYLINE和FREEHAND_POLYLINE是线
  toolbar.activate(Draw[type]);
  // 画线
  toolbar.on("draw-complete",evt => {
    toolbar.deactivate();//失效后，绘画停止
    // 设置线条样式
    let symbol = new SimpleLineSymbol(
      SimpleLineSymbol.STYLE_SOLID,//设定外层line样式，可以是虚线，实线，点...
      Color(lineColor),// 设定line颜色
      3,// 设定line粗细
    );
    let graphic = new Graphic(evt.geometry,symbol);// 创建graphic
    map.graphics.add(graphic);//map对象自带一个图形图层，可以在上面添加形状(graphic)
  })
}

export {
  drawLineApi
}