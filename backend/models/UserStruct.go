package models
import (
	_"gorm.io/gorm"
)
type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Passwrod string `json:"password"`
	Email string `gorm:"unique" json:"email"`
	CreatedAt string `json:"created_at"`
}