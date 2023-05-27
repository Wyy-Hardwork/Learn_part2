import path from 'path'
import fs from 'fs'

let regStyle = /<script.*><\/script>/
console.log(regStyle);

// fs.readFile('./index.html')
fs.readFile(path.join(path.resolve(),'/index.html'),(err,data)=>{
    if(err){
        console.log(err.message);
        return 'bad'   
    }else{
        console.log(data);
        resolveCss(data)
    }
})//path.resolve()和__dirname等效

function resolveCss(data){
    let r = regStyle.exec(data)
    console.log(r);
}
