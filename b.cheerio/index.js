import cheerio from 'cheerio'
import http from 'https'
import { resolve } from 'path';
   http.get('https://www.baidu.com/',(res)=>{
    let html = ''
    res.on('data',(data)=>{
        html += data
    })

    res.on('end',()=>{
        resolve(html)
    })
    let $ = cheerio.load(html);
    console.log($.html());
   })

// $('h2.title').text('Hello there!');
// $('h2').addClass('welcome');

// console.log($.html());