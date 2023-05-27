import path from 'path'
let __dirname = path.resolve()//es6规范不一样需要这样..
let path1 = path.join('/a','/b/c','../','/d')
//../会抵消一个/路径,请注意
console.log(path1);

let path2 = path.join(__dirname,'./index.js')//path.join可以./忽视
console.log(path2);

let name = path.basename(path2)//文件名带后缀输出(最后一个/后面的)
console.log(name);

let unName = path.basename(path2,'.js')//移除.js后缀
console.log(unName);

let unName1 = path.extname(path2)
console.log(unName1);//输出后缀(拓展名).js