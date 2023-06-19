package controllers

import (
	"database/sql"
	"log"
	"net/http"
	"ticketapi/database"
	"ticketapi/models"

	"github.com/gin-gonic/gin"
)

func GetHotelTickets(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	var (
		tickets []models.HotelTicket
		ticket  models.HotelTicket
	)

	rows, err := db.Query("SELECT * FROM hotel_tickets")
	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		err = rows.Scan(&ticket.ID, &ticket.Location, &ticket.Price, &ticket.StartDate, &ticket.EndDate, &ticket.NumOfGuest, &ticket.NumOfRoom)
		if err != nil {
			log.Fatal(err)
		}

		tickets = append(tickets, ticket)
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   tickets,
	})
}

func GetAirPlaneTickets(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	var (
		tickets []models.AirPlaneTicket
		ticket  models.AirPlaneTicket
	)

	rows, err := db.Query("SELECT * FROM airplane_tickets")
	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		err = rows.Scan(&ticket.ID, &ticket.Location, &ticket.Price, &ticket.DepartureDate, &ticket.ReturnDate, &ticket.NumOfGuest)
		if err != nil {
			log.Fatal(err)
		}

		tickets = append(tickets, ticket)
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   tickets,
	})
}

func GetTrainTickets(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	var (
		tickets []models.TrainTicket
		ticket  models.TrainTicket
	)

	rows, err := db.Query("SELECT * FROM train_tickets")
	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		err = rows.Scan(&ticket.ID, &ticket.Location, &ticket.Price, &ticket.DepartureDate, &ticket.ReturnDate, &ticket.NumOfGuest)
		if err != nil {
			log.Fatal(err)
		}

		tickets = append(tickets, ticket)
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   tickets,
	})
}

func GetAllTickets(c *gin.Context) {
	var db *sql.DB = database.GetDB()

	var (
		airplaneTickets []models.AirPlaneTicket
		trainTickets    []models.TrainTicket
		hotelTickets    []models.HotelTicket
		airplaneTicket  models.AirPlaneTicket
		trainTicket     models.TrainTicket
		hotelTicket     models.HotelTicket
	)

	rows, err := db.Query("SELECT * FROM airplane_tickets")
	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		err = rows.Scan(&airplaneTicket.ID, &airplaneTicket.Location, &airplaneTicket.Price, &airplaneTicket.DepartureDate, &airplaneTicket.ReturnDate, &airplaneTicket.NumOfGuest, &airplaneTicket.OriginLocation)
		if err != nil {
			log.Println(err)
		}

		airplaneTickets = append(airplaneTickets, airplaneTicket)
	}

	rows, err = db.Query("SELECT * FROM train_tickets")
	if err != nil {
		log.Println(err)
	}

	for rows.Next() {
		err = rows.Scan(&trainTicket.ID, &trainTicket.Location, &trainTicket.Price, &trainTicket.DepartureDate, &trainTicket.ReturnDate, &trainTicket.NumOfGuest, &trainTicket.OriginLocation)
		if err != nil {
			log.Println(err)
		}

		trainTickets = append(trainTickets, trainTicket)
	}

	rows, err = db.Query("SELECT * FROM hotel_tickets")
	if err != nil {
		log.Println(err)
	}

	for rows.Next() {
		err = rows.Scan(&hotelTicket.ID, &hotelTicket.Location, &hotelTicket.Price, &hotelTicket.StartDate, &hotelTicket.EndDate, &hotelTicket.NumOfGuest, &hotelTicket.NumOfRoom)
		if err != nil {
			log.Println(err)
		}

		hotelTickets = append(hotelTickets, hotelTicket)
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data": gin.H{
			"airplane_tickets": airplaneTickets,
			"train_tickets":    trainTickets,
			"hotel_tickets":    hotelTickets,
		},
	})
}
