package main

import (
	"database/sql"
	"ticketapi/database"
	"ticketapi/router"

	_ "github.com/lib/pq"
)

var db *sql.DB

func main() {
	database.DbConnect()
	db = database.GetDB()
	defer db.Close()
	router.RunRouter()
}
