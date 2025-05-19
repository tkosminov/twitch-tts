import { createApp } from 'vue';

import App from './App.vue';
import { i18n, vuetify, store } from './providers';

export const app = createApp(App);

app.use(i18n);
app.use(vuetify);
app.use(store);
