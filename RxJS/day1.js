function timeout(miliseconds) {
    return new Promise((successFn) => {
        setTimeout(() => {
            successFn('Thành công')
            successFn('Thành công')
            successFn('Thành công')
            successFn('Thành công')
            successFn('Thành công')
        }, miliseconds);
    })
}

timeout(1000)
    .then((data) => {
        console.log('Log from day1.js:', data)
    })


Promise.timeout = function(miliseconds) {
    return new Promise((resolve, reject) => {
        console.log('Kích hoạt qua Promise')
        setTimeout(() => {
            resolve()
        }, miliseconds);
    })
}

const promiseObj = Promise.timeout(1000)    // Eager evaluation
promiseObj.then(() => {
    console.log('Timeout Run inside Promise')
})