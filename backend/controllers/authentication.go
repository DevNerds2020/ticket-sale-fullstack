package controllers
import (
	"log"
	"github.com/gin-gonic/gin"
	"ticketapi/models"
	"ticketapi/database"
)

func login(c *gin.Context){
	var db = database.GetDB()

	var username string = c.Param("username")
	var password string = c.Param("password")

	row := db.QueryRow("SELECT * FROM users WHERE username = $1 AND password $2", username, password)

	var u models.User

	err := row.Scan(&u.ID, &u.Username, &u.Passwrod, &u.Email, &u.CreatedAt)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, u)
}