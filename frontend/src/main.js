import { createApp } from 'vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';

const app = createApp(App);
app.use(BootstrapVue);
app.use(IconsPlugin);

app.mount('#app');
