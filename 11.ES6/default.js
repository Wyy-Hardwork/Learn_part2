//默认值
function fn(a=1,b=2){
    return a+b
}
//对象省略
export const test = 'love',age = 18,city = '龙山'
export const user = {
    test : test,
    age,
    city
}

console.log(user);
//键值同名可省略