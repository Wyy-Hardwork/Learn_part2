import {Builder, Browser, By, WebDriver,until} from 'selenium-webdriver';
import mysql from 'mysql2'
import request from 'request'
import fs from 'fs'
//小说脚本

//数据库部分
  let options = {
    host:'127.0.0.1',
    user:'root',
    password:'123',
    database:'crawler'
}
let db = mysql.createConnection(options)
db.connect()
let sql = 'insert into books (name,img,url) values (?,?,?)'

//数据获取部分
  let driver = await new Builder().forBrowser(Browser.EDGE).build();
    await driver.get(`https://www.linovelib.com/top/allvisit/1.html`);
  for (let i = 1; i <= 1; i++) {
    for (let i = 1; i <= 20; i++) {
      let data = await driver.findElement(By.css(`.rank_main .rankpage_box div.rank_d_list:nth-of-type(${i}) .rank_d_b_name a`))//链接和标题
      let data1 = await driver.findElement(By.css(`.rank_main .rankpage_box div.rank_d_list:nth-of-type(${i}) .rank_d_book_img a img`))//图片
      let name = await data.getText()
      let url = await data.getAttribute('href')
      let img = await data1.getAttribute('data-original')
      let name1 = img.match(/\/\d{1,6}s.jpg/g).join('')
      let name2 = name1.replace('s.jpg','')

      request(img).pipe(fs.createWriteStream(`./novel/`+name2+'.jpg',))


    //   db.query(sql,[name,img,url],function(err,result){
    //     if(err) throw err;
    //     console.log(result);
    // })
    }
    await driver.findElement(By.css(`.rank_d_pagesize .pagelink .next`)).click()
  }

  db.end()//关闭数据库
