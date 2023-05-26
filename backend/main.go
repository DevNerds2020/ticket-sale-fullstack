package main

import (
	"database/sql"
	"log"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"ticketapi/models"
	"ticketapi/database"
	"ticketapi/router"
)



var db *sql.DB 



func main() {
	database.DbConnect()
	db = database.GetDB()
	defer db.Close()

	router.RunRouter()
}

func getUserTickets(c *gin.Context){

}

func deleteUserTicket(c *gin.Context){

}

func addUserTicket(c *gin.Context){
	var ticketType string = c.PostForm("type")

	switch ticketType {
	case "hotel":
	case "train":
	case "airplane":
	default:
		c.AbortWithStatusJSON(400, gin.H{"message": "Invalid ticket type"})
		return
	}
}

func login(c *gin.Context){
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