const lf = require('localforage')
export default function (args) {
  console.log('args,', args)
  lf.setItem('user', args)
  .then((user) => {
    // Do other things once the value has been saved.
    resolve(user)
  }).catch((err) => {
    // This code runs if there were any errors
    reject(err)
  })
}
