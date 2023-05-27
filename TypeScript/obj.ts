let c1 :object //跟下面一样
let c2 :{}
let c3 :{name:string,age?:number,[xx:string]:unknown | any} //这个才是最常用的
//name正常写代表必选项
c3 = {name : 'boy'}

//age?代表可选项，可写可不写
c3 = {name:'girl',age:18}

//[xx:string]:unknown代表任意多个项
//xx:string是左边(haha)，方括号外是右边(9)
c3 = {name:'girl',haha:9,meme:1616}

// c3 = {name : true} //报错
// c3 = {name: 'girl',gender:'girl'} gender报错。不能多也不能少

let c4 : Function //声明c4是个函数，但与object一样缺乏意义
let c5 : (a:number,b:string)=>string //这个才常用

//c5的变量被限定，return也被限定，不符合或者多了都报错
c5 = function(a,c){
    return a+c
}

//数组
let c6:string[]//限定字符串数组
c6 = ['a','b']
let c7:object[]//限定对象数组
c7 = [{a:1},{b:2}]

//元组，长度固定的数组，多了或者不一致都会报错
let c8 : [string,number]
c8 = ['yes',9]

//枚举enum
enum Gender{
    Male = 0,
    Female = 1
}
let c9:{gender:Gender}
//说是枚举，我怎么感觉像是对象嵌套
c9 = {gender:Gender.Male}
c9 = {gender:1}//效果同上，几个值有选择时候可以这么代表

//自定义类型
type myType = 1|2|3
let c10 :myType
// c10 = 9 报错，不是1,2,3