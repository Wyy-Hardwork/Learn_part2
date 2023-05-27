import mysql from 'mysql2'
let options = {
    host:'127.0.0.1',
    user:'root',
    password:'123',
    database:'front'
}

//图片链接思路是存入名字，通过数据库名字查找无防盗链的图片链接，再将图片链接引用

//创建与数据库的连接的对象
let db = mysql.createConnection(options)

//建立连接
db.connect((err)=>{//判断是否连接成功,'连接数据库，打开冰箱门'
    if(err){
        console.log(err);
    }else{
        console.log('连接成功');
    }
})

let sql = 'select * from `users`'
db.query(sql,function(err,result,fields){//'执行数据操作，把大象放进冰箱'
    if(err) throw err;
    console.log(result);
})

db.end()//'关闭连接，关闭冰箱门'