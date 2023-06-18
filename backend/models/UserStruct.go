package models

import (
	"database/sql"

	_ "gorm.io/gorm"
)

type User struct {
	ID         int            `json:"id"`
	Username   string         `json:"username"`
	Password   string         `json:"password"`
	Email      string         `gorm:"unique" json:"email"`
	CreatedAt  string         `json:"created_at"`
	Phone      string         `json:"phone"`
	Name       sql.NullString `json"name"`
	Address    sql.NullString `json:"address"`
	City       sql.NullString `json:"city"`
	State      sql.NullString `json:"state"`
	Zip        sql.NullString `json:"zip"`
	Country    sql.NullString `json:"country"`
	NationalID sql.NullString `json:"national_id"`
	PassportID sql.NullString `json:"passport_id"`
	BirthDate  sql.NullString `json:"birth_date"`
	Gender     sql.NullString `json:"gender"`
	IsAdmin    sql.NullBool   `json:"is_admin"`
}

type UserResponse struct {
	ID         int    `json:"id"`
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
}
