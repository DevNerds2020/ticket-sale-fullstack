package router

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"ticketapi/database"
	"ticketapi/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func RequireAuth(c *gin.Context) {
	var db = database.GetDB()

	//get the cookie from the request
	cookie, err := c.Cookie("Authorization")

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message":      "unauthorized no token",
			"errorMessage": err.Error(),
		})
		return
	}

	//decode/validate the token
	token, err := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
		//make sure the token method conform to "SigningMethodHMAC"
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {

		//check if the token has expired
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "unauthorized token expired",
			})
			return
		}

		var username string = claims["username"].(string)
		var password string = claims["password"].(string)
		log.Println(password)

		if err != nil {
			log.Fatal(err)
			c.JSON(500, gin.H{
				"message": "error",
			})
			return
		}

		var u models.User
		u.Username = username
		u.Passwrod = password
		log.Println(u.Username)

		//check if the user exist
		var row = db.QueryRow("SELECT * FROM users WHERE username = $1", u.Username)
		err = row.Scan(&u.ID, &u.Username, &u.Passwrod, &u.Email, &u.CreatedAt)
		if err != nil {
			fmt.Println(err)
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "unauthorized wrong username",
			})
			return
		}

		if u.Passwrod != password {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "unauthorized wrong password",
			})
			return
		}

		c.Set("user", u)

		c.Next()
	} else {
		fmt.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized token invalid",
		})
		return
	}
}