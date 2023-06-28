const { app, BrowserWindow } = require('electron')

let mainWindow
let splashWindow
let splashWindowClosed = false

function createWindow () {
  splashWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: false,
    frame: false,
    alwaysOnTop: true,
  })
  splashWindow.loadFile('splash.html')

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false
  })

  mainWindow.loadURL('https://chat.mashaojie.cn')

  mainWindow.webContents.on('did-finish-load', () => {
    if (!splashWindowClosed) {
      splashWindow.close()
      splashWindowClosed = true
      mainWindow.show()
    }
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})