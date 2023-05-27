import express from 'express'
export let router = express.Router()//还没懂router?当作另一个app处理就行,主要是防止全局污染

router.get('/get',(req,res)=>{
    let query = req.query
    res.send({
        status : 0,
        msg: '请求成功',
        data : query
    })
    console.log('有人get');
})

router.post('/post',(req,res)=>{
    let body = req.body //get和post都有quey，只有post有请求体
    res.send({
        status:0,
        msg:'Yes',
        data : body
    })
    console.log('有人传东西');
})

router.post('/delete',(req,res)=>{
    let body = req.body //get和post都有quey，只有post有请求体
    res.send({
        status:0,
        msg:'delete OK',
    })
    console.log('有人删');
})