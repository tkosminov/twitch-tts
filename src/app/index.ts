import { createApp } from 'vue';

import App from './App.vue';
import { i18n, vuetify } from './providers';

export const app = createApp(App);

app.use(i18n);
app.use(vuetify);
