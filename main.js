const { app, BrowserWindow } = require('electron')

function createWindow () {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载网站
  win.loadURL('https://chat.mashaojie.cn')
}

// 当Electron完成初始化并准备好创建浏览器窗口时调用此方法。
app.whenReady().then(() => {
  createWindow()
})
