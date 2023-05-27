//1.函数中使用泛型

function fan1<T>(arg:T):T{
    return arg
}
// 使用泛型函数的继承
interface HasLength {
    length: number;
}
function logText<T extends HasLength>(arg: T): void {
    console.log(arg.length);
}
logText("Hello, World!"); // 输出 13
//可以给T加上对象约束,用继承实现约束,虽然有点绕,,

