// identify查询
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 使用identify查询，根据空间查询
// 需要参数：地图对象、地图服务对象的url
const useIdentifyApi = async (map, url) => {
  const _this = this;
  const [Draw, SimpleFillSymbol, SimpleLineSymbol, Color, Graphic, IdentifyTask, IdentifyParameters] = await esriLoader.loadModules([
    "esri/toolbars/draw",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/graphic",
    "esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters"
  ]);//加载所需的arcgis组件
  // 使用promise将值传出去
  function func() {
    return new Promise((resolve, reject) => {
      let toolbar = new Draw(map);//创建工具栏并绑定到map上
      toolbar.activate(Draw['RECTANGLE']);//激活特定工具RECTANGLE是矩形
      toolbar.on("draw-complete", async evt => {
        toolbar.deactivate();//失效后绘画停止
        let symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID,//设置填充样式，可以是实心，水平线，垂直线，交叉线，空心等
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,//设置外层line样式
            Color([0, 0, 255]),//设置line颜色
            2//设置line粗细
          ),
          new Color([205, 209, 211, 0.5])//设置填充颜色
        );
        let graphic = new Graphic(evt.geometry, symbol);//创建形状
        map.graphics.add(graphic);//将形状添加到map.graphics上
        let identifyTask = new IdentifyTask(url);//创建IdentifyTask对象，传入地图服务
        let identifyParams = new IdentifyParameters();//创建IdentifyParamters对象,下面设置条件
        identifyParams.returnGeometry = true;//设置是否返回几何信息
        identifyParams.layerIds = [0];//设置要查询的图层Id
        identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;//设置查询的地图选项
        identifyParams.tolerance = 3;//设置荣差值，标识允许误差范围，默认0，如果想多查一点，可以设置3,5等
        identifyParams.width = map.width;//传递地图宽度
        identifyParams.height = map.height;//传递地图高度
        identifyParams.mapExtent = map.extent;//传递地图范围
        identifyParams.geometry = evt.geometry;//具体位置
        identifyTask.execute(identifyParams, result => {
          return resolve(result);//直接传到最外面
        });
      });
    });
  }
  let res = await func();
  return res;
}
export {
  useIdentifyApi,
}
