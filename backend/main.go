package main

import (
	"database/sql"
	"fmt"
	"log"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = ""
	dbname   = "ticketshop"
)

var db *sql.DB

func main() {
	// Connect to the database
	var err error
	db, err = sql.Open("postgres", fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Initialize the Gin router
	r := gin.Default()

	// Define routes
	r.GET("/users", getUsers)
	r.GET("/users/:id", getUser)
	r.POST("/users", createUser) 	
	// Start the server
	r.Run()
}

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Passwrod string `json:"password"`
	Email    string `json:"email"`
	CreatedAt string `json:"created_at"`
}

func getUsers(c *gin.Context) {
	// Query the database for all users
	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	fmt.Println("rows")
	fmt.Println(rows)
	fmt.Println("rows")

	// Loop through the rows and create User objects
	var users []User
	for rows.Next() {
		var u User
		err := rows.Scan(&u.ID, &u.Username, &u.Passwrod, &u.Email, &u.CreatedAt)
		if err != nil {
			log.Fatal(err)
		}
		users = append(users, u)
	}

	// Return the users as JSON
	c.JSON(200, users)
}

func getUser(c *gin.Context) {
	// Get the user ID from the request parameters
	id := c.Param("id")

	// Query the database for the user with the specified ID
	row := db.QueryRow("SELECT * FROM users WHERE id = $1", id)

	// Create a User object from the row
	var u User
	//all of the fields in user struct
	err := row.Scan(&u.ID, &u.Username, &u.Passwrod, &u.Email, &u.CreatedAt)
	if err != nil {
		log.Fatal(err)
	}

	// Return the user as JSON
	c.JSON(200, u)
}

func createUser(c *gin.Context) {
	// Get the user data from the request body
	var u User
	err := c.BindJSON(&u)
	if err != nil {
		log.Fatal(err)
	}

	// Insert the user into the database
	_, err = db.Exec("INSERT INTO users (username, email) VALUES ($1, $2)", u.Username, u.Email)
	if err != nil {
		log.Fatal(err)
	}

	// Return a success message
	c.JSON(200, gin.H{
		"message": "User created",
	})
}
