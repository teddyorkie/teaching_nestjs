## Các thành phần chi tiết
[Tham khảo](https://auth0.com/blog/nestjs-brings-typescript-to-nodejs-and-express/)

### Module
### Controller
```
nest g module user
cd user
nest g service user
nest g controller
```
### Component
Có thể *Service* hoặc *Repository*

### Guard
* Guard là một lớp được chú thích bằng decorator @Injectable(). Các Guards phải implement interface CanActivate.
* Guards có một single responsibility. Nó xác định xem một request nhất định sẽ được xử lý bởi route handler hay không, tùy thuộc vào các điều kiện nhất định (như quyền/permissons, vai trò/roles, ACLs, v.v.) hiện có tại thời điểm chạy. Điều này thường được gọi là ủy quyền/authorization. Ủy quyền/Authorization (và người anh em họ của nó, xác thực/authentication, mà nó thường cộng tác) thường được xử lý bởi middleware trong các ứng dụng Express truyền thống. Middleware là một lựa chọn tốt để xác thực/authentication, vì những thứ như token validation thông báo và đính kèm thuộc tính vào request object không được kết nối chặt chẽ với ngữ cảnh route cụ thể (và metadata của nó).
* Guards có quyền truy cập vào instance ExecutionContext và do đó biết chính xác những gì sẽ được thực thi tiếp theo. Chúng được thiết kế, giống như exception filters, pipes và interceptors, để cho phép bạn sử dụng logic xử lý chính xác vào đúng điểm trong chu kỳ request/response và làm như vậy một cách khai báo.

Note: Guards được thực thi sau mỗi middleware, nhưng trước tất cả interceptor hoặc pipe. **AuthGuard** là một NestJS Guard được viết sẵn bởi thư viện **@nestjs/passport** cho phép tích hợp passport strategy vào bên trong API. Mặc định AuthGuard sẽ gọi tới LocalStrategy mà chúng ta định nghĩa và đã thêm vào bên trong AuthModule trước đó.

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFJcbkFbQ2xpZW50XSAtLT5CKEd1YXJkKVxuICAgIEIgLS0-IEMoSW50ZXJjZXB0b3IpXG4gICAgQyAtLT4gRChQaXBlcylcbiAgICBEIC0tPiBFW05lc3RKU11cbiAgIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)](https://mermaid.live/edit#eyJjb2RlIjoiZ3JhcGggTFJcbkFbQ2xpZW50XSAtLT5CKEd1YXJkKVxuICAgIEIgLS0-IEMoSW50ZXJjZXB0b3IpXG4gICAgQyAtLT4gRChQaXBlcylcbiAgICBEIC0tPiBFW05lc3RKU11cbiAgIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)
### Interceptors

### Middlewares
Chặn request để can thiệp trước khi đến được Controller
```Typescript
import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';

@Middleware()
export class CorsMiddleware implements NestMiddleware {
    resolve(): ExpressMiddleware {
        return (req, res, next) => {
            // list os domains
            res.header('Access-Control-Allow-Origin', '*');
            // list of methods (e.g GET,HEAD,PUT,PATCH,POST,DELETE)
            res.header('Access-Control-Allow-Methods', '*');
            next();
        };
    }
}
```
### Observable vs Promise
**Promise** như là một lời hứa cho một dữ liệu, hành động được hoàn thành(hoặc bị lỗi) của một tác vụ bất đồng bộ và trả về kết quả của nó. Bất đồng bộ có nghĩa là sẽ hoàn thành sau, chứ không phải ngay lập tức và nó sẽ báo cho ta biết khi nó hoàn thành(hoặc bị lỗi).

Ví dụ: Vào một buổi sáng đẹp trời, bạn đang ngồi uống cafe và tự dưng đói bụng và muốn ăn gì đó. Bạn lên website order một ổ bánh mì tại một cửa hàng nào đó. Và cửa hàng thông báo khoảng 10 phút nữa sẽ giao bánh mì đến cho bạn. Như vậy, hành động làm một ổ bánh mì là một tác vụ bất đồng bộ, vì nó cần thời gian là khoảng 10 phút để hoàn thành. Cửa hàng đã cho bạn một Promise là khoảng 10 phút sau sẽ có bánh mì cho bạn. Sau đó, bạn vẫn tiếp tục nhiệm vụ của bạn là uống cà phê và chờ khi nào bành mì giao đến thì bạn sẽ nhận và thưởng thức. Bạn có thể thấy một Promise có 3 trạng thái sau: chờ-bạn chờ bánh mì giao đến(pending), hoàn thành-giao cho bạn xong(fulfilled), từ chối-không thể làm bánh mì cho bạn vì hết bánh mì(rejected).

**Observable** cũng có những tính năng của Promise và thêm một số ưu điểm khác. Nó như một ống dữ liệu(data stream), chúng ta có thể đẩy nhiều dữ liệu qua ống này. Observable là một khái niệm từ Reactive Programming. [RxJS](https://xgrommx.github.io/rx-book/content/guidelines/introduction/index.html) là một nền tảng xử lý những tác vụ bất đồng bộ thông qua những ống dữ liệu(data stream). Reactive hỗ trợ nhiều ngôn ngữ Java, .NET, … Trong đó có thư viện RxJS hỗ trợ data stream cho các async trong Javascript.

[Pipeline Patterns](https://www.youtube.com/watch?v=0EefbG6N3vY&ab_channel=TECHKNOW):
    * Break code into smaller and managable pieces.
    * Subject / CombineLatest / Grouping (have to concatAll() then toArray() at the end)
[Correct Angular app](https://www.youtube.com/watch?v=DAGrVyKR_P4&ab_channel=OasisDigital)

| Observables	| Promises |
| ----------- | ----------- |
| Trả về một hoặc nhiều giá trị | Chỉ trả về một giá trị duy nhất, đó có thể là object, array, number, … |
| Có thể cancel request với unsubscribe() | Không thể cancel được request |
| Chỉ được khởi tạo khỉ và chỉ khi có đăng ký đến observable đó (có listener) | Được khởi tạo ngay lập tức mặc dù chưa có bất kỳ đăng ký nào. Nó không quan tâm bạn đã đăng ký promise hay chưa, miễn là bạn khai báo một promise thì nó sẽ chạy constructor |
| Có các thao tác tiền xử lý dữ liệu như: filter, map, retry … | Không hỗ trợ hàm tác vụ nào |
| Thông báo lỗi đến subscribers | Đẩy lỗi cho promise con |

Observer is an object that can take 3 funcs next(), error() & complete()

### Pipe