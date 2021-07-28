const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("textApi", {
    loadFile: async (_data) => {
        const result = await ipcRenderer.invoke("fileLoader", _data);
        return result;
    }
});
