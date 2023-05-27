import express from 'express'
let app = express()

//定义中间件函数
let mw1 = (req,res,next)=>{
    console.log('局部中间件生效');//中间件的注册需要在路由之前
    next()//next后面不建议继续写代码
}

app.get('/',mw1,(req,res)=>{//夹在url和req函数之间,这样就是局部中间件了
    //可以同时使用多个中间件,优先顺序从前到后
    res.send('中间件成功')
})
app.get('/a',(req,res)=>{
    res.send('对照组,没有中间件')
})

app.listen(8080,()=>{
    console.log('Success!');
})