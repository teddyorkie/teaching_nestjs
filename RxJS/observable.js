// khai báo function là một object, và định nghĩa property timeout
function Observable(funcWaitToRun) {
    this.subscribe = funcWaitToRun  // (3) trick để gán subscribe là alias
}

Observable.timeout = function(milliseconds) {
    // console.log('Timeout run', milliseconds)
    function timeoutWaitToRun(next) {
        setTimeout(() => {
            next()
        }, milliseconds);
    }
    return new Observable(timeoutWaitToRun)
}

Observable.interval = function(milliseconds) {
    function intervalWaitToRun(next) {
        setInterval(() => {
            next()
        }, milliseconds);
    }
    return new Observable(intervalWaitToRun)
}