import { createApp } from 'vue';
import mitt from 'mitt';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from './router';
import store from './store';

const emitter = mitt();

const app = createApp(App).use(store);
app.config.globalProperties.$emitter = emitter;
app.use(router);
app.mount('#app');
