# Observable, Producer và Consumer
* Promise là Object hỗ trợ sẵn trong Javascript
* Observable là Object chưa hỗ trợ sẵn, người dùng sẽ phải tự định nghĩa hoặc sử dụng những thư viện liên quan. No1la2 một Object đại diện cho một tập hợp nhiều giá trị, events,... được gửi đến trong tương lai.
* Observable sinh ra:
    * Để chuẩn hóa các mô hình Producer - Consumer với cùng một API giống nhau và cùng một cơ chế xử lý.
    * Bù đắp các thiếu sót của những mô hình đó trong Javascript.

## Các mô hình Producer - Consumer trong Javascript:
1. setTimeout vs clearTimeout. Consumer không biết được khi nào event sẽ được gửi tới. Việc setTimeout 1000 không đồng nghĩa với việc đúng 1s sau event sẽ được gửi đến.
```Typescript
function next(ev) {
    //TODO
}

setTimeout(next, 1000)
```
2. setInterval vs clearInternal
3. addEventListener vs removeEventListener (dùng trong DOM)
`document.addEventListener('mouseover', next)`

Ví dụ về thông tin thời tiết trực tiếp hoặc qua radio (hoặc qua app == Behavior Subject) [Metaphor](https://www.youtube.com/watch?v=GSI7iyK_ju4&t=0s&ab_channel=NeverBenBetter) is important.

## Xây dựng Observable với timeout và interval
* Các khái niệm cần nắm: subscribe, next, error, complete
* Trái ngược với Promise, Observable được evaluate theo cách lazy.
* Có 2 cách xây dựng Object mới trong Javascript: function và class
    * Lưu ý: Convention dùng dấu $ sau tên biến để thể hiện là một Observable

```Typescript
// Đối với Observable
const obsTimeout$ = Observable.timeout(1000)    // Chưa kích hoạt
const obsObj$ = Observable.interval(2000)       // sẽ chạy nhiều lần khi được subscribe

// cách 1
obsTimeout$.subscribe((data) => {
    console.log('Observable.timeout Data', data)
})

// cách 2
function next(data) => {
    // Chạy 1 lần
    console.log('Observable.timeout Data', data)
}
obsTimeout$.subscribe(next)
```

1. Khai báo function là một object, và định nghĩa property timeout. Khi in ra obsTimeout$ ta gặp undefined.
2. Ta không gọi setTimeout trực tiếp được mà phải bọc trong một function **timeoutWaitToRun** để nó chỉ tính toán khi được subscribe
3. Để object obsTimeout$ gọi được subscribe thì ta phải dùng `Observable.prototype.subscribe = function()` tuy nhiên khi đó sẽ không thể tham chiếu đến hàm **timeoutWaitToRun** được. Do đó ta dùng trick truyển luôn hàm trên vào trong constructor.
4. Bây giờ khi gọi subscribe tức là gọi đến timeoutWaitToRun, ta có thể thêm hàm next để được thực thi
5. Clean up code, dùng subscribe ngay sau timeout.
6. Copy code để định nghĩa thêm hàm setInterval, khi này subscribe trỏ vào cùng lúc 2 hàm