package main

import (
	"database/sql"
	_"github.com/lib/pq"
	"ticketapi/database"
	"ticketapi/router"
)



var db *sql.DB 



func main() {
	database.DbConnect()
	db = database.GetDB()
	defer db.Close()

	router.RunRouter()
}