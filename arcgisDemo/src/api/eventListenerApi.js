// arcgis事件监听
import * as esriLoader from "esri-loader";

const eventListenerApi = async (map) => {
  map.on("click",CLICK_HANDLER);
  function CLICK_HANDLER(evt) {
    map.centerAndZoom(evt.geometry,15);
    map.centerAt(evt.mapPoint);
  }
}
export {
  eventListenerApi,
}




