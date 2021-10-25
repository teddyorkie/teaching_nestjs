## Design Pattern trong NestJS
### Decorator
* @Next() ==> next
* @Session() ==> req.session
* @Param(key?: string) ==> req.params / req.params[key]
* @Body(key?: string) ==> req.body / req.body[key]
* @Query(key?: string) ==> req.query / req.query[key]
* @Headers(name?: string) ==> req.headers / req.headers[name]
* @Ip() ==> req.ip
* @HostParam() ==> req.hosts