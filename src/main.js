import { createApp } from 'vue';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';

import { LMap,LTileLayer,LMarker,LIcon,LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

const app = createApp(App);
app.component("l-map", LMap);
app.component("l-tile-layer",LTileLayer);
app.component("l-marker",LMarker);
app.component("l-icon",LIcon);
app.component("l-popup",LPopup);
// 
app.use(VueAxios,axios);
app.use(router);
app.mount('#app');