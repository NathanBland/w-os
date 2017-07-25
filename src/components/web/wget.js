const lf = require('localforage')
export default function (args) {
  console.log('args,', args)
  lf.setItem('file.', args)
  .then((myFile) => {
    // Do other things once the value has been saved.
    return myFile
  }).catch((err) => {
    // This code runs if there were any errors
    throw err
  })
}
