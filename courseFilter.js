const fs = require('fs')
let intermediaCourseArr = []

let data = fs.readFileSync('hqusers.json', 'utf-8')
  .split(/\r?\n/)

data.pop()
let courses = data.filter(
  item => {
    let jsonifyItem = JSON.parse(item)
    return (jsonifyItem.paidCourses && jsonifyItem.paidCourses.length !== 0)
  }
)

courses.forEach(
  item => {
    let jsonifyItem = JSON.parse(item)
    let tempObj = {}
    tempObj.type = 'courses'
    tempObj.startDate = '2018-01-01'
    tempObj.expireDate = '2019-01-01'
    tempObj.total = ''
    tempObj.userId = jsonifyItem._id
    tempObj.courseId = jsonifyItem.paidCourses
    intermediaCourseArr.push(tempObj)
  }
)

console.log(intermediaCourseArr.length)

let finalStr = intermediaCourseArr.map(
  item => JSON.stringify(item)
).join('\n')

fs.writeFile('course.js', finalStr, (err) => {
  if (err) throw err
  console.log('The file has been restructured!')
})
// console.log(date.toLocaleDateString());
// mongoimport -d hqdata -c course --file course.js
// mongoexport -d hqdata -c course -o ./coursedata.json
