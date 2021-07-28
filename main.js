const { ipcMain, app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));

    // 開発ツールを有効化
    // mainWindow.webContents.openDevTools();

    // メニューを無効化
    // Menu.setApplicationMenu(null);

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// ファイル読み込み関数
ipcMain.handle("fileLoader", (_data) => {
    const paths = dialog.showOpenDialogSync(mainWindow, {
        buttonLabel: "ファイルを開く",
        filters: [
            { name: "Text", extensions: ["txt", "text", "json"] } // あとでjson消す
        ],
        properties: [
            "openFile",
            "createDirectory"
        ]
    });
    if (paths === undefined) {
        return ({ status: undefined })
    }
    try {
        const path = paths[0];
        const buffer = fs.readFileSync(path, "utf8");

        return ({
            status: true,
            path: path,
            text: buffer.toString()
        });
    } catch (error) {
        return ({
            status: false,
            message: error.message
        });
    }
});
