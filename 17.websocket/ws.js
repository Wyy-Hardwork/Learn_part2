import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import session from 'express-session'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())


const server = createServer(app)
const io = new Server(server,{
    cors:true
})

let count = 0
io.on('connection',(socket) => {
    console.log('新用户连进来了!');
    count = count + 1
    socket.broadcast.emit('count',count)
    socket.emit('count',count)

    socket.on("disconnecting", () => {
    count = count - 1
    socket.broadcast.emit('count',count)
    console.log('用户离开了!');
    });

    socket.on('speak',(data)=>{
        socket.broadcast.emit('speak-in',data)
    })

    socket.on('getCount',()=>{
        socket.emit('count',count)
    })
});

app.use(session({
    name:'Hina',
    secret:'My dear Hina',
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie:{
        maxAge:1000 * 1000,
    }
}))

app.post('/',(req, res) => {
    // console.log(req.ip);
    // console.log(req.hostname);
    // console.log(req.body);
    // console.log(req.query);
    // console.log(req.method);
    req.session.token = 'logined'
    console.log(req.sessionID);
    res.send(req.session)
});

app.get('/login',(req,res)=>{
    // console.log(req.session.token);
    // console.log(req.sessionID);
    res.send(`看看你的token:${req.session.token}`)
})

app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.send('登出,清除cookie')
})

const jwtSecret = 'Hina Daisuki'
app.post('/jwt',(req,res)=>{
    const token = jwt.sign(//生成token，分三部分
        {logined:'hina_has_logined'},
        jwtSecret,
        {algorithm:"HS256",expiresIn:"10h"}
    )
    res.cookie('token',token)
    res.send(token)
    // console.log(req.cookies);
})

app.post('/vip',(req,res)=>{
    jwt.verify(req.body.token,jwtSecret,(err,decoded)=>{
        //验证token的正确性
        if(err){
            res.send('过期了老铁')
        }
        else{
            res.send(`第二个参数${decoded.logined}`)
        }
    })
})

app.listen(4000,()=>{
    console.log('监测是否影响');
})
 
server.listen(3000,() => {
    console.log("server is up and running on port 3000");
}
)