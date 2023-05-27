import { Builder, Browser, By, until } from 'selenium-webdriver';
import mysql from 'mysql2'
import chrome from 'selenium-webdriver/chrome.js'
const options = new chrome.Options()

//图书脚本

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

//数据获取部分
let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options.setPageLoadStrategy('eager')).setChromeOptions(options.addArguments('blink-settings=imagesEnabled=false')).setChromeOptions(options.setPageLoadStrategy('eager')).setChromeOptions(options.addArguments('--disable-extensions')).setChromeOptions(options.addArguments('--no-sandbox')).build();



for (let id = 22001; id <= 23000; id++) {
  // 13978868貌似
  let num = id.toString().length//第n本书数字长度
  let zero = ''//前置0
  for (let x = 0; x < 7 - num; x++) {
    zero = `${zero}` + `0`
  }

  await driver.get(`http://www.dushu.com/book/1${zero}${id}/`);

  let exist = await driver.findElement(By.css('.crumbs')).getText()

  if (exist.indexOf('错误提示') !== -1) {
    console.log(id + '没有书');
  }
  else {
    driver.wait(until.elementLocated(By.css('.book-details table:last-of-type td:nth-of-type(4)')))
    let dis//折扣
    try {
      dis = await driver.findElement(By.css(`.book-details-right li:first-of-type a`)).getText()
    } catch (err) {//折扣有的不存在，设置为00.00
      dis = '00.00'
    }
    let name = await driver.findElement(By.css(`.book-title h1`)).getText()//标题
    let price = (await driver.findElement(By.css(`.price .num`)).getText()).replace('¥', '')
    let discount
    try {
      discount = dis.match(/\d{1,10}.\d{1,2}/g).join('')
    } catch (err) {
      discount = '00.00' //有的是有商城没价格,emm..
    }
    let author = await driver.findElement(By.css(`#ctl00_c1_bookleft tr:nth-of-type(1) td:last-of-type`)).getText()
    let publisher = await driver.findElement(By.css(`#ctl00_c1_bookleft tr:nth-of-type(2) td:last-of-type`)).getText()
    let series = await driver.findElement(By.css(`#ctl00_c1_bookleft tr:nth-of-type(3) td:last-of-type`)).getText()
    let date = await driver.findElement(By.css(`.book-details table:last-of-type td:nth-of-type(4)`)).getText()
    let pack = await driver.findElement(By.css(`.book-details table:last-of-type td:nth-of-type(6)`)).getText()
    if (pack.length > 20) continue
    let kai = await driver.findElement(By.css(`.book-details table:last-of-type tr:last-of-type td:nth-of-type(2)`)).getText()
    if (kai.length > 20) continue
    let page = await driver.findElement(By.css(`.book-details table:last-of-type tr:last-of-type td:nth-of-type(4)`)).getText()
    page = page.replace('页', '')
    let fonts = await driver.findElement(By.css(`.book-details table:last-of-type tr:last-of-type td:nth-of-type(6)`)).getText()
    let tag1 = await driver.findElement(By.css(`.crumbs a:nth-of-type(3)`)).getText()
    let tag2 = await driver.findElement(By.css(`.crumbs a:nth-of-type(4)`)).getText()
    let tag3 = await driver.findElement(By.css(`.crumbs a:nth-of-type(5)`)).getText()

    // db.query(sql, [id, name, price, discount, author, publisher, series, page, pack, kai, fonts, tag1, tag2, tag3, date])
  }
}

db.end()//关闭数据库
