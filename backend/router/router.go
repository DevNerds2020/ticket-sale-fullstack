package router

import (
	"sync"
	"ticketapi/controllers"
	"time"

	"github.com/gin-gonic/gin"
	middleware "github.com/s12i/gin-throttle"
)

func RateLimiter(maxRequests int, duration time.Duration) gin.HandlerFunc {
	var (
		mu      sync.Mutex
		counter = make(map[string]int)
	)

	return func(c *gin.Context) {
		ip := c.ClientIP()
		// now := time.Now()

		mu.Lock()
		defer mu.Unlock()

		if counter[ip] == 0 {
			counter[ip] = 1
			go func() {
				time.Sleep(duration)
				mu.Lock()
				defer mu.Unlock()
				counter[ip] = 0
			}()
		} else if counter[ip] < maxRequests {
			counter[ip]++
		} else {
			c.AbortWithStatusJSON(429, gin.H{"error": "rate limit exceeded"})
			return
		}

		c.Next()
	}
}

func RunRouter() {
	// Initialize the Gin router
	r := gin.Default()

	//http rate limit
	r.Use(RateLimiter(10, time.Minute)) // Limit to 10 requests per minute

	maxEventsPerSec := 1000
	maxBurstSize := 20
	r.Use(middleware.Throttle(maxEventsPerSec, maxBurstSize))

	// Define routes
	r.GET("/users", controllers.GetUsers)
	r.GET("/users/:id", controllers.GetUser)
	r.POST("/users", controllers.CreateUser)
	r.POST("/login", controllers.Login)
	r.POST("/register", controllers.Register)
	r.GET("/logintest", RequireAuth, controllers.LoginTest)

	// any root other show error 404
	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	// Start the server
	r.Run()
}
