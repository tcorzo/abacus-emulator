import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Lara from "@primevue/themes/lara";
import App from "./App.vue";

import "./assets/style.css";

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Lara,
        darkModeSelector: 'system',
    },
});


app.mount("#app");
