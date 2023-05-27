// app.use((req.res.next)=>{
//     next()
// })
//简化中间件写法

import express from 'express'
let app = express()

app.use(//全局的中间件
    (req,res,next)=>{//猜测req和res应该是原型链上的方法
    //获取请求到达服务器时间
    let time =Date.now()
    req.startTime = time//为req对象挂在时间
    next()//类似路由守卫的放行,挂载在app上可以影响后续每一个get,post
})

app.get('/',(req,res)=>{
    res.send('Now Time is '+req.startTime)
})

app.listen(8080,()=>{
    console.log('Success!');
})

