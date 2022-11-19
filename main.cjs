const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });

    win.loadFile(`./.minseok0917/vue/index.html`);
};
app.whenReady().then(() => {
    createWindow();
});

require("electron-reload")("./.minseok0917/vue/", {
    electron: require(`${__dirname}/node_modules/electron`),
});
