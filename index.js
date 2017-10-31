const fs = require('fs')
let intermediaArr = []

// 用户数据
let userData = fs.readFileSync('hqusers.json', 'utf-8')
  .split(/\r?\n/)
userData.pop()

userData.forEach(
    item => {
      ({ _id, username, admin, emails, services: {password: {bcrypt}}, createdAt: {$date} } = JSON.parse(item))
      let tempObj = {}
      tempObj._id = _id
      tempObj.username = username
      tempObj.password = bcrypt
      tempObj.admin = admin ? admin : false
      tempObj.wechatId = null
      tempObj.mails = emails
      tempObj.contracts = []
      tempObj.createdAt = $date
      intermediaArr.push(tempObj)
    }
  )

// Users Colletcion without contracts
console.log(intermediaArr.length);


// VIP数据
let vipData = fs.readFileSync('vipdata.json', 'utf-8')
  .split(/\r?\n/)
vipData.pop()

// 课程数据
let courseData = fs.readFileSync('coursedata.json', 'utf-8')
  .split(/\r?\n/)
courseData.pop()

let vipNum = 0
let courseNum = 0
intermediaArr.forEach(
  user => {
    for (let vip of vipData) {
      ({userId, _id} = JSON.parse(vip))
      if (user._id === userId) {
        user.contracts.push(_id)
        ++vipNum
      }
    }

    for (course of courseData) {
      ({userId, _id} = JSON.parse(course))
      if (user._id === userId) {
        user.contracts.push(_id)
        ++courseNum
      }
    }
  }
)

console.log(vipNum)
console.log(courseNum)

let finalStr = intermediaArr.map(
  item => JSON.stringify(item)
).join('\n')

fs.writeFile('user.js', finalStr, (err) => {
  if (err) throw err
  console.log('The file has been restructured!')
})
// mongoimport -d test -c testcollection --file temp.js
