package models

import (
	_ "gorm.io/gorm"
)

type Gender string

const (
	Male   Gender = "male"
	Female Gender = "female"
	Other  Gender = "other"
)

type User struct {
	ID              int              `json:"id"`
	Username        string           `json:"username"`
	Passwrod        string           `json:"password"`
	Email           string           `gorm:"unique" json:"email"`
	CreatedAt       string           `json:"created_at"`
	Phone           string           `json:"phone"`
	Address         string           `json:"address"`
	City            string           `json:"city"`
	State           string           `json:"state"`
	Zip             string           `json:"zip"`
	Country         string           `json:"country"`
	NationalID      string           `json:"national_id"`
	PassportID      string           `json:"passport_id"`
	BirthDate       string           `json:"birth_date"`
	Gender          Gender           `json:"gender"`
	HotelTickets    []HotelTicket    `gorm:"foreignKey:UserID"`
	AirPlaneTickets []AirPlaneTicket `gorm:"foreignKey:UserID"`
	TrainTickets    []TrainTicket    `gorm:"foreignKey:UserID"`
}
