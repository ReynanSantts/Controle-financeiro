import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        {
            name: "pagina-inicial",
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url === "/") {
                        req.url = "/src/views/TelaLogin/login.html";
                    }

                    next();
                });
            }
        }
    ]
});