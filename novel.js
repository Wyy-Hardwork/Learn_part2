import axios from 'axios'
import cheerio from 'cheerio'
import mysql from 'mysql2'

//数据库部分
let dboptions = {
  host: '127.0.0.1',
  user: 'root',
  password: '123',
  database: 'crawler'
}
let db = mysql.createConnection(dboptions)
db.connect()
let sql = 'insert into crawler.novel (img,title,NovelUrl,author,publisher,isEnd,intro,last) values (?,?,?,?,?,?,?,?)'


let i

async function go(start) {
  for (i = start; i < start + 1; i++) {
     Promise.all([
     await axios({
        url: `https://www.linovelib.com/top/allvisit/${i}.html`,
        method: "get",
      }),
    ]).then((value) => {
      getBook(value[0])
    }
    )
  }
}

function getBook(item) {
  let $ = cheerio.load(item.data, { decodeEntities: false })
  let length = $('.rankpage_box .rank_d_list').length  
  for (let i = 0; i < length; i++) {
    let img = $(`.rankpage_box .rank_d_list .rank_d_book_img a`).eq(i).attr('href').match(/\d{1,6}/g).join('')
    let title = $(`.rankpage_box .rank_d_list .rank_d_b_name a`).eq(i).text()
    let NovelUrl = $(`.rankpage_box .rank_d_list .rank_d_b_name a`).eq(i).attr('href')
    let author = $(`.rankpage_box .rank_d_list .rank_d_b_cate a:nth-of-type(1)`).eq(i).text()
    let publisher = $(`.rankpage_box .rank_d_list .rank_d_b_cate a:nth-of-type(2)`).eq(i).text()
    let isEnd = $(`.rankpage_box .rank_d_list .rank_d_b_cate a:nth-of-type(3)`).eq(i).text()
    let intro = $(`.rankpage_box .rank_d_list .rank_d_b_info`).eq(i).text()
    let last = $(`.rankpage_box .rank_d_list .rank_d_b_last`).eq(i).text()
    db.query(sql, [img,title,NovelUrl,author,publisher,isEnd,intro,last])  
    console.log(title);
}

}

async function Gobook(){
  let add = 1
  //结束了
  while(true){
    go(add)
    await time()
    add = add+1
    console.log('第'+add+'本aaa');
  }
}

function time(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve();
    },2700)
  })
}

// async function Gobook(){
// let result = await axios.get(`https://www.linovelib.com/top/allvisit/1.html`)
// console.log(result.data);
// }
//可修改位置:add起始位置,
//i<start+50 以及add+50的那个50是单次并发量
//,time()函数是发送间隔,是同步化异步
Gobook()
// go()


