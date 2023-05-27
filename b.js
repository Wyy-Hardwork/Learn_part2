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
let sql = 'insert into crawler (id,name,price,discount,author,publisher,series,page,pack,kai,fonts,tag1,tag2,tag3,date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'


let i
let count = 12034163
async function Gobook() {
    while (true) {
        go(count)
        await time()
        count = count + 100
        console.log('是否出错 '+count +'aaa');
    }
}
function getList(start) {
    let List = []
    for (i = start; i < start + 100; i++) {
        let each = axios.get(`https://www.dushu.com/book/${i}/`)
        List.push(each)
    }
    return List
}
function go(start) {
    Promise.all(getList(start)).then((value) => {
        for (const key of value) {
            getBook(key)
        }
    })
}
function getBook(item) {
    let $ = cheerio.load(item.data, { decodeEntities: false })
    let exist = $('.crumbs').text()
    let urlId = item.config.url.match(/\d{1,8}/).join('')
    if (exist.indexOf('错误提示') !== -1) {
        console.log(urlId + '没有书');
    }
    else {
        let dis
        let discount
        dis = $(`.book-details-right li:first-of-type a`).text()
        if (dis == '') dis = '00.00'
        try {
            discount = dis.match(/\d{1,10}.\d{1,2}/g).join('')
        } catch (err) {
            discount = '00.00' //有的是有商城没价格,emm..join空会导致报错,所以用错误捕获
        }
        let name = $(`.book-title h1`).text()//标题
        let price = $(`.price .num`).text().replace('¥', '')
        let author = $(`#ctl00_c1_bookleft tr:nth-of-type(1) td:last-of-type`).text()
        let publisher = $(`#ctl00_c1_bookleft tr:nth-of-type(2) td:last-of-type`).text()
        let series = $(`#ctl00_c1_bookleft tr:nth-of-type(3) td:last-of-type`).text()
        let date = $(`.book-details table:last-of-type .rt`).eq(1).text()
        let pack = $(`.book-details table:last-of-type .rt`).eq(2).text()
        if (pack.length > 20) return
        let kai = $(`.book-details table:last-of-type .rt`).eq(3).text()
        if (kai.length > 20) return
        let page = $(`.book-details table:last-of-type .rt`).eq(4).text()
        page = page.replace('页', '')
        let fonts = $(`.book-details table:last-of-type tr:last-of-type td:nth-of-type(6)`).text()
        let tag1 = $(`.crumbs a:nth-of-type(3)`).text()
        if (tag1.length > 45) return
        let tag2 = $(`.crumbs a:nth-of-type(4)`).text()
        if (tag2.length > 45) return
        let tag3 = $(`.crumbs a:nth-of-type(5)`).text()
        if (tag3.length > 90) return
        let id = urlId
        db.query(sql, [id, name, price, discount, author, publisher, series, page, pack, kai, fonts, tag1, tag2, tag3, date])
        console.log(id, name, price, discount, author, publisher, series, page, pack, kai, fonts, tag1, tag2, tag3, date);
    }
}
function time(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve();
    },2500)
  })
}

function newBook(){
    
}

//可修改位置:add起始位置,
//i<start+10 以及add+50的那个50是单次并发量
//,time()函数是发送间隔,是同步化异步
Gobook()
// go()


