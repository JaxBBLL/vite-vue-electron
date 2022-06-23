const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const axios = require('axios')
const setCookie = require('./cookie')

const isDev = process.env.IS_DEV == 'true' ? true : false

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      // contextIsolation: true,
    },
  })

  // and load the index.html of the app.
  // win.loadFile("index.html");

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`,
  )
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.setMenu(null)
  }
  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  setCookie()
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('request', async (event, args) => {
  const result = await axios.get(args).then((res) => {
    console.log(res.data)
    var arr = analysis(res.data).map((item) => {
      if (item.startsWith('/') && item[1] !== '/') {
        return args + item
      } else {
        return item
      }
    })
    return arr
  })
  return result
})

function analysis(str) {
  const reg = /<img[\s\S]+?src="([\S]+?)"[\s\S]+?>/gi
  let arr = []
  let res
  while ((res = reg.exec(str))) {
    arr.push(res[1])
  }
  return arr
}
