let arr : number[] = [9,8,7]
let arr1 : Array<string> = ['9','8']
let bo = true || false
let bo1 : boolean
//其实也不是一直都需要类型注释,ts会尽可能尝试理解你准备定义的类型

//但是以下的类型是不能理解的,最好生命接受哪些类型的参数
//参数与返回值都可以限制,返回值约束可以不写,默认:void
function halo(name:string) : string{
    console.log(name);
    return 'ok'
}

const names = ["Alice", "Bob", "Eve"];

function printName(obj: { first: string; last?: string }) {
    // Error - might crash if 'obj.last' wasn't provided!
    console.log(obj.last?.toUpperCase());
  }