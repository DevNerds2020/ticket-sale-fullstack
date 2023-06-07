package controllers

import (
	"log"
	"net/http"
	"os"
	"ticketapi/database"
	"ticketapi/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var db = database.GetDB()

	var body struct {
		Phone    string `json:"phone"`
		Password string `json:"password"`
		Email    string `json:"email"`
	}

	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{
			"message": "bad request",
		})
		return
	}

	var phone string = body.Phone
	var password string = body.Password
	var email string = body.Email

	// hash password
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		// log.Fatal(err)
		c.JSON(500, gin.H{
			"message": "error",
		})
		return
	}
	var u models.User
	u.Phone = phone
	u.Password = string(hash)
	u.Email = email

	// insert to database
	_, err = db.Exec("INSERT INTO users (username, phone, password, email) VALUES ($1, $2, $3, $4)", u.Phone, u.Phone, u.Password, u.Email)

	if err != nil {
		// log.Fatal(err)
		c.JSON(500, gin.H{
			"message":      "error",
			"errorMessage": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"message":  "success",
		"phone":    u.Phone,
		"password": u.Password,
		"email":    u.Email,
	})
}

func Login(c *gin.Context) {
	var db = database.GetDB()

	var body struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{
			"message": "bad request",
		})
		return
	}

	var username string = body.Username
	var password string = body.Password

	var hash, err = bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		log.Fatal(err)
		c.JSON(500, gin.H{
			"error": "error",
		})
		return
	}

	var u models.User
	u.Username = username
	u.Password = string(hash)

	// look for user in database where email or phone is equal to username
	row := db.QueryRow("SELECT id, username, password, email, created_at FROM users WHERE username = $1 OR email = $1", u.Username)
	//if user not found
	if err := row.Scan(&u.ID, &u.Username, &u.Password, &u.Email, &u.CreatedAt); err != nil {
		// log.Fatal(err)
		c.JSON(500, gin.H{
			"error": "user not found",
		})
		return
	}
	log.Println(u)

	// compare password
	err = bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	if err != nil {
		// log.Fatal(err)
		c.JSON(500, gin.H{
			"error": "wrong password",
		})
		return
	}

	// Generate a jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": u.Username,
		"password": u.Password,
		"exp":      time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))

	if err != nil {
		log.Fatal(err)
		c.JSON(500, gin.H{
			"message": "failed to generate token",
		})
		return
	}

	//The SameSite attribute is used to prevent certain types of cross-site request forgery (CSRF) attacks by specifying how cookies should be handled when making cross-site requests.
	c.SetSameSite(http.SameSiteNoneMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "/", "http://127.0.0.1:5173", false, true)
	c.JSON(200, gin.H{
		"message": "success",
		"user":    u,
	})
}

func Logout(c *gin.Context) {
	c.SetSameSite(http.SameSiteNoneMode)
	c.SetCookie("Authorization", "", 3600*24*30, "/", "http://127.0.0.1:5173", false, true)
	c.JSON(200, gin.H{
		"message": "success",
	})
}

func LoginTest(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "success in login test",
	})
}
