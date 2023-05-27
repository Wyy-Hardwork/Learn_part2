import mysql from 'mysql2'
let db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123',
    database:'front'
})

// db.query('select * from users',(err,result)=>{
//     if(err) return console.log(err.message);
//     console.log(result);
// })

//向表插入数据inset into
let user = {username:'Koharu',password:'k123'}
//问号占位符,这是插入语句
let sqlStr = 'insert into users (username,password) values (?,?)'
//执行插入语句,results是一个对象,用对象来判断是否插入成功
// db.query(sqlStr,[user.username,user.password],(err,results)=>{//[]里面写占位符值
//     if(err) return console.log(err.message);
//     if(results.affectedRows === 1){//看起来是影响的行数
//         console.log('插入成功');
//     }
// })

let user1 = {username:'hifumi',password:'hi123'}
let sqlStr1 = 'insert into users set ?'//这是简单的插入写法
// db.query(sqlStr1,user1,(err,result)=>{
//     if(err) return console.log(err.message);
//     if(result.affectedRows === 1){
//         console.log('插入成功');
//     }
// })

//更新数据库update set
let user2 = {id:6,username:'hifumi2',password:'hi123'}
let sqlStr2 = 'update users set ? where id = ?'
// db.query(sqlStr2,[user2,user2.id],(err,result)=>{
//         if(err) return console.log(err.message);
//     if(result.affectedRows === 1){
//         console.log('更新成功');
//     }
// })

//删除数据库delete from
let sqlStr3 = 'delete from users where id = ?'
// db.query(sqlStr3,5,(err,result)=>{
//     if(err) return console.log(err.message);
//     if(result.affectedRows === 1) {
//         console.log('删除成功');
//     }
// })
//第一空位留给填sql语句
//第二空位留给填变量
//set后面似乎是写表示占位符对象的,不写名字=xx就在对象里写；写了就在query[]数组直接写值

//标记删除(模拟删除)
//删除数据代价过大,一般用来改status来更新一下,以表示删除
let sqlx = 'update users set status = ? where id = ?'
db.query(sqlx,[1,6],(err,result)=>{
    if(err) return console.log(err.message);
    if(result.affectedRows === 1) console.log('模拟删除成功');
})