import http from 'http'
import fs from 'fs'
let server = http.createServer()//对象


server.on('request',(req,res)=>{
    console.log('有人来了');
    //1.----req.url是客户端请求的url地址
    //req.method是客户端请求的method类型
    let url = req.url
    let method = req.method
    let content = '404 Not Found'
    console.log('请求的地址是'+url+'请求的方法是'+method);

    //2.----res用于响应客户端
    res.setHeader('Content-Type','text/html;charset=utf-8')//设置CT响应头,防止中文乱码
    if(url == '/' || url =='/index.html') content = '首页'

    res.end(content)//回应用户的页面
})

server.listen(8080,()=>{//3.----开启端口
    console.log('服务器已在8080端口启动了,http://127.0.0.1:8080');
})