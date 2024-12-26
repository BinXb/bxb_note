// query查询
// 加载arcgis依赖
import * as esriLoader from "esri-loader";

// query查询 - 单点
// 需要参数：地图对象、地图服务的url、坐标信息
const useQueryApiByPointApi = async (map,url,geometry) => {
  const _this = this;
  const [Query,QueryTask] = await esriLoader.loadModules([
    "esri/tasks/query",
    "esri/tasks/QueryTask"
  ]);//加载所需的组件
  let queryTask = new QueryTask(url); // 传入图层
  let query = new Query(); // 初始化query对象
  query.returnGeometry = true;//使结果返回geometry信息
  query.outFields = ["*"];// 需要得到哪些属性，*就是全部，一般拿全部
  // query.outFields = ['FID','XZQMC'];//也可以拿部分
  query.geometry = geometry;//设置查询位置信息
  let info = await queryTask.execute(query,(result)=>{
    console.log(result);
    // return result; // 将默认值传出
  });
  return info
}

// query查询 - 框选查询
// 需要参数：地图对象、地图服务对象的url
const useQueryByAreaApi = async (map,url) => {
  const _this = this;
  const [Draw,SimpleFillSymbol,SimpleLineSymbol,Color,Graphic,Query,QueryTask] = await esriLoader.loadModules([
    "esri/toolbars/draw",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/graphic",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
  ]);//加载arcgis所需组件

  // 使用promise将值传出去
  function func(){
    return new Promise((resolve,reject)=>{
      let toolbar = new Draw(map);//创建工具栏，绑定到map上
      toolbar.activate(Draw['RECTANGLE']);//激活特定工具 - 这里是矩形
      toolbar.on("draw-complete",async evt => {
        toolbar.deactivate();//失效后绘画停止
        let symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID,//设置填充样式
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,//设置外层线条样式
            Color([0,0,255]),//设置线条颜色
            2//设置线条粗细
          ),
          new Color([205,209,211,0.5]),//设置填充颜色
        );
        let graphic = new Graphic(evt.geometry,symbol);//创建形状
        map.graphics.add(graphic);// 将形状添加到map上
        let queryTask = new QueryTask(url);//传入图层
        let query = new Query();//初始化query对象
        query.returnGeometry = true;//使结果返回geometry信息
        query.outFields = ['*'];// 需要返回哪些属性，这里*指全部
        query.geometry = evt.geometry;//设置查询的位置信息
        // query.where = "FID > 1";//设置查询条件，FID为0是天宁，FID为1是钟楼
        queryTask.execute(query,(result) => {
          return resolve(result);//直接传到最外面
        })
      })
    })
  }
  let data = await func();
  return data;

}

export {
  useQueryApiByPointApi,
  useQueryByAreaApi,
}
