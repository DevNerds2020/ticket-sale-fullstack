package controllers

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"
	"ticketapi/database"
	"ticketapi/models"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func GetUsers(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	// Query the database for all users
	rows, err := db.Query("SELECT id, username, password, email, created_at FROM users")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// Loop through the rows and create User objects
	var users []models.User
	for rows.Next() {
		var u models.User
		err := rows.Scan(&u.ID, &u.Username, &u.Password, &u.Email, &u.CreatedAt)
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
	err := row.Scan(&u.ID, &u.Username, &u.Password, &u.Email, &u.CreatedAt)
	if err != nil {
		log.Fatal(err)
	}

	// Return the user as JSON
	c.JSON(http.StatusAccepted, u)
}

func AddTicketForUser(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	var body struct {
		UserID     int    `json:"user_id"`
		TicketType string `json:"ticket_type"`
		TicketID   int    `json:"ticket_id"`
	}

	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{
			"message": "bad request",
		})
		return
	}

	var UserID int = body.UserID
	var TicketType string = body.TicketType
	var TicketID int = body.TicketID

	// log.Printf("UserID: %d, TicketType: %s, TicketID: %d", UserID, TicketType, TicketID)

	//see if user with id = UserID exists
	var user models.User
	err := db.QueryRow("SELECT id, username, password, email, created_at FROM users WHERE id = $1", UserID).Scan(&user.ID, &user.Username, &user.Password, &user.Email, &user.CreatedAt)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "bad request",
			"error":   err.Error(),
		})
		return
	}

	switch TicketType {
	case "airplane":
		//see if airplane with id = TicketID exists
		var airplaneTicket models.AirPlaneTicket
		err := db.QueryRow("SELECT * FROM airplane_tickets WHERE id = $1", TicketID).Scan(&airplaneTicket.ID, &airplaneTicket.Location, &airplaneTicket.Price, &airplaneTicket.DepartureDate, &airplaneTicket.ReturnDate, &airplaneTicket.NumOfGuest, &airplaneTicket.OriginLocation)
		if err != nil {
			c.JSON(400, gin.H{
				"message": "bad request",
				"error":   "this airplane ticket does not exist",
			})
			return
		}
	case "train":
		//see if train with id = TicketID exists
		var trainTicket models.TrainTicket
		err := db.QueryRow("SELECT * FROM train_tickets WHERE id = $1", TicketID).Scan(&trainTicket.ID, &trainTicket.Location, &trainTicket.Price, &trainTicket.DepartureDate, &trainTicket.ReturnDate, &trainTicket.NumOfGuest, &trainTicket.OriginLocation)
		if err != nil {
			c.JSON(400, gin.H{
				"message": "bad request",
				"error":   "this train ticket does not exist",
			})
			return
		}
	case "hotel":
		//see if hotel with id = TicketID exists
		var hotelTicket models.HotelTicket
		err := db.QueryRow("SELECT * FROM hotel_tickets WHERE id = $1", TicketID).Scan(&hotelTicket.ID, &hotelTicket.Location, &hotelTicket.Price, &hotelTicket.StartDate, &hotelTicket.EndDate, &hotelTicket.NumOfGuest, &hotelTicket.NumOfRoom)
		if err != nil {
			c.JSON(400, gin.H{
				"message": "bad request",
				"error":   "this hotel ticket does not exist",
			})
			return
		}
	default:
		c.JSON(400, gin.H{
			"message": "bad request",
			"error":   "invalid ticket type",
		})
		return
	}

	//get current date
	ticketDate := time.Now().Format("2006-01-02")

	// add ticket to user
	_, err = db.Exec("INSERT INTO tickets (user_id, ticket_type, ticket_id, ticket_date) VALUES ($1, $2, $3, $4)", user.ID, TicketType, TicketID, ticketDate)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "bad request",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
	})
}

func DeleteUserTicket(c *gin.Context){
	var db *sql.DB = database.GetDB()

	// Get the user ID from the request parameters string to int
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{
			"message": "bad request",
			"error":   err.Error(),
		})
		return
	}

	// Get the ticket ID from the request parameters string to int
	ticketID, err := strconv.Atoi(c.Param("ticketID"))
	if err != nil {
		c.JSON(400, gin.H{
			"message": "bad request",
			"error":   err.Error(),
		})
		return
	}

	// Delete the ticket with the specified ID
	_, err = db.Exec("DELETE FROM tickets WHERE user_id = $1 AND id = $2", id, ticketID)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "bad request",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
	})
}

func GetUserTickets(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	// Get the user ID from the request parameters string to int
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{
			"message": "bad request",
			"error":   err.Error(),
		})
		return
	}

	// Query the database for the user with the specified ID
	rows, err := db.Query("SELECT * FROM tickets WHERE user_id = $1", id)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "bad request",
			"error":   err.Error(),
		})
		return
	}
	defer rows.Close()
	//send the tickets as json
	var tickets []models.Ticket
	for rows.Next() {
		var t models.Ticket
		err := rows.Scan(&t.ID, &t.TicketType, &t.UserID, &t.TicketID, &t.TicketDate)
		if err != nil {
			c.JSON(400, gin.H{
				"message": "bad request",
				"error":   err.Error(),
			})
			return
		}
		tickets = append(tickets, t)
	}

	// Return the users as JSON
	c.JSON(http.StatusAccepted, tickets)

}

func UpdateUser(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	// Get the user ID from the request parameters
	id := c.Param("id")

	var body struct {
		Name       string `json:"name"`
		Username   string `json:"username"`
		Email      string `json:"email"`
		CreatedAt  string `json:"created_at"`
		Phone      string `json:"phone"`
		Address    string `json:"address"`
		City       string `json:"city"`
		State      string `json:"state"`
		Zip        string `json:"zip"`
		Country    string `json:"country"`
		NationalID string `json:"national_id"`
		PassportID string `json:"passport_id"`
		BirthDate  string `json:"birth_date"`
		Gender     string `json:"gender"`
		IsAdmin    bool   `json:"is_admin"`
		ID         int    `json:"id"`
	}

	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{
			"message": "bad request body not match",
		})
		return
	}

	// Update the user in the database
	_, err := db.Exec("UPDATE users SET username = $1, email = $2, created_at = $3, phone = $4, address = $5, city = $6, state = $7, zip = $8, country = $9, national_id = $10, passport_id = $11, birth_date = $12, gender = $13, isadmin = $14, name=$15 WHERE id = $16",
		body.Username, body.Email, body.CreatedAt, body.Phone, body.Address, body.City, body.State, body.Zip, body.Country, body.NationalID, body.PassportID, body.BirthDate, body.Gender, body.IsAdmin, body.Name, id)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "bad request",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
	})
}
