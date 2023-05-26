package database
import (
	"database/sql"
	"fmt"
	"ticketapi/utils"
	"log"
)


var db *sql.DB


func DbConnect(){
	// Connect to the database
	var err error
	db, err = sql.Open("postgres", fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		utils.Host, utils.Port, utils.User, utils.Password, utils.DBname))
	if err != nil {
		log.Fatal(err)
	}
}

func GetDB() *sql.DB {
    return db
}