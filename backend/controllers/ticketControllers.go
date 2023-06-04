package controllers

import (
	"database/sql"
	"log"
	"net/http"
	"ticketapi/database"
	"ticketapi/models"

	"github.com/gin-gonic/gin"
)

func AddHotelTicket(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	var body struct {
		UserID     int    `json:"user_id"`
		StartDate  string `json:"start_date"`
		EndDate    string `json:"end_date"`
		NumOfGuest int    `json:"num_of_guest"`
		NumOfRoom  int    `json:"num_of_room"`
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})
		return
	}

	var userID int = body.UserID
	var startDate string = body.StartDate
	var endDate string = body.EndDate
	var numOfGuest int = body.NumOfGuest
	var numOfRoom int = body.NumOfRoom

	var ht models.HotelTicket

	ht.UserID = userID
	ht.StartDate = startDate
	ht.EndDate = endDate
	ht.NumOfGuest = numOfGuest
	ht.NumOfRoom = numOfRoom

	// Insert the user into the database
	_, err := db.Exec("INSERT INTO hotel_tickets (user_id, hotel_id, start_date, end_date, num_of_guest, num_of_room) VALUES ($1, $2, $3, $4, $5, $6)", ht.UserID, ht.StartDate, ht.EndDate, ht.NumOfGuest, ht.NumOfRoom)
	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message":      "error",
			"errorMessage": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "success",
		"user_id":      ht.UserID,
		"start_date":   ht.StartDate,
		"end_date":     ht.EndDate,
		"num_of_guest": ht.NumOfGuest,
	})
}

func AddTrainTicket(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	var body struct {
		UserID        int    `json:"user_id"`
		DepartureDate string `json:"departure_date"`
		ReturnDate    string `json:"return_date"`
		NumOfGuest    int    `json:"num_of_guest"`
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})
		return
	}

	var userID int = body.UserID
	var departureDate string = body.DepartureDate
	var returnDate string = body.ReturnDate
	var numOfGuest int = body.NumOfGuest

	var tt models.TrainTicket

	tt.UserID = userID
	tt.DepartureDate = departureDate
	tt.ReturnDate = returnDate
	tt.NumOfGuest = numOfGuest

	// Insert the user into the database
	_, err := db.Exec("INSERT INTO train_tickets (user_id, departure_date, return_date, num_of_guest) VALUES ($1, $2, $3, $4)", tt.UserID, tt.DepartureDate, tt.ReturnDate, tt.NumOfGuest)
	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message":      "error",
			"errorMessage": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":        "success",
		"user_id":        tt.UserID,
		"departure_date": tt.DepartureDate,
		"return_date":    tt.ReturnDate,
		"num_of_guest":   tt.NumOfGuest,
	})
}

func AddAirPlaneTicket(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	var body struct {
		UserID        int    `json:"user_id"`
		DepartureDate string `json:"departure_date"`
		ReturnDate    string `json:"return_date"`
		NumOfGuest    int    `json:"num_of_guest"`
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})
		return
	}

	var userID int = body.UserID
	var departureDate string = body.DepartureDate
	var returnDate string = body.ReturnDate
	var numOfGuest int = body.NumOfGuest

	var apt models.AirPlaneTicket

	apt.UserID = userID
	apt.DepartureDate = departureDate
	apt.ReturnDate = returnDate
	apt.NumOfGuest = numOfGuest

	// Insert the user into the database
	_, err := db.Exec("INSERT INTO air_plane_tickets (user_id, departure_date, return_date, num_of_guest) VALUES ($1, $2, $3, $4)", apt.UserID, apt.DepartureDate, apt.ReturnDate, apt.NumOfGuest)
	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message":      "error",
			"errorMessage": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":        "success",
		"user_id":        apt.UserID,
		"departure_date": apt.DepartureDate,
		"return_date":    apt.ReturnDate,
		"num_of_guest":   apt.NumOfGuest,
	})
}
