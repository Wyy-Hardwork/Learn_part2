import express from 'express'
let app = express()
app.listen(8080,()=>{
    console.log('运行成功!');
})

//调用express.static()方法,快速的对外提供静态资源
//在url后直接加对应的文件名加后缀就可以打开
app.use(express.static('./public'))//这种写法你可以在url中省略public

//可以同时use多个静态资源,依照先后顺序,不用担心同名问题

app.use('/public',express.static('./public'))//这种写法需要在url内写public
//前面是访问前缀,后面是访问文件夹

// ./和不写./直接写文件夹或文件名一个效果

