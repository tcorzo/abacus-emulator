import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ConfirmationService from 'primevue/confirmationservice';
import Lara from "@primevue/themes/lara";
import App from "./App.vue";

import "./assets/style.css";
import 'primeicons/primeicons.css'

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Lara,
        darkModeSelector: 'system',
    },
});
app.use(ConfirmationService);


app.mount("#app");
