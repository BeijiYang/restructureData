const fs = require('fs')
let intermediaArr = []

try {
  let data = fs.readFileSync('data.js', 'utf-8')
    .split(/\r?\n/)
    .map(
      item => {
        let jsonifyItem = JSON.parse(item)
        let tempObj = {}
        tempObj._id = jsonifyItem._id
        tempObj.username = jsonifyItem.username
        tempObj.password = jsonifyItem.services.password.bcrypt
        tempObj.paidCourses = jsonifyItem.paidCourses
        tempObj.createdAt = jsonifyItem.createdAt.$date
        intermediaArr.push(tempObj)
      }
    )
} catch (err) {
    // console.log(err);
}

let finalStr = intermediaArr.map(
  item => JSON.stringify(item)
).join('\n')

fs.writeFile('temp.js', finalStr, (err) => {
  if (err) throw err
  console.log('The file has been restructured!')
})
