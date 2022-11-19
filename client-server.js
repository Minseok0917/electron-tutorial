import { exec } from "child_process";
import { resolve } from "path";
import { createServer, build as _buildVite } from "vite";
import chokidar from "chokidar";
import vue from "@vitejs/plugin-vue";
import fsExtra from "fs-extra";

const cwd = process.cwd();

async function runApp() {
    await buildVite();
    await runVite();
    runElectron();

    watch("vue", buildVite);
}

async function buildVite() {
    fsExtra.emptyDirSync("./.minseok0917/vue/assets");
    return await _buildVite({
        configFile: false,
        root: cwd + "/vue",
        base: "./",
        build: {
            outDir: resolve(cwd, ".minseok0917/vue"),
        },
        plugins: [vue()],
    });
}
async function runVite() {
    const server = await createServer({
        configFile: false,
        root: cwd + "/vue",
        plugins: [vue()],
    });
    await server.listen();
    server.printUrls();
    return server;
}
function runElectron() {
    const command = `npx electron .`;
    const electron = exec(command);

    return electron;
}
function watch(path, callback) {
    path = `${cwd}/${path}`;
    const watcher = chokidar.watch(path);
    watcher.on("change", callback);
}

runApp();
