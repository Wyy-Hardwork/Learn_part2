import express from 'express'//导入
import {router} from './2.moudle_express/index.js'
let app =express()//创建web服务器

app.use(router)//注册导入的模块,(注册全局中间件)
//在use('/xx',router)可以给模块加url前缀

app.listen(8080,()=>{//启动web服务器
    console.log('express server running at http://127.0.0.1!');
})

app.get('/index',(req,res)=>{//get
    res.send({name:'空崎日奈',age:18})//send响应
})

app.post('/index',(req,res)=>{//post
    res.send('请求成功')
})

app.get('/',(req,res)=>{//get
    console.log(req.query);
    res.send(req.query)//req.query可以得到query参数，默认是空对象
    //在有？参数=参数的情况下是{"参数名":"参数"}这种json对象
    //如http://localhost:8080/?box=5&b=3
    //{"box":"5","b":"3"}
})

app.get('/user/:id',(req,res)=>{//get
   console.log(req.params);//占位符是{ "id": "xx" }这种
   //占位的参数名:占位的参数值(名和值占一个地方)
   //多个占位符也是可以的,即多个动态参数
   res.send(req.params)
})
