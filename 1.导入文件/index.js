//node的导入文件也有同步异步接口
var a = fs.openSync('./test.txt','r')//一般只用写名字就行了，第二个r读也是默认的，第三个别管
let b = a.toString()
console.log(b);