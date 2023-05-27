//async会将return转化为resolve(return值)
//await会将自己身后的promise对象解开,直到resolve()
async function a() {
    while (true) {
        let test = await b()
        console.log(test);
        console.log('让我看看你的同步');
    }
}

function b() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('我是你想要先发的异步')
        }, 1000)
    })
}

a()
