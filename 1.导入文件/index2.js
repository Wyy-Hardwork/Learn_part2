import fs from 'fs'

fs.readFile('./test2.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(data);
    }

    const arr = data.split(' ')//根据字符串某种格式形成数组
    console.log(arr);
    let newArr = []
    arr.forEach((item) => {
        newArr.push(item.replace('=', ':'))
        //对于forEach的每一项item,依次push至newArr尾部,并且将该项的'='replace为':'
    })
    console.log(newArr);
    let newStr = newArr.join('\n')
    console.log(newStr);
    //join用于把指定数组转换为字符串,应该说对每一项之间进行字符串化拼接,默认逗号
    fs.writeFile('./test2.1.txt', newStr, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('写入成功');
    })
})