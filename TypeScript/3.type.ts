console.log('Hello Ts');
let a : number
let b : string = '9'
let c : boolean = true
let d = 4

a=3

// d = 's' 这句话会报错，限制你的类型。

// 优势之一，可以对函数参数进行类型限制，如下
function sum( a :number , b : number ) :number{
    return a+b
    //第三个number是限制return返回值，第一、二个是限制变量
}

// sum(a,b) 这里的b是string类型，有红色波浪线

//fn如果不在尾巴写类型，也能智能判断return的类型
function fn(a1 :number){
    if(a1 == 5){
        return true
    }else if(a == 3){
        return '999'
    }else{
        return 
        //返回undefined就是void类型
    }
}
//报错类型never,永不返回，不写return，使用场景较少
function fn1(a1:string) :never{
    throw new Error('错误')
}

//类型别名type和接口interface非常相似,后者所有功能在type中都可用,
// 主要区别在于无法重新打开类型以添加新属性,但是接口始终可拓展
interface jiekou {
    title: string
  }
  
  interface jiekou {
    ts: number
}
// 但是
type jiekou1 = {
    title: string
  }
  
//   type jiekou1 = {
//     ts: number
//   }