let grader = {
    u1 : {a:1},
    u2 : {a:2}
}
const u2 = Symbol('u2-extra')
grader[u2] = {a:3}
console.log(grader);

for (const key in grader) {
    console.log(key);
}

Object.defineProperty(grader,'u2',{
    enumerable:false
})
console.log(Object.getOwnPropertyNames(grader));
console.log(Object.keys(grader));