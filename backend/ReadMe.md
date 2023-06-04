# protecting the backend against SQL injection
i am using Parameterized Queries based on below resources 
https://go.dev/doc/database/sql-injection
https://www.stackhawk.com/blog/golang-sql-injection-guide-examples-and-prevention/

# Rate Limit HTTP Requests
gin is using rate limit http request by default but i have added another function for handling it customizable

# throttling HTTP Requests
"github.com/s12i/gin-throttle"
https://github.com/takeshiyu/gin-throttle

# JWT key
https://www.sohamkamani.com/golang/jwt-authentication/


# What is GORM?
GORM is a Go library that enables developers to work with relational databases like MySQL, PostgreSQL, and SQLite in a simple and efficient way. It provides a lightweight interface that allows developers to easily write programs that access their database without having to write an abundance of repetitive code.