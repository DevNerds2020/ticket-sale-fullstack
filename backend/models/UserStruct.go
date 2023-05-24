package models

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Passwrod string `json:"password"`
	Email    string `json:"email"`
	CreatedAt string `json:"created_at"`
}