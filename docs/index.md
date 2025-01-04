---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "bxb"
  text: "宾小宾学习参考文档"
  tagline: 疯狂编码中。。。
  actions:
    - theme: brand
      text: vitepress基础
      link: /markdown-examples
    - theme: alt
      text: ArcGis
      link: /ArcGisViews/arcgisforjsApi
    - theme: alt
      text: MapBox
      link: /mapboxApi
    - theme: alt
      text: Czsm
      link: /CesiumApis/initEarthApi


features:
  - title: ArcGis for javascript
    details: vue中使用arcgis技术
  - title: mapbox
    details: vue中使用mapbox技术
  - title: Czsm
    details: 三维地理地图技术
---

[ztree](https://www.jeesite.com/front/jquery-ztree/3.5/demo/cn/index.html)

[mapbox缩放说明](https://docs.mapbox.com/help/glossary/zoom-level/#zoom-levels-and-geographical-distance)

[C++官方手册](https://zh.cppreference.com/w/%E9%A6%96%E9%A1%B5)

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>

