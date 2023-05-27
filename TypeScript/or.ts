//声明不设定一个明确的值(undefined)，或者类型，默认为any
let b2 : "male" | "female" //限制两个值
b2 = 'male'
b2 = 'female'
// b2 = 'boy'两值之外，报错


let b3 : string | boolean   //限制两个类型
b3 = '9'
b3 = true
// b3 = undefined
//可以用|来让一个变量支持多种类型
//联合类型

let b4 : any //任意类型，和js一样，不建议用
b4 = 99

let b5 : unknown
b5 = 10
b5 = "what"

b2 = b4 //此处b2是限制俩固定字符串，但b4的any类型打破了限制，不好
// b2 = b5 //unknown就不会打破原来的类型
//unknown就是一个类型安全的any，例如
if(typeof b5 == 'string'){
    let b6 = b5
    console.log(b6);
}

let b7 = 9
//断言类型，可以用来告诉解析器变量的实际类型
b5 = b7 as number //对于unknown以及any，可以用断言类型
b5 = <number> b7 //两者效果相同
b5 = '99'
//相信我，我知道我在干什么。不影响运行，只在编译起作用