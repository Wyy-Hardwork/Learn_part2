import express from 'express'

//导入路由模块
import {router} from './routes.js'

let app = express()

app.use(express.urlencoded({extended:false}))

//在路由之前,使用cors中间件,解决跨域问题
import cors from 'cors'
app.use(cors())

//把路由模块,注册到app上
app.use('/api',router)


app.listen(8080,()=>{
    console.log('Create Success!');
})