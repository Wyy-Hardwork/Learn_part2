import express from 'express'
let app = express()

//定义错误级别中间件
let mw1 = (err,req,res,next)=>{
    if(err){
    console.log(err.message);
    res.send('Error: '+err.message)
    }//中间件的注册需要在路由之前
    next()//next后面不建议继续写代码
}

//定义json解析中间件
app.use(express.json())//挂载在req的body中

//配置解析application/x-www-form-urlencoded格式数据的内置中间件
app.use(express.urlencoded({extended : false}))

app.post('/post',(req,res)=>{
    console.log(req.body);
    res.send('数据发送成功')
})

app.get('/',mw1,(req,res)=>{//夹在url和req函数之间,这样就是局部中间件了
    //可以同时使用多个中间件,优先顺序从前到后
    // throw new Error('Bad!')
    res.send('中间件成功')
})

app.listen(8080,()=>{
    console.log('Success!');
})