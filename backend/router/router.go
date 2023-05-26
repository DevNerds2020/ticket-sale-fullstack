package router
import (
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"ticketapi/controllers"
)


func RunRouter(){
	// Initialize the Gin router
	r := gin.Default()

	// Define routes
	r.GET("/users", controllers.GetUsers)
	r.GET("/users/:id",  controllers.GetUser)
	r.POST("/users",  controllers.CreateUser)
	// r.POST("/login", login) 	
	// r.POST("/signUp", signUp)

	// any root other show error 404
	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})


	// Start the server
	r.Run()
}