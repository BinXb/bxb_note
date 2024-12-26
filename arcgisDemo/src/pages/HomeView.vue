<template>
  <div class="HomeView">
    <el-container>
      <el-aside width="300px">
        <el-menu
          default-active="2"
          class="left-menu-aside"
          @open="handleOpen"
          @close="handleClose"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/createMap">
            <i class="el-icon-menu"></i>
            <span slot="title">创建地图</span>
          </el-menu-item>
          <el-menu-item index="/CreateTileLayer">
            <i class="el-icon-menu"></i>
            <span slot="title">创建静态图层（切片）</span>
          </el-menu-item>
          <el-menu-item index="/CreateDynamicLayer">
            <i class="el-icon-document"></i>
            <span slot="title">创建动态图层（矢量）</span>
          </el-menu-item>
          <el-menu-item index="/DrawPoint">
            <i class="el-icon-setting"></i>
            <span slot="title">画点</span>
          </el-menu-item>
          <el-menu-item index="/DrawLine">
            <i class="el-icon-setting"></i>
            <span slot="title">画线</span>
          </el-menu-item>
          <el-menu-item index="/DrawPolygon">
            <i class="el-icon-setting"></i>
            <span slot="title">画面</span>
          </el-menu-item>
          <el-menu-item index="/MeasureDistance">
            <i class="el-icon-setting"></i>
            <span slot="title">测距</span>
          </el-menu-item>
          <el-menu-item index="/MeasureArea">
            <i class="el-icon-setting"></i>
            <span slot="title">测面</span>
          </el-menu-item>
          <el-menu-item index="/CreateLegend">
            <i class="el-icon-setting"></i>
            <span slot="title">创建图例</span>
          </el-menu-item>
          <el-menu-item index="/UseQuery">
            <i class="el-icon-setting"></i>
            <span slot="title">query查询</span>
          </el-menu-item>
          <el-menu-item index="/UseIdentify">
            <i class="el-icon-setting"></i>
            <span slot="title">identify查询</span>
          </el-menu-item>
          <el-menu-item index="/UseFind">
            <i class="el-icon-setting"></i>
            <span slot="title">find查询</span>
          </el-menu-item>
          <el-menu-item index="/FullScreen">
            <i class="el-icon-setting"></i>
            <span slot="title">全图</span>
          </el-menu-item>
          <el-menu-item index="/SliceScreen">
            <i class="el-icon-setting"></i>
            <span slot="title">分屏</span>
          </el-menu-item>
          <el-menu-item index="/GisLocation">
            <i class="el-icon-setting"></i>
            <span slot="title">定位</span>
          </el-menu-item>
          <el-menu-item index="/EventListener">
            <i class="el-icon-setting"></i>
            <span slot="title">事件监听</span>
          </el-menu-item>
          <el-menu-item index="/JudgeUrl">
            <i class="el-icon-setting"></i>
            <span slot="title">判断切片还是矢量</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="right-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.HomeView {
  .el-aside{
    height: 100vh;
    background-color: rgb(84, 92, 100);
  }
  .left-menu-aside{
    
  }
  .right-main{
    height: 100vh;
    padding: 0 !important;
  }
}
</style>
