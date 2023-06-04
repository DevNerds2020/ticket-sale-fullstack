package controllers

import (
	"database/sql"
	"log"
	"net/http"
	"ticketapi/database"
	"ticketapi/models"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func GetUsers(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	// Query the database for all users
	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// Loop through the rows and create User objects
	var users []models.User
	for rows.Next() {
		var u models.User
		err := rows.Scan(&u.ID, &u.Username, &u.Passwrod, &u.Email, &u.CreatedAt)
		if err != nil {
			log.Fatal(err)
		}
		users = append(users, u)
	}

	// Return the users as JSON
	c.JSON(http.StatusAccepted, users)
}

func GetUser(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	// Get the user ID from the request parameters
	id := c.Param("id")

	// Query the database for the user with the specified ID
	row := db.QueryRow("SELECT * FROM users WHERE id = $1", id)

	// Create a User object from the row
	var u models.User
	//all of the fields in user struct
	err := row.Scan(&u.ID, &u.Username, &u.Passwrod, &u.Email, &u.CreatedAt)
	if err != nil {
		log.Fatal(err)
	}

	// Return the user as JSON
	c.JSON(http.StatusAccepted, u)
}