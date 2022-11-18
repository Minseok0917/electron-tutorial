import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const myPlugin = () => ({
    name: "configure-server",
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            // custom handle request...
            console.log(req, 1);
        });
    },
});

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [vue(), myPlugin()],
});
