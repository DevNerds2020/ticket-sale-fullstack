package models

import "time"

type HotelTicket struct {
	ID         int    `json:"id"`
	Location   string `json:"location"`
	Price      int    `json:"price"`
	StartDate  string `json:"start_date"`
	EndDate    string `json:"end_date"`
	NumOfGuest int    `json:"num_of_guest"`
	NumOfRoom  int    `json:"num_of_room"`
}

type TrainTicket struct {
	ID            int    `json:"id"`
	Location      string `json:"location"`
	Price         int    `json:"price"`
	DepartureDate string `json:"departure_date"`
	ReturnDate    string `json:"arrival_date"`
	NumOfGuest    int    `json:"num_of_guest"`
}

type AirPlaneTicket struct {
	ID            int    `json:"id"`
	Location      string `json:"location"`
	Price         int    `json:"price"`
	DepartureDate string `json:"departure_date"`
	ReturnDate    string `json:"arrival_date"`
	NumOfGuest    int    `json:"num_of_guest"`
}

type Ticket struct {
	ID         int       `json:"id"`
	TicketType string    `json:"ticket_type"`
	UserID     int       `json:"user_id"`
	TicketID   int       `json:"ticket_id"`
	TicketDate time.Time `json:"ticket_date"`
}
