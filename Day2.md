## Design Pattern trong [NestJS](https://duypt.dev/cac-design-pattern-can-biet-khi-lam-viec-voi-nestjs/)

### Singleton
Singleton là một trong những DP nổi tiếng nhất trong giới lập trình. Về cơ bản, bạn sẽ sử dụng DP này khi bạn cần giới hạn lại số lượng instances của một class nào đó.

Việc khởi tạo cũng khá đơn giản.
* Tạo một class với private constructor().
* Khai báo một phương thức static. Phương thức này sẽ tạo mới instance nếu chưa tồn tại, sau đó sẽ trả về một instance của class.

DP này thường được sử dụng cùng với một số DP khác như Abstract Factory Pattern hoặc Builder Pattern. Bạn cũng có thể sử dụng nó trong Facades Pattern – đảm bảo chỉ duy nhất 1 class được khởi tạo lúc runtime.
```Typescript
class MySingleton {
  private static instance: MySingleton

  private constructor() {}

  static instance() {
    if (!this.instance) {
      this.instance = new MySingleton()
    }

    return this.instance
  }
}

console.log(MySingleton.instance() === MySingleton.instance()) // true

new MySingleton() // throw exception
```

### Decorator
Decorator là một cách khai báo đặc biệt để có thể được đính kèm một số metadata khi khai báo các class, method, accessor, property hoặc các parameter. Decorator sử dụng từ khóa @expression, trong đó expression là tên một function sẽ được gọi khi runtime với thông tin được khai báo trong decorator.

| Nest      | Express |
| ----------- | ----------- |
| @Next()      | next       |
| @Session()   | req.session        |
| @Param(key?: string) | req.params / req.params[key] |
| @Body(key?: string) | req.body / req.body[key] |
| @Query(key?: string) | req.query / req.query[key] |
| @Headers(name?: string) | req.headers / req.headers[name] |
| @Ip() | req.ip |
| @HostParam() | req.hosts |

#### Multiple decorators
Chúng ta có thể khai báo multiple decorators cho đối tượng. Có 2 cách để triển khai như sau:
* Trên cùng một hàng. Các decorator sẽ được dịch tuần tự từ trái qua phải. 
* Trên nhiều hàng. Các decorator sẽ được dịch tuần tự từ trên xuống dưới. 

### Fluent Interface
Rất thường được sử dụng trong một số ORM như TypeORM, Sequelize,…

Lợi ích chủ yếu của nó là giúp code của bạn dễ đọc, dễ hiểu, cũng như liền mạch hơn. 

Cách triển khai cũng khá đơn giản. Ví dụ bạn có một class kèm theo một số methods khác nhau. Lúc này, các methods builder bạn sẽ return this sau khi thực hiện logic – điều này giúp bạn có thể tiếp tục chuỗi phương thức mà không cần sang dòng code mới. Chuỗi phương thức sẽ kết thúc khi chạm tới một method không return this.
```Typescript
class Pet {
  private _type: string | null

  private _name: string | null

  private _age: number | null

  private _legs: number | null

  type(value: string) {
    this._type = value

    return this
  }

  name(value: string) {
    this._name = value

    return this
  }

  age(value: number) {
    this._age = value

    return this
  }

  legs(value: number) {
    this._legs = value

    return this
  }

  getInfo(): string {
    return `Your ${this._type} ${this._name} - ${this._age} year(s) old - has ${this._legs} legs`
  }
}

const newPet = new Pet().type('dog').name('Mina').age(3).legs(4)

console.log(newPet.getInfo()) // Your dog Mina - 3 year(s) old - has 4 legs
```

### MVC – Model View Controller
DP này quá nổi tiếng rồi. Về cơ bản là nó chia ứng dụng thành 3 phần:

* **Model** chịu trách nhiệm xử lý business logic, thao tác dữ liệu…
* **View** chịu trách nhiệm xử lý và hiển thị nội dung cho client.
* **Controller** chịu trách nhiệm tiếp nhận request và điều hướng xuống Model xử lý logic, sau đó đem kết quả từ Model truyền sang View.

### Dependency Inversion Principle (DIP)
DIP – nguyên lý đảo ngược thành phần phụ thuộc – là một phần trong IoC – nó tập trung vào việc giảm sự phụ thuộc lẫn nhau giữa các class. 

Modules cấp cao là những modules phụ thuộc vào các modules khác.

Các modules cấp cao không nên phụ thuộc vào các module cấp thấp. Nếu có sự phụ thuộc lẫn nhau, bạn nên tạo ra một *Abstraction* nằm giữa chúng.
*Abstraction* không nên phụ thuộc vào các tính năng chi tiết. Các tính năng chi tiết cần phụ thuộc vào Abstraction.
```Typescript
class RepositoryFactory {
  static getCatRepository(): CatRepository {
    return new CatRepository()
  }
}

class CatRepository {
  public getCatName(id: number | string): string {
    return 'Mina' // we should get it from Database in real world
  }
}

class CatBusinessLogic {
  protected readonly dataAccess: CatRepository
  
  constructor() {
    this.dataAccess = RepositoryFactory.getCatRepository()
  }
  
  getCatName(id: number | string): string {
    return this.dataAccess.getCatName(id)
  }
}
```
Trong ví dụ trên, chúng ta sử dụng Factory Pattern để triển khai IoC. Tuy nhiên, class CatService lại sử dụng class CatRepository cụ thể. Mặc dù chúng ta đã sử dụng Factory để đẩy việc khởi tạo class sang một nơi khác, class CatService và CatRepository vẫn kết hợp chặt chẽ với nhau.

CatService phụ thuộc vào CatRepository, do đó CatBusinessLogic là module cấp cao. Cách triển khai ở trên vi phạm quy tắc thứ nhất của DIP. Thay vào đó, chúng ta cần triển khai một Abstraction giữa chúng.

Abstraction (tính trừu tượng) và Encapsulation (tính đóng gói) là một trong những quy tắc quan trọng trong OOP. Ở đây mình sẽ khai báo một abstract class (bạn cũng có thể sử dụng interface nếu muốn). 
```Typescript
abstract class AbstractCatRepository {
  abstract getCatName(id: number | string): string;
}
```
Lúc này, CatRepository sẽ extends từ AbstractCatRepository, và RepositoryFactory cũng trả về AbstractCatRepository.
```Typescript
class RepositoryFactory {
  static getCatRepository(): AbstractCatRepository {
    return new CatRepository()
  }
}

class CatRepository extends AbstractCatRepository {
  ...
}

class CatBusinessLogic {
  protected readonly dataAccess: AbstractCatRepository
  ...
}
```
Lúc này, chúng ta đã loại bỏ sự phụ thuộc lẫn nhau giữa CatRepository và CatBusinessLogic. Chúng chỉ có một mối quan hệ mờ nhạt với nhau thông qua một lớp abstract. 

Vì không còn phụ thuộc lẫn nhau nên nó giúp chúng ta dễ dàng thay đổi data source mà không phải sửa code quá nhiều. Hôm nay bạn dùng MySQL, mai bạn có thể chuyển sang MongoDB. Rảnh nữa thì ngày mốt bạn xài Firebase…

Mỗi lần cần thay đổi data source, bạn chỉ cần tạo thêm các class tương ứng, rồi cập nhật lại Factory là xong ^_^.

### Dependency Injection
DI – (Dependency Injection) là một DP được sử dụng để triển khai IoC. Nó chuyển việc khởi tạo các thành phần liên quan (Service) ra bên ngoài phạm vi đối tượng cần khởi tạo (Client), sau đó cung cấp chúng cho Client.

Mô hình DI phân các đối tượng làm 3 loại như sau:

* Client (hay dependent class – lớp phụ thuộc) – là các class phụ thuộc vào Service.
* Service (hay dependency) – là các class cung cấp Service cho Client.
* Injector – là nơi chịu trách nhiệm xử lý và truyền (inject) các Service vào Client.

![dependency-injection.png](https://duypt.dev/wp-content/uploads/2021/08/dependency-injection.png)

Theo như bạn có thể thấy, Injector sẽ tạo ra các instances của Service, sau đó inject các instances này vào Client. Theo đó, nó loại bỏ các controls không cần thiết (ở đây là việc khởi tạo các Service liên quan) ra khỏi Client.

Đây là một thành phần cực kỳ quan trọng trong SOLID principle. DI đảm bảo nguyên tắc đơn nhiệm (SRP) trong lập trình phần mềm.

Có một số cách để Injector inject Service vào cho Client.

* Constructor injection
* Property injection
* Method injection

Theo ví dụ phía trên, ta sẽ sửa lại như sau:
```Typescript
class CatBusinessLogic {
  constructor(private readonly dataAccess: AbstractCatRepository) {
  }

  getCatName(id: number | string): string {
    return this.dataAccess.getCatName(id)
  }
}
```
Sau đó thêm vào một Service như sau
```Typescript
class CatService {
  private readonly catBusinessLogic: CatBusinessLogic

  constructor() {
    this.catBusinessLogic = new CatBusinessLogic(
      RepositoryFactory.getCatRepository()
    )
  }

  getCatName(id: number | string): string {
    return this.catBusinessLogic.getCatName(id)
  }
}
```
Một số điểm đáng chú ý:

* CatService khởi tạo và inject instance CatRepository vào CatBusinessLogic thông qua Factory.
* CatBusinessLogic không cần phải khởi tạo instance của CatRepository qua Factory nữa.

Dựa theo đó, mối liên kết trực tiếp giữa CatBusinessLogic và CatRepository thông qua Factory đã bị loại bỏ hoàn toàn.
Tuy nhiên, việc đẻ thêm một class CatService cũng như khởi tạo instance CatBusinessLogic trông lại khá stupid? CatService lại bị phụ thuộc vào CatBusinessLogic =)))

Đây là lúc bạn cần đến một thứ khác – IoC Container.

### IoC Container – (DI Container)
IoC Container khởi tạo một instance của Client, đồng thời inject toàn bộ Service vào Client một cách tự động thông qua constructor, property hoặc method trong quá trình khởi chạy.

IoC Container thực hiện DI một cách tự động, nhờ đó chúng ta không cần phải tạo và quản lý các đối tượng một cách thủ công.

Các thành phần cơ bản của IoC Container

* Register: bạn cần hướng dẫn cho IoC Container cách khởi tạo các Service (dependency) cụ thể. Lúc này, IoC * Container sẽ biết cách xử lý khi gặp các Service này thông qua type mapping (hoặc token).
* Resolve: IoC Container sẽ dựa vào các thông tin mà bạn Register để khởi tạo các instances tương ứng với từng type được chỉ định, sau đó inject chúng vào Client.
* Disgose: Hầu hết các IoC Container đều có các phương thức riêng để xử lý vòng đời (lifecycle) của Service, và loại bỏ chúng khi cần thiết.