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

// (2)
// const obsTimeout$ = Observable.timeout(1000)

// function next() {
//     console.log("Next run")
// }

// (1) console.log(obsTimeout$)    // dòng này cho ta undefined
// obsTimeout$.subscribe(next)

// (5) refactor
// Observable.timeout(1500).subscribe(() => {
//     console.log("Code refactor")
// })

// (6) setInterval
Observable.interval = function(milliseconds) {
    function intervalWaitToRun(next) {
        setInterval(() => {
            next()
        }, milliseconds);
    }
    return new Observable(intervalWaitToRun)
}

const obsTimeout$ = Observable.timeout(1000)
const obsInterval$ = Observable.interval(2000)