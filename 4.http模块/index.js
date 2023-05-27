import http from 'http'
//80端口可以被省略
let server = http.createServer()//对象

server.on('request',(req,res)=>{
    // 有来自客户端的请求,request事件就会被触发
    console.log('有人来了');
})

server.listen(80,()=>{
    console.log('服务器已在80端口启动了');
})