import express from 'express'

export let router = express.Router()//模块化思想,把路由挂载在router上方便管理

router.get('/user/a',(req,res)=>{
    res.send('欢迎!')
})

router.post('/user/a',(req,res)=>{
    res.send('欢迎!')
})

