function a(ok,bbbb){
    setTimeout(()=>{
        console.log(ok);
        bbbb()//这是回调函数的位置,也就是待会同步执行的顺序
    },0)//原来setTimeout就是一个包含回调函数的函数呀,你看第一个是回调,第二个是一个参数，合理怀疑wait
}
let pingfan = '我是ok,是一个平凡的参数'
let url = '类似axios请求需要用的url'

function b(){
    console.log('我是b()函数,整个写进去了,没有像下面()=>{}那样写');
}

// console.log('我是外部的同步函数,虽然我在中间,但我会被第一个执行');
//正因如此,才有了变量名不要和函数同名的说法吧
//注意回调是用于存在异步的函数内的,把外部的函数作为参数成为回调函数,实现顺序执行



// a(pingfan,b)//这是一种回调函数写法,b()是个函数
a(pingfan,(ohYeah)=>{//这是更加常用的回调函数写法,嗯。。。终于搞懂了
    ohYeah = '我是bbbb回调里的实参,现在被顺序执行了'
    console.log(ohYeah);

    //请把a类比成axios请求
    a(url,()=>{
        console.log('地狱在继续');
        a(url,()=>{
            console.log('地狱在继续');
            a(url,()=>{
                console.log('地狱在继续');
                a(url,()=>{
                    console.log('地狱结束了');
                })
            })
        })
    })
})