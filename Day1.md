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
`nest new api` sẽ tạo ra cây thư mục với
* src: thư mục gốc của dự án.
* test: nơi chứa các file test e2e.
* nest-cli.json: cấu hình Nest CLI.
* tsconfig.json: cấu hình Typescript transpiler.
* install và import vào app.module.ts 2 modules @nestjs/config (để dùng file .env config) và /typeorm (for postgres)

then `npm run start:dev`

## RestAPI

## Controller
Mục đích chính của controllers là tiếp nhận các request cụ thể từ ứng dụng. Cơ chế routing sẽ chỉ định các controllers nào cần tiếp nhận và xử lý requests. Thông thường, mỗi controller sẽ có nhiều routes, mỗi routes chịu trách nhiệm xử lý các actions cụ thể.
`nest g resource <your-resource-name>`

### Routing
Bạn có thể khai báo một Controller bằng cách tạo một class kèm theo decorator **@Controller()**. Chúng ta cũng có thể group các controllers lại với nhau thông qua việc chỉ định optional path cho decorator @Controller. Điều này cũng sẽ giúp bạn giảm thiểu code lặp không cần thiết.
`nest g controller <your-controller-name>`

Nest cung cấp các một số decorators giúp thiết lập routing qua HTTP methods.

### HTTP methods
NestJS cung cấp các một số decorators giúp thiết lập routing qua HTTP methods.
* @Get() dùng để lấy dữ liệu.
* @Post() cơ bản là tạo mới thông tin.
* @Put() thường được dùng để cập nhật thông tin một bản ghi. Nên nhớ là nó sẽ thay thế bản ghi bằng nguyên cục data bạn truyền vào.
* @Patch() cũng được dùng để cập nhật thông tin. Nhưng khác ở chỗ, nó chỉ cập nhật một vài fields được yêu cầu thay vì toàn bộ.
* @Delete() xóa dữ liệu.
* @All() phương thức này chấp nhận mọi HTTP methods. 

### HTTP Status Code
Theo mặc định, repsonse code luôn luôn là 200, đối với các request POST là 201. Bạn có thể thay đổi nó một cách dễ dàng thông qua decorator @HttpCode(...)
```Typescript
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat'
}
```
### Headers
Để tùy chỉnh một Header, bạn có thể dùng decorator @Header()
```Typescript
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat'
}
```

Hoặc thông qua @Res()
```Typescript
@Post()
create(@Res() res) {
  res
    .header('Cache-Control', 'none')
    .send('This action adds a new cat')
}
```

### Redirect
Để redirect tới một URL cụ thể, bạn có thể sử dụng decorator @Redirect() hoặc thông qua @Res(), sau đó call trực tiếp res.redirect().

Decorator @Redirect() nhận 2 optional params là url: string và statusCode: number. Giá trị mặc định của statusCode là 302.
```Typescript
@Get()
@Redirect('https://www.techmaster.vn', 301)
```

Để thực hiện redirect một cách dynamic, bạn có thể sử dụng cách sau
```Typescript
@Get('docs')
@Redirect('https://docs.nestjs.com', 301)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/', statusCode: 301 }
  }
}
```

### Request scopes
Đối với một số bạn có nền tảng kiến thức từ một số ngôn ngữ lập trình khác (như PHP…), có thể họ sẽ khá bất ngờ khi mà hầu hết mọi thứ đều được “xài chung” trong các requests. Chúng ta có một cái connection tới database, một số singleton services được dùng toàn cục…

Hãy nhớ rằng, NodeJS không tuân theo mô hình **Multi-Threaded Stateless Model** (nơi mà mỗi yêu cầu được xử lý trên một thread riêng biệt). Do đó, việc sử dụng singleton hoàn toàn an toàn với Nest.
### Bất đồng bộ (Asynchronicity)
Hầu hết các công việc thao tác với dữ liệu hoặc hệ thống khác đều là bất đồng bộ. NestJS cũng hỗ trợ và hoạt động rất tốt với async.

Tất cả các async functions đều trả về một **Promise**. Nest sẽ tự giải quyết phần xử lý cho bạn.
```Typescript
@Get()
async findAll(): Promise<any[]> {
  return []
}
```

Ngoài ra, Nest còn hỗ trợ một framework xử lý bất đồng bộ cực kỳ mạnh mẽ – **RxJS** theo cơ chế **Observable** streams hiện đại. Nest sẽ tự động subscribe để lấy về giá trị cuối cùng khi stream completed.
```Typescript
@Get()
findAll(): Observable<any[]> {
  return of([])
}
```

### DTO (Data Transfer Object)
Là cách triển khai một design pattern rất phổ biến – Transfer Object Pattern. Chúng đơn giản là các object xác định kiểu dữ liệu sẽ được gửi đi hoặc nhận về, và có thể được serialize khi truyền qua mạng. Chúng không – và cũng không nên có các logic xử lý bên dưới.

Nest hỗ trợ chúng ta khai báo DTO qua interface hoặc các class. Tuy nhiên, mình khuyên các bạn hãy sử dụng class.
* Class là một phần trong chuẩn Javascript ES6. Do đó, chúng được giữ lại sau khi compiled.
* Trong khi đó interface chỉ là cú pháp của Typescript, chúng không tồn tại, và cũng sẽ bị xóa khỏi code Javascript sau khi compiled. Do đó, Nest không thể tham chiếu đến chúng trong lúc chạy.

Thêm một vài điểm nhấn quan trọng khi bạn sử dụng class:
* Rất dễ dàng thực hiện validate dữ liệu đầu cuối thông qua class-validator.
* Có thể transform dữ liệu thông qua các Pipes. Bởi class là tồn tại, do đó chúng ta có thể can thiệp vào các metadata của chúng trong thời gian chạy.
```Typescript
//create-cat.dto.ts
export class CreateCatDto {
  name: string
  age: number
  breed: string
}

//cats.controller.ts
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat'
}
```
Bạn cũng có thể thêm một vài validation như thế này
```Typescript
//create-cat.dto.ts
export class CreateCatDto {
  @IsNotEmpty()
  name: string

  @IsInt()
  @Optional()
  age: number

  @MinLength(5)
  breed: string
}
```