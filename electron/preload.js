// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer, shell } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  query: (url) => ipcRenderer.invoke('query', url),
  download: () =>
    ipcRenderer.invoke('download', {
      downloadPath: 'https://unpkg.com/vue@3.0.7/dist/vue.global.js', // 下载链接（以下载vue文件为例）
      fileName: 'vue.global.js', // 下载文件名，需要包含后缀名
    }),
})
