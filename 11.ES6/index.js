let a = [{item:15},1,2,3]
let b = Array.from(a)
let c = [...a]
a[3] = 9
a[2] = 0
a[0].item = 160
console.log(b);
console.log(c);
console.log(a);
