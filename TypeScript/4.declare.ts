//字面推理,ts假定该对象属性可能会更改
declare let boy : boolean

const obj = {counter:0}
if(boy){
    obj.counter = 1
}
//此处不加declare会导致boy判断

declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method as "GET");
//这里不添加 as 会导致req.method会被误判string,导致GET写不了

// ts的一种特殊语法,非空判断,要求不能是null或者undefined,后面加个感叹号!
