package main

import (
	"database/sql"
	"fmt"
	"log"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"ticketapi/models"
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
	r.POST("/login", login) 	
	r.POST("/signUp", signUp)

	// any root other show error 404
	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})


	// Start the server
	r.Run()
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
	c.JSON(200, users)
}

func getUser(c *gin.Context) {
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
	c.JSON(200, u)
}

func createUser(c *gin.Context) {
	// Get the user data from the request body
	var u models.User
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

func signUp(c *gin.Context){
	createUser(c)
}