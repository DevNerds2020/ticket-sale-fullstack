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

// CORSMiddleware handles CORS headers
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "127.0.0.1:5173")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func RunRouter() {
	// Initialize the Gin router
	r := gin.Default()
	r.Use(CORSMiddleware())

	//http rate limit
	r.Use(RateLimiter(10, time.Minute)) // Limit to 10 requests per minute

	maxEventsPerSec := 1000
	maxBurstSize := 20
	r.Use(middleware.Throttle(maxEventsPerSec, maxBurstSize))

	// Define routes

	//user
	r.GET("/users", controllers.GetUsers)
	r.GET("/users/:id", controllers.GetUser)
	r.GET("/users/:id/tickets", controllers.GetUserTickets)
	r.POST("/users/tickets", controllers.AddTicketForUser)
	//TODO should have require auth but gets cross origin error
	r.PUT("/users/:id", controllers.UpdateUser)

	//authentication
	r.POST("/login", controllers.Login)
	r.POST("/register", controllers.Register)
	r.POST("/logout", controllers.Logout)
	r.GET("/logintest", RequireAuth, controllers.LoginTest)

	//tickets get
	r.GET("/tickets/hotel", RequireAuth, controllers.GetHotelTickets)
	r.GET("/tickets/airplane", RequireAuth, controllers.GetAirPlaneTickets)
	r.GET("/tickets/train", RequireAuth, controllers.GetTrainTickets)
	r.GET("/tickets/all", RequireAuth, controllers.GetAllTickets)

	// any root other show error 404
	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	// Start the server
	r.Run()
}
