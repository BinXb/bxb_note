<!-- 加载地球 -->

# 创建地球

## 初始化地球 - init

init()

```js
Czsm3d.init();
```

## 加载地球 - createEarth

createEarth(id,config,type)

> id
>
> > 说明：加载地球的容器 Id
> >
> config
> > 类型：Object
> >
> > 说明：地球配置项
> >
> type
> > 说明：三维/二维 -（"all"/"2D")

示例：

```vue
<template>
  <div class="container">
    <!-- 地球容器 -->
    <div class="mapWrapper" id="mapWrapper"></div>
  </div>
</template>
<script>
export default {
  name: "container",
  data() {
    return {};
  },
  methods: {
    async initMap() {
      let config = {
        viewer: {
          div: "cesiumContainer",
          options: {
            sceneModePicker: false,
          },
        },
        homeView: {
          x: 119.604989,
          y: 31.73056,
          z: 12769.5,
          heading: 351.1,
          pitch: -89.2,
          roll: 0,
        },
      };
      // 创建地球
      globalEarth = Czsm3d.basic.createEarth('mapWrapper',config,"all");
    },
  },
  create() {
    this.initMap();
  },
};
</script>
```
