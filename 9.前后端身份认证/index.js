import express from 'express'
import session from 'express-session'

let app = express()
app.use(session({
    secret: 'hifumi',
    resave: false,
    saveUninitialized:true
}))
//不配置session前是没有req.session对象访问的

// app.use(express.urlencoded({extended : false}))

app.get('/user/in',(req,res)=>{
    if(!req.session.islogin){
        return res.send({status:1,msg:'fail'})
    }
    res.send({status:0,msg:'登录成功',username:req.session.user.username})
})//登录后的get

app.post('/user',(req,res)=>{
    if(req.body.username !=='admin' || req.body.password !=='123'){
        return res.send({status:1 , msg: '登录失败'})
    }
    req.session.user = req.body //存储用户信息到session
    req.session.islogin = true //改变用户登录状态
})

app.post('/logout',(req,res)=>{
    req.session.destroy()//只清空当前服务器保存到session
    req.send({
        status:0,
        msg:'退出登录成功'
    })//post退出登录
})


app.listen(8080,()=>{
    console.log('开启');
})