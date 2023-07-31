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

  if (!mainWindow.isDestroyed()) {
    mainWindow.loadURL('https://chat.mashaojie.cn')
  }

  mainWindow.webContents.on('did-finish-load', () => {
    if (!splashWindow.isDestroyed() && !splashWindowClosed) {
      splashWindow.close()
      splashWindowClosed = true
      if (!mainWindow.isDestroyed()) {
        mainWindow.show()
      }
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