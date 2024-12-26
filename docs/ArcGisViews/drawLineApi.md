# 画线

::: tip 提醒
与画点类似，画线也是通过利用工具栏Draw和map自带的graphics图形进行绘制。
:::

## 开始

### 1.准备地图

`与最开始一样`

> 创建地图
>
> 叠加图层

::: code-group

~~~vue [DrawLine.vue]
<!-- 准备 -->
<templete>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
  </div>
</templete>
<script>
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 导入所需要的css、js、url资源
import { esriCss,esriJs,czdzUrl } from '@/config/map';
esriLoader.loadCss(esriCss);
esriLoader.loadScript({url:esriJs});
// 创建地图
import createMapApi from '@/api/createMapApi';
// 创建静态图层
import createTileLayerApi from '@/api/createTileLayerApi'
export default{
  data(){
    return {
      map:"",// 地图对象
      layer1:"",// 静态图层
    }
  },
  mounted(){
    // 创建地图
    async createMap(){
      const _this = this;
      if(_this.map === ""){
        // 如果地图不存在，则创建地图
        _this.map = await createMapApi(_this.$refs.map);
        // 添加静态图层
        _this.layer1 = await createTileLayerApi(czdzUrl);
        // 叠图
        _this.map.addLayer(_this.layer1);
      }
    },
  },
  methods:{
    this.createMap();
  }
}
</script>
<style></style>
~~~

~~~js [画线drawLineApi.js]
// 导入arcgis依赖
import * as esriLoader from "esri-loader";
// 导入全局边框线条
import {BORDERCOLOR} from "@/config/map";

// 使用工具栏画线
// 需要参数：地图对象、工具类型、线条颜色

const drawLineApi = async (map,type,lineColor) => {
  const _this = this;
  // 加载arcgis所需的组件
  const [Graphic,SimpleLineSymbol,Draw,Color] = await esriLoader([
    "esri/graphic",
    "esri/symbols/SimpleLineSymbol",
    "esri/toolbars/draw",
    "esri/Color"
  ]);
  // 如果不传颜色，就给默认值
  if(lineColor === undefined){
    lineColor = BORDERCOLOR;
  };
  // 绑定工具栏到map上
  let toolbar = new Draw(map);
  // 激活工具栏,type值：LINE和POLYLINE和FREEHAND_POLYLINE
  toolbar.activate(Draw[type]);
  // 画线
  toolbar.on("draw-complete",evt => {
    toolbar.deactive();//失效后，绘画停止
    // 设置线条样式
    let symbol = new SimpleLineSymbol(
      SimpleLineSymol.STYLE_SOLID,//设置外层line样式，可以是虚线
      Color(lineColor),// 设置线条颜色
      3,// 设置线条粗细
    );
    let graphic = new Graphic(evt.geometry,symbol);//创建图形图层(graphic)
    map.graphics.add(graphic);//map对象自带一个图形图层,可以在上面画图
  });
}
// 导出画线方法
export {
  drawLineApi,
}
~~~

~~~vue [画线用法：DrawLine.vue]

<templete>
  <div class="container">
    <div class="map" id="map" ref="map"></div>
    <div class="toolBar">
      <el-button @click="drawLine1">单线段</elbutton>
      <el-button @click="drawLine2">多线段</elbutton>
      <el-button @click="drawLine3">随意线段</elbutton>
      <el-button @click="clear">清除</elbutton>
    </div>
  </div>
</templete>
<script>
  export default {
    methods:{
      // 使用工具栏画单线段type:LINE
      drawLine1(){
        const _this = this;
        drawLineApi(_this.map,'LINE',[255,0,0]);
      },
      // 使用工具栏画多线段,type:POLYLINE
      drawLine2(){
        const _this = this;
        drawLineApi(_this.map,'POLYLINE',[255,0,0]);
      },
      // 使用工具栏画随意线段,type:FREEHAND_POLYLINE
      drawLine3(){
        const _this = this;
        drawLineApi(_this.map,'FREEHAND_POLYLINE')
      },
      // 清除
      clear(){
        this.map.graphics.clear();
      }
    }
  }
</script>
~~~
:::

## 组件和方法

::: tip 画线也出现了新的组件和方法
利用这些方法和参数，我们可以实现随意画线
:::

### 组件

> Graphic
> ~~~js
> // 图形graphic，通过将方法挂载到图形(graphic)上,我们便可以将图形画在图形图层上，实现绘画
> // 用法：
> graphic = new Graphic(evt.geometry,symbol);
> ~~~
> SimpleLineSymbol
> ~~~js
> // 设置线条显示SimpleLineSymbol
> // 用法：SimpleLineSymbol(线条样式,线条颜色,线条粗细)
> let symbol = new SimpleLineSymbol()
> ~~~ 
> > 线条样式：
> > 
> > 实线:SimpleLineSymbol.STYLE_SOLID
> > 
> > 虚线:SimpleLineSymbol.STYLE_DASHED
> > 
> > 线条颜色：
> > 
> > Color(颜色值)
> > 
> > 线条粗细
> > 
> > 3 - number
> 
> Draw
> > ~~~js 
> > //绘画工具栏,将工具栏绑定到map上
> > // 用法：
> > let toolbar = new Draw(map)
> > ~~~
> > toolbar：方法
> > 
> > toolbar.activate(Draw[type]); - 激活工具栏
> > 
> > toolbar.on("draw-complete",evt =>{}); - 画线
> > 
> > toolbar.deactivate(); - 绘画停止
> Color
> >
> > 设置颜色 Color(颜色值)
