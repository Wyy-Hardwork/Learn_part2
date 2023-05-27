//不同于Array的from和isArray孤儿，这里没有原型方法
const obj = {a:1,b:2}
console.log(Object.keys(obj));//键
console.log(Object.values(obj));//值
console.log(Object.entries(obj));//键值对的二维数组