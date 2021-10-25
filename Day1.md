## Giới thiệu
NestJS là sự kết hợp tốt nhất cho thiết kế lập trình hướng đối tượng (OOP) và phản ứng chức năng (FRP). 
Do đó, nó có khả năng tăng gấp đôi năng suất làm việc của developers cũng như hiệu suất ứng dụng, 
đồng thời giúp tiết kiệm nhiều thời gian quý báu.

### Các tính năng nổi bật
* Được xây dựng hoàn toàn trên Typescript, tuy nhiên ai rảnh cũng có thể dùng Javascript thuần nếu muốn.
* Kiến trúc module hóa hoàn toàn, giúp giảm thiểu sự phụ thuộc lẫn nhau cùng khả năng tái sử dụng code dễ dàng hơn.
* Ứng dụng mô hình MVC truyền thống kèm theo Dependency Injection cực kỳ thân thiện cho các developers đã từng biết Angular ^_^.
* Cung cấp một hệ sinh thái modules có sẵn cho bạn. Cái gì bạn cần, nó đều có. Cái gì nó không có ư? Ok, nó cung cấp các methods giúp bạn sử dụng hầu hết các NodeJS packages khác.
    * GraphQL
    * Web Sockets
    * Redis
    * RabbitMQ
    * Kafka
Dễ dàng tích hợp với các framework khác như Express và Fastify.
Đây là những thứ mình cực kỳ thích ở NestJS. Thứ bạn cần quan tâm là business logic và code sao cho đúng chuẩn, còn Infrastructure đã có người khác lo.

### Bắt đầu
`nest new gaubi_portfolio` sẽ tạo ra cây thư mục với
* src: thư mục gốc của dự án.
* test: nơi chứa các file test e2e.
* nest-cli.json: cấu hình Nest CLI.
* tsconfig.json: cấu hình Typescript transpiler.

then `npm run start`

## RestAPI

## Controller
Mục đích chính của controllers là tiếp nhận các request cụ thể từ ứng dụng. Cơ chế routing sẽ chỉ định các controllers nào cần tiếp nhận và xử lý requests. Thông thường, mỗi controller sẽ có nhiều routes, mỗi routes chịu trách nhiệm xử lý các actions cụ thể.
`nest g resource <your-resource-name>`

### Routing
Bạn có thể khai báo một Controller bằng cách tạo một class kèm theo decorator **@Controller()**. Chúng ta cũng có thể group các controllers lại với nhau thông qua việc chỉ định optional path cho decorator @Controller. Điều này cũng sẽ giúp bạn giảm thiểu code lặp không cần thiết.
`nest g controller <your-controller-name>`

Nest cung cấp các một số decorators giúp thiết lập routing qua HTTP methods.

### HTTP methods
Nest cung cấp các một số decorators giúp thiết lập routing qua HTTP methods.
@Get() dùng để lấy dữ liệu.
@Post() cơ bản là tạo mới thông tin.
@Put() thường được dùng để cập nhật thông tin một bản ghi. Nên nhớ là nó sẽ thay thế bản ghi bằng nguyên cục data bạn truyền vào.
@Patch() cũng được dùng để cập nhật thông tin. Nhưng khác ở chỗ, nó chỉ cập nhật một vài fields được yêu cầu thay vì toàn bộ.
@Delete() xóa dữ liệu.
@All() phương thức này chấp nhận mọi HTTP methods. 