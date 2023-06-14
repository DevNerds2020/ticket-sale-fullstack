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
	Address    sql.NullString `json:"address"`
	City       sql.NullString `json:"city"`
	State      sql.NullString `json:"state"`
	Zip        sql.NullString `json:"zip"`
	Country    sql.NullString `json:"country"`
	NationalID sql.NullString `json:"national_id"`
	PassportID sql.NullString `json:"passport_id"`
	BirthDate  sql.NullTime `json:"birth_date"`
	Gender     sql.NullString `json:"gender"`
	IsAdmin    sql.NullBool   `json:"is_admin"`
}
