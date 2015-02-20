README for demo
==========================

set on application-dev.yml these properties :

```
server:
    address: LOCAL_ADDRESS (to your local address that your CAS can resolve)
    port: LOCAL_PORT (keep 8080)

app:
    service:
        home: http://LOCAL_ADDRESS:LOCAL_PORT/
        security: http://LOCAL_ADDRESS:LOCAL_PORT/j_spring_cas_security_check

cas:
    url:
        prefix: https://your.cas.domain/cas/
        login: https://your.cas.domain/cas/login
        logout: https://your.cas.domain/cas/logout

```

and do :
```
mvn spring-boot:run
```
go on http://LOCAL_ADDRESS:LOCAL_PORT/index.html#/
