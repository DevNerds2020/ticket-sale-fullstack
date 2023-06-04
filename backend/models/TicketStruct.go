package models

type HotelTicket struct {
	ID         int    `json:"id"`
	Location   string `json:"location"`
	Price      int    `json:"price"`
	StartDate  string `json:"start_date"`
	EndDate    string `json:"end_date"`
	NumOfGuest int    `json:"num_of_guest"`
	NumOfRoom  int    `json:"num_of_room"`
	UserID     int    `json:"user_id"`
}

type TrainTicket struct {
	ID            int    `json:"id"`
	Location      string `json:"location"`
	Price         int    `json:"price"`
	DepartureDate string `json:"departure_date"`
	ReturnDate    string `json:"arrival_date"`
	NumOfGuest    int    `json:"num_of_guest"`
	UserID        int    `json:"user_id"`
}

type AirPlaneTicket struct {
	ID            int    `json:"id"`
	Location      string `json:"location"`
	Price         int    `json:"price"`
	DepartureDate string `json:"departure_date"`
	ReturnDate    string `json:"arrival_date"`
	NumOfGuest    int    `json:"num_of_guest"`
	UserID        int    `json:"user_id"`
}
