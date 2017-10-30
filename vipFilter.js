const fs = require('fs')
let intermediaVipArr = []

let data = fs.readFileSync('hqusers.json', 'utf-8')
  .split(/\r?\n/)

data.pop()
let vip = data.filter(
  item => {
    let jsonifyItem = JSON.parse(item)
    return jsonifyItem.admin
  }
)

vip.forEach(
  item => {
    let jsonifyItem = JSON.parse(item)
    if (jsonifyItem.username === 'happypeter') {
      return
    }
    let tempObj = {}
    tempObj.type = 'vip'
    tempObj.startDate = '2017-10-01'
    tempObj.expireDate = '2018-10-01'
    tempObj.total = ''
    tempObj.userId = jsonifyItem._id
    intermediaVipArr.push(tempObj)
  }
)

console.log(intermediaVipArr.length)

let finalStr = intermediaVipArr.map(
  item => JSON.stringify(item)
).join('\n')

fs.writeFile('vip.js', finalStr, (err) => {
  if (err) throw err
  console.log('The file has been restructured!')
})
// console.log(date.toLocaleDateString());
// mongoimport -d hqdata -c vip --file vip.js
// mongoexport -d hqdata -c vip -o ./vipdata.json
