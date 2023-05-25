package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"ticketapi/models"
)



func Login(c* gin.Context){
	var username string = c.Param("username")
	var password string = c.Param("password")

	row := db.QueryRow("SELECT * FROM users WHERE username = $1 AND password $2", username, password)

	var u models.User
	//all of the fields in user struct
	err := row.Scan(&u.ID, &u.Username, &u.Passwrod, &u.Email, &u.CreatedAt)
	if err != nil {
		log.Fatal(err)
	}

	// Return the user as JSON
	c.JSON(200, u)
}

// func signUp(c* gin.Context){
// 	// var phoneNumber string = c.Param("phonenumber")
// 	// var userName string = c.Param("username")
// 	// var password string = c.Param("password")
// 	//like create user
// }
