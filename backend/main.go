package main

import (
	"encoding/json"
	"net/http"
	"github.com/gorilla/mux"
)

//structs
type User struct {
	ID        string `json:"id"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Email     string `json:"email"`
	NationalID string `json:"nationalid"`
	PassPortID string `json:"passportid"`
	Phone     string `json:"phone"`
	Password  string `json:"password"`
}

type Ticket struct {
	ID        string `json:"id"`
	FlightID  string `json:"flightid"`
	SeatID    string `json:"seatid"`
	Price     string `json:"price"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Email     string `json:"email"`
	NationalID string `json:"nationalid"`
	PassPortID string `json:"passportid"`
	Phone     string `json:"phone"`
}

type Flight struct {
	ID        string `json:"id"`
	From      string `json:"from"`
	To        string `json:"to"`
	Departure string `json:"departure"`
	Arrival   string `json:"arrival"`
	Price     string `json:"price"`
}

type Train struct {
	ID        string `json:"id"`
	From      string `json:"from"`
	To        string `json:"to"`
	Departure string `json:"departure"`
	Arrival   string `json:"arrival"`
	Price     string `json:"price"`
}

type hotel struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Location  string `json:"location"`
	Price     string `json:"price"`
}

func helloworld(q http.ResponseWriter, r *http.Request) {
	q.Header().Set("Content-Type", "application/json")
	q.WriteHeader(http.StatusOK)
	json.NewEncoder(q).Encode("Hello World2")
}

func login(q http.ResponseWriter, r *http.Request) {
	q.Header().Set("Content-Type", "application/json")
	q.WriteHeader(http.StatusOK)
	json.NewEncoder(q).Encode("Login")
}


func main() {
	router := mux.NewRouter()

	router.HandleFunc("/", helloworld).Methods("GET")
	// router.HandleFunc("/users", getUsers).Methods("GET")
	// router.HandleFunc("/users/{id}", getUser).Methods("GET")
	// router.HandleFunc("/users", createUser).Methods("POST")
	// router.HandleFunc("/users/{id}", updateUser).Methods("PUT")
	// router.HandleFunc("/users/{id}", deleteUser).Methods("DELETE")
	router.HandleFunc("/users/login", login).Methods("POST")

	http.ListenAndServe(":5000", router)
}
