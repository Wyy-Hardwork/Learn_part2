//通过简单的组合实现复杂的类型,联合和泛型,现在介绍联合
//type更像是自定义类型限制,定义时候是等于某种限制,使用时候类似:string

//联合表示一个变量可以是多种类型中的一种,这些类型以|分隔排列在一起
//1.基本数据类型多选一
type Mobile = 'IOS' | 'Android' | 99
const phone : Mobile = 'Android'
let mo : Mobile = 99

//2.函数参数限制,字符串或者字符串数组.还能限制字符串数组,意味着number数组也行.
function getArr(obj:string[] | string){
    console.log(obj); 
}
getArr('9')

//3.交叉类型实现type复合interface
interface Person {
    name:string
    age:number
}
type Employee = Person & { //交叉类型,也可以变成interface一样的约束对象
    id:number
}
const pep : Employee = {
    name:'x',
    age:1,
    id:9
    //三个参数缺一不可
}

function printId(id: number | string) {
    // console.log(id.toUpperCase());
    if (typeof id === "string") {
        // In this branch, id is of type 'string'
        console.log(id.toUpperCase());
      } else {
        // Here, id is of type 'number'
        console.log(id);
      }
  }
//联合会出现的问题,那就是需要都拥有这个方法,你看number没有toUpperCase就报错,
//如果都有,比如数组和字符串都有slice,那么就不会报错
//正确操作用代码缩小联合,看起来很智能嘛

// 所以用联合请记住判断方式
// Array.isArray()  typeof

declare function getInput(): string;
declare function sanitize(str: string): string;

type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}

// Create a sanitized input
let userInput = sanitizeInput(getInput());

// Can still be re-assigned with a string though
userInput = "new input";
