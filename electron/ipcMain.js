const { ipcMain } = require('electron')
const axios = require('axios')

ipcMain.handle('query', async (event, args) => {
  const url = new URL(args)
  const result = await axios
    .get(args, {
      headers: {
        referer: '',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44',
      },
    })
    .then((res) => {
      console.log(res.data)
      var arr = analysis(res.data).map((item) => {
        if (item.startsWith('/') && item[1] !== '/') {
          return url.origin + item
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
