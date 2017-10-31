const fs = require('fs')
let count = 0
let paidContracts = []
// course contracts
const courseContractArr = fs.readFileSync('coursedata.json', 'utf-8')
  .split(/\r?\n/)
courseContractArr.pop()

// course & price
const priceStr = fs.readFileSync('hqindex.json', 'utf-8')
console.log(JSON.parse(priceStr).published.length)
const priceArr = JSON.parse(priceStr).published

courseContractArr.forEach(
  contract => {
    let contractObj = JSON.parse(contract)
    let {courseId, total} = contractObj
    total = 0
    // courseId.forEach(
    Array.prototype.forEach.call(courseId,
      course => {
        for (let {price, link} of priceArr) {
          if (link.slice(1) === course) {
            total += parseInt(price)
          }
        }
      }
    )
    ++count
    contractObj.total = total
    paidContracts.push(contractObj)
  }
)
console.log(count) // 272
console.log(paidContracts.length)

let finalStr = paidContracts.map(
  item => JSON.stringify(item)
).join('\n')

fs.writeFile('paidCoursesContract.json', finalStr, (err) => {
  if (err) throw err
  console.log('The file has been restructured!')
})
