// const { app, BrowserWindow } = require('electron')

// function createWindow () {
//   // 创建浏览器窗口
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true
//     }
//   })

//   // 加载网站
//   win.loadURL('https://chat.mashaojie.cn')
// }

// // 当Electron完成初始化并准备好创建浏览器窗口时调用此方法。
// app.whenReady().then(() => {
//   createWindow()
// })


const { app, BrowserWindow } = require('electron')

let mainWindow
let splashWindow

function createWindow () {
  // 创建启动页窗口
  splashWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: false,
    frame: false,
    alwaysOnTop: true,
  })
  splashWindow.loadFile('splash.html')

  // 创建主窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false // 首先隐藏主窗口
  })

  mainWindow.loadURL('https://chat.mashaojie.cn')

  // 当主窗口加载完成后，关闭启动页窗口并显示主窗口
  mainWindow.webContents.on('did-finish-load', () => {
    splashWindow.close()
    mainWindow.show()
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
