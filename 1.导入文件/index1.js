import fs from 'fs'

fs.readFile('./test.txt','utf8',function(err,data){
    if(err)
    console.log(err.message);
    console.log('------');
    console.log(data);
})//读取文件(目录，编码，回调),读取失败可以message获取信息

fs.writeFile('./test1.txt','测试内容',function(err){
    if(err)
    console.log('加入失败!');
    //return可以用于中断代码(return出去)
})//写入文件(路径,内容,回调)--默认utf8格式写入

