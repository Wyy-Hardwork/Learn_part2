//对象属性如果是Number或String等简单类型，得到是深拷贝
//如果属性是对象或者其他引用类型，那么就是浅拷贝
//使用解构或者拓展运算符，结果也是这样
//对象使用JSON.stringify()可以实现深拷贝，但是包含function或者RegExp不行

//at接收整数并返回该索引的元素，可负数，负数从最后一个元素倒数
const arr = [1,2,3,4,5]
const arr1 = [6,7,8]
console.log(arr.at(1),arr.at(-1));

//concat合并两个或多个数组，不会改变原数组
console.log(arr.concat(arr1));

//entries返回一个新的数组迭代器对象
console.log(arr.entries());

//filter给定数组一部分浅拷贝，通过筛选就行，可return
console.log(arr.filter(item=>item>3));

//forEach数组每一个元素执行一次给定函数，不可return，不可return和break中断
//break跳出该循环不影响其他，continue中止本次循环，return就地停止不前，函数也不执行了
console.log(arr.forEach(item=>{console.log(item)}));

//map可以遍历数组,并且有返回值,forEach则没有.
console.log(arr.map(item=>item+1));

//from对数组或可迭代对象创建一个新的，浅拷贝数组，非prototype函数
console.log(Array.from(arr));//这玩意是浅拷贝
//也可以操作数组，return就行
console.log(Array.from(arr,arr=>arr*5));


