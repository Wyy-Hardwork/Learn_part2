const arr = [1,3,5,7]//数组解构
let [n1, , ,n2] = arr//中间值可以用空格代替
console.log(n1,n2);

const obj = {a:1,b:2,c:3}//对象解构
let {x,y,z} = obj
console.log(x,y,z);

let[a,...b] = [1,2,3]
console.log(b);

//对象同名解构只写对象名不写后面的:a也行