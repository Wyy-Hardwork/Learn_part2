//ts原则之一是类型检查侧重于值的形状,两对象有相同的形状,则认为它们同类
interface Point {
    x:number
    y:number
}
function fnx(p:Point){
    console.log(p.x+'  '+p.y);
}
const po = {x:9,y:2} //注意,这里没有声明Point类型
fnx(po)//通过
//虽然没有声明为Point类型,但是类型检查将会把po和Point的形状进行比较,形状同,过.

//形状匹配只需要匹配对象字段的一个子集,多了可以,少了不行(多传参可以)
const poo = {x:9,y:3,a:'x'}
fnx(poo)

//在class用,只要结果一致就行,无论你过程怎么样
class testClass{
    constructor(ax:number,ay:number){
        this.x = ax
        // this.z = ay
        this.y = ay
    }
    x:number
    // z:number
    y:number
}
const tp = new testClass(9,8)//实例化对象存在{x:9,y:8}
fnx(tp)//并且可以检测出来,(看上面注释z,会报错)