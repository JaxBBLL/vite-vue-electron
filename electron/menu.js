const { Menu, BrowserWindow } = require('electron')

let template = [
  {
    label: '消息',
    submenu: [
      {
        label: '漫游会话列表',
        click: () => {
          var win = new BrowserWindow({
            width: 300,
            height: 300,
          })
          win.loadFile('demo2.html')
          win.on('close', () => {
            win = null
          })
        },
      },
    ],
  },
  {
    label: '空间',
    submenu: [{ role: 'copy' }, { role: 'paste' }],
  },
]
var menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
