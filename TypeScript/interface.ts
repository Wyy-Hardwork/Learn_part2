//interface可用于定义对象的形状
interface User {
    name: string,
    age?:number,//?代表可选属性
}

//--1.形状在函数的参数上的使用!!--
const user : User = {
    name:'x',
}
function test(take : User){
    console.log(take.name);
    console.log(take.age);
}
test(user)

//--2.对函数的返回类型加以限制!!--
function test1():User{
    return {name:'hina',age:1}
}

//3.同时也能使用在面向对象编程上,也就是函数实例化的时候
class Hifumi {
    constructor(name:string,age:number){
        this.name = name
        this.age = age
    }
    name : string
    age : number
}
//--形状在构造函数实例时候的使用!!--
const hi : User = new Hifumi('daisuki',9)