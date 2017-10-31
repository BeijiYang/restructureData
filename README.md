# 重新组织 mongoDB数据库中的 数据格式

## 1 数据库导出
`mongoexport -d dbName -c collectionName -o ./data.js`

得到data.js，现格式如下
```
{"_id":"24Fgub3Z","createdAt":{"$date":"2011-10-14T08:29:18.395Z"},"services":{"password":{"bcrypt":"$2a$10$3s8QZCDR7lcl10e.02HWU.PiLqYzBK0pfdGEwFQC07gi/4EwYNRyG"},"resume":{"loginTokens":[]}},"username":"Trump","emails":[{"address":"xx@xx.com","verified":false}],"paidCourses":["2343243", "2323432"],"team":[]}
{"_id":"3rEtC9W2","createdAt":{"$date":"2011-05-16T11:38:31.644Z"},"services":{"password":{"bcrypt":"$2a$10$LDcd6kxMm0BqZbD0pIhjZe4GcDPoMe0MQ3Bs3hkw3evT00297B2VS"},"resume":{"loginTokens":[]}},"username":"Obama","emails":[{"address":"bbc@163.com","verified":false}],"paidCourses":["h2333666"],"team":[8.0]}

```

## 2 JS处理数据的思路（index.js）

* 读取数据文件为字符串
  * `fs`

* 按换行符切分字符串，得到数组，数组元素为各条document
  * `split(）`

* 逐条将数组中的字符串转换为对象，并按需重新组织结构
  * `map() / filter() / forEach()`
  * `JSON.parse`转换
  * 利用临时数组`intermediaArr`保存结果

* 但此时还不能直接输出，否则会得到`[object Object],[object Object]`。所以再逐条将其转换为JSON string
  * `map()`
  * `JSON.stringify()`

* 将map得到的数组处理为可以导入数据库的字符串
  * `join('\n')`

* 输出文件
  * `fs`


输出为temp.js ，已经得到想要的格式
```
{"_id":"24Fgub3Z","username":"Trump","password":"$2a$10$3s8QZCDR7lcl10e.02HWU.PiLqYzBK0pfdGEwFQC07gi/4EwYNRyG","paidCourses":["2343243","2323432"],"createdAt":"2011-10-14T08:29:18.395Z"}
{"_id":"3rEtC9W2","username":"Obama","password":"$2a$10$LDcd6kxMm0BqZbD0pIhjZe4GcDPoMe0MQ3Bs3hkw3evT00297B2VS","paidCourses":["h2333666"],"createdAt":"2011-05-16T11:38:31.644Z"}
```

### 3 将新数据导入数据库
```
mongoimport -d dbName -c collectionName --file temp.js
```
## 更新
* 使用了ES6新特性
  * 解构
  * `for-of`
  * 对象字面量属性值简写

## 参考文档
* [JSON.stringify()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

* [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
