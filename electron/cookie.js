const { session } = require('electron')

const cookie = {
  url: 'http://www.github.com',
  name: 'dummy_name',
  value: 'dummy',
}

module.exports = () => {
  session.defaultSession.cookies.set(cookie).then(
    (res) => {
      console.log(res)
    },
    (error) => {
      console.error(error)
    },
  )
}
