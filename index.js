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
          // console.log(tempObj);
          intermediaArr.push(tempObj)
        }
      )
} catch (err) {
    // console.log(err);
}

// console.log(intermediaArr);
// let intermediaStr = JSON.stringify(intermediaArr)
// let finalStr = intermediaArr.join('\n')
let finalStr = intermediaArr.map(item => JSON.stringify(item)).join('\n')

// console.log(finalStr);

fs.writeFile('temp.js', finalStr, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
})
