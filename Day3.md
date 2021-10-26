## Các thành phần chi tiết
[Tham khảo](https://auth0.com/blog/nestjs-brings-typescript-to-nodejs-and-express/)

### Module
### Controller
### Component
Có thể *Service* hoặc *Repository*
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
