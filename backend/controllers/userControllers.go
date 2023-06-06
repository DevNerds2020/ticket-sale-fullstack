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

	//see if user with id = UserID exists
	var user models.User
	err := db.QueryRow("SELECT id, username, password, email, created_at FROM users WHERE id = ?", UserID).Scan(&user.ID, &user.Username, &user.Password, &user.Email, &user.CreatedAt)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "bad request",
			"error":   "this user does not exist",
		})
		return
	}

	switch TicketType {
	case "airplane":
		//see if airplane with id = TicketID exists
		var airplaneTicket models.AirPlaneTicket
		err := db.QueryRow("SELECT * FROM airplane_tickets WHERE id = ?", TicketID).Scan(&airplaneTicket.ID, &airplaneTicket.Location, &airplaneTicket.Price, &airplaneTicket.DepartureDate, &airplaneTicket.ReturnDate, &airplaneTicket.NumOfGuest)
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
		err := db.QueryRow("SELECT * FROM train_tickets WHERE id = ?", TicketID).Scan(&trainTicket.ID, &trainTicket.Location, &trainTicket.Price, &trainTicket.DepartureDate, &trainTicket.ReturnDate, &trainTicket.NumOfGuest)
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
		err := db.QueryRow("SELECT * FROM hotel_tickets WHERE id = ?", TicketID).Scan(&hotelTicket.ID, &hotelTicket.Location, &hotelTicket.Price, &hotelTicket.StartDate, &hotelTicket.EndDate, &hotelTicket.NumOfGuest, &hotelTicket.NumOfRoom)
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

	// add ticket to user
	_, err = db.Exec("INSERT INTO tickets (user_id, ticket_type, ticket_id) VALUES (?, ?, ?)", UserID, TicketType, TicketID)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "bad request",
			"error":   "this ticket has already been added to this user",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
	})
}


func GetUserTickets(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	// Get the user ID from the request parameters
	id := c.Param("id")

	// Query the database for the user with the specified ID
	rows, err := db.Query("SELECT * FROM tickets WHERE user_id = $1", id)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// Loop through the rows and create User objects
	var tickets []models.Ticket
	for rows.Next() {
		var t models.Ticket
		err := rows.Scan(&t.ID, &t.UserID, &t.TicketType, &t.TicketID)
		if err != nil {
			log.Fatal(err)
		}
		tickets = append(tickets, t)
	}

	// Return the users as JSON
	c.JSON(http.StatusAccepted, tickets)
}