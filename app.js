import express from 'express'
import parser from 'body-parser'
import mysql from 'mysql2'
import { v4 as uuid } from 'uuid'

const app = express()
const port = 3000


//安装session之后，get会多一个session属性

let dboptions = {
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'crawler'
  }
  let db = mysql.createConnection(dboptions)
  db.connect()


app.use(parser.json())

//请求部分
app.get('/login',(req,res)=>{
    res.end('Hello World')
})

app.post('/login',(req,res)=>{
    console.log('收到登录请求:',req.body);
    let account = req.body.account
    let password = req.body.password
    db.query(`select * from login where account = ? and password = ?`,[account,password],(err,results)=>{
        if(results.length > 0){
            let data = [results[0].account,results[0].uuid]
            res.send(data)
        }else{
            res.send('no')
        }
    })
})

app.post('/permiss',(req,res)=>{
    let uid = req.body.uid
    db.query(`SELECT permiss FROM crawler.login where uuid = ?`,[uid],(err,result)=>{
        res.send(result)
    })
})
// 搜索小说
app.post('/novel',(req,res)=>{
    let start =(req.body.page - 1)*20
    db.query(`SELECT * FROM crawler.novel where title like '%${req.body.search}%' limit ${start},20`,(err,result)=>{
        if(err){
            res.send(err.message)
        }else{
            res.send(result)
        }
    })
    
})
//默认搜索，加速吧
app.post('/novel/0',(req,res)=>{
    let start =(req.body.page - 1)*20
    db.query(`SELECT * FROM crawler.novel order by id asc limit ${start},20`,(err,result)=>{
        if(err){
            res.send(err.message)
        }else{
            res.send(result)
        }
    })
    
})
//搜索总数
app.post('/novel/1',(req,res)=>{
    db.query(`select COUNT(id) as amount FROM crawler.novel where title like '%${req.body.search}%'`,(err,result)=>{
        if(err){
            res.send(err.message)
        }else{
            res.send(result)
        }
    })
    
})

app.post('/register',(req,res)=>{
    console.log('收到注册请求',req.body);
    let account = req.body.account
    let password = req.body.password
    let permiss = '0'
    let uuids = uuid().toString()
    db.query(`insert into login (account,password,permiss,uuid) values (?,?,?,?)`,[account,password,permiss,uuids],(err,results)=>{
        if(err){
            res.send(err.message)
        }else{
            //成功传入uuid
            db.query(`select * from login where uuid = ?`,[uuids],(err,result)=>{
                res.send(result[0].uuid)
            })
        }
    })    
})
// 默认书籍编辑
app.get('/admin/0',(req,res)=>{
    db.query('SELECT id,name,price,author,publisher,date,tag3 FROM crawler.crawler order by id asc limit 30',(err,result)=>{
        if(err){
            res.send(err.message)
        }else{
            res.send(result)
        }
    })
})
// 搜索书籍编辑
app.post('/admin/1',(req,res)=>{
    db.query(`SELECT id,name,price,author,publisher,date,tag3 FROM crawler.crawler where name like '%${req.body.search}%' limit 30`,(err,result)=>{
        if(err){
            res.send(err.message)
        }else{
            res.send(result)
        }
    })
    
})

// 收藏书籍
app.post('/favorite/1',(req,res)=>{
    let url = req.body.url
    let type = req.body.type
    let uid = req.body.uid
    db.query('insert into crawler.favorites values (?,?,?)',[url,type,uid],(err,result)=>{
        if(err){
            res.send(err.message)
        }else{
            res.send('yes')
        }
    })
})
// 取消收藏书籍,删除
app.post('/favorite/2',(req,res)=>{
    let url = req.body.url
    let uid = req.body.uid
    db.query('delete from crawler.favorites where url = ? and uid = ?',[url,uid],(err,result)=>{
        if(err){
            res.send(err.message)
        }else{
            res.send('yes')
        }
    })
})
// 检测收藏状态
app.post('/favorite/3',(req,res)=>{
    let url = req.body.url
    let uid = req.body.uid
    db.query('select * from crawler.favorites where url = ? and uid = ?',[url,uid],(err,result)=>{
        if(err){
            res.send(err.message)
        }else{
           if(result.length > 0){
            res.send('exist')
           }else{
            res.send('none')
           }
        }
    })
})
// 在线的收藏夹全获取
app.post('/fa',(req,res)=>{
    let uid = req.body.uid
    let type = req.body.type
    db.query('select url from crawler.favorites where uid = ? and type = ?',[uid,type],(err,result)=>{
        if(err){
            res.send(err.message)
        }else{
            res.send(result)
        }
    })
})
// 根据inner join查找喜欢和小说表重复的
app.post('/fa/1',(req,res)=>{
    let uid =req.body.uid
    db.query('select title as name,author,img,NovelUrl as novelUrl from novel inner join favorites on novel.NovelUrl = favorites.url and favorites.type = 1 and favorites.uid = ?',[uid],(err,result)=>{
        if(err){
            res.send(err.message)
        }else{
            res.send(result)
        }
    })
})

// 书籍单个编辑
app.post('/admin/2',(req,res)=>{
    let row = req.body
    db.query(`update crawler.crawler set name=?,price=?,author=?,publisher=?,date=DATE_ADD(?, INTERVAL 1 day),tag3=? where id = ?`,
    [row.name,row.price,row.author,row.publisher,row.date,row.tag3,row.id],(err,result)=>{
        if(err){
            res.send(err.message)
        }else{
            res.send('edit success')
        }
    })
})
// 折线图x>1972
app.get('/echart/1',(req,res)=>{
    db.query(`SELECT (any_value(YEAR(date))) as 'row'  FROM crawler.crawler where YEAR(date) group by YEAR(date) order by YEAR(date) asc`,(err,result)=>{
        res.send(result)
    })
})
// 折线图y(数量),group_concat处理,需要在前端再计每一索引的数量
app.get('/echart/2',(req,res)=>{
    db.query(`SELECT (group_concat(day(date))) as 'coulmn' FROM crawler.crawler group by YEAR(date) order by YEAR(date) asc`,(err,result)=>{
        res.send(result)
    })
})

//十个tag1数量统计
app.get('/echart/3',(req,res)=>{
    db.query(`select count(tag1) as 'value',tag1 as 'name' from crawler.crawler group by tag1 having count(*)>1 order by tag1 desc`,(err,result)=>{
        res.send(result)
    })
})

//tag2词云
app.get('/echart/4',(req,res)=>{
    db.query(`select count(tag2) as 'value',tag2 as 'name' from crawler.crawler group by tag2 having count(*)>1 order by tag2 desc`,(err,result)=>{
        res.send(result)
    })
})

app.get('/echart/5',(req,res)=>{
    db.query(`select count(price) as 'a',price as 'b' from crawler.crawler group by price having count(*)>1 order by price desc`,(err,result)=>{
        res.send(result)
    })
})

//按出版社数量
app.get('/echart/6',(req,res)=>{
    db.query(`SELECT publisher,count(publisher) as num FROM crawler.crawler group by publisher order by num desc limit 300`,(err,result)=>{
        res.send(result)
    })
})

//按出版社有折扣数量
app.get('/echart/7',(req,res)=>{
    db.query(`SELECT count(publisher) as num FROM crawler.crawler where discount > 0  group by publisher order by num desc limit 300`,(err,result)=>{
        res.send(result)
    })
})

app.listen(port,()=>{
    console.log(`Express listenning at http://127.0.0.1:${port}`);
})