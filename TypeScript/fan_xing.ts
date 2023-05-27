//1.在定义函数或类时,如果遇到类型不明确就可以用泛型
type Narr = Array<number>
//甚至对象元素结构也能限制
type Oarr = Array<{name:string}>

let arr_f : Narr = [1]
let arr1_f : Oarr = [{name:'Hina'}]

//也可以声明自己的使用泛型类型,感觉就像函数传参一样,不过参数是类型限制type
//接口interface + 泛型,感觉变得非常多变.
type bigType = string | number | Narr
interface bt<bigType>{
   value : bigType 
}
const bnum : bt<Narr> = {value:[9,8,7]}

const bbxx : string = `uhhhhhh+${bnum}`

function idd<ttk>(arg:ttk):void{//这里不加泛型,后面不能用自定义bigType
   //避免使用any
   let test = arg
   console.log(test);
   
}
idd(198)

//泛型可以extends

