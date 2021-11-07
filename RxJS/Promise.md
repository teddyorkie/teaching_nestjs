# Giới thiệu về Promise để xử lý bất đồng bộ
[Promise](https://tc39.es/ecma262/#sec-promise-objects) là đối tượng được dùng để chứa các kết quả tính toán sẽ được trả về trong tương lai. Một Promise có 1 trong 3 trạng thái: *fulfilled*, *rejected*, và *pending*:
* Promise p được fulfilled nếu p.then(f, r) sẽ ngay lập tức xếp một Job để gọi hàm f
* Promise p bị rejected nếu p.then(f, r) sẽ ngay lập tức xếp một Job để gọi hàm r
* Promise p bị pending nếu nó không được fulfilled cũng như bị rejected
* Với Promise, object được đánh giá eager

Ví dụ với setTimeout. Nếu gọi successFn trong setTimeout nhiều lần, thì cũng không có tác dụng.

Nhắc lại về closure, scope of variable trong Javascript.

* Mục tiêu:
```Typescript
// Đối với Promise
const promiseObj = Promise.timeout(1000)    // Đã kích hoạt timer

// Khi muốn lấy dữ liệu
promiseObj
    .then((data) => {
        console.log('Promise.timeout Data', data)
    })
```