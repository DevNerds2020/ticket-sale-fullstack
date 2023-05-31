# protecting the backend against SQL injection
i am using Parameterized Queries based on below resources 
https://go.dev/doc/database/sql-injection
https://www.stackhawk.com/blog/golang-sql-injection-guide-examples-and-prevention/

# Rate Limit HTTP Requests
gin is using rate limit http request by default but i have added another function for handling it customizable

# throttling HTTP Requests
"github.com/s12i/gin-throttle"
https://github.com/takeshiyu/gin-throttle
