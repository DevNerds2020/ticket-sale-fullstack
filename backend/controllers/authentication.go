package controllers

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
	row := db.QueryRow("SELECT * FROM users WHERE username = $1 OR email = $1", u.Username)
	log.Println(row)
	//handle nullable fields

	// if user not found
	if err := row.Scan(&u.ID, &u.Username, &u.Password, &u.Email, &u.CreatedAt,
		&u.Gender, &u.Phone, &u.Address, &u.City, &u.State,
		&u.Zip, &u.Country, &u.NationalID, &u.PassportID,
		&u.BirthDate, &u.IsAdmin, &u.Name); err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"error": "user not found",
		})
		return
	}

	userResponse := models.UserResponse{
		ID:         u.ID,
		Name: 		u.Name.String,
		Username:   u.Username,
		Email:      u.Email,
		CreatedAt:  u.CreatedAt,
		Phone:      u.Phone,
		Address:    u.Address.String,
		City:       u.City.String,
		State:      u.State.String,
		Zip:        u.Zip.String,
		Country:    u.Country.String,
		NationalID: u.NationalID.String,
		PassportID: u.PassportID.String,
		BirthDate:  u.BirthDate.String,
		IsAdmin:    u.IsAdmin.Bool,
		Gender:     u.Gender.String,
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
		"user":    userResponse,
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

func RequireAuth(c *gin.Context) {
	var db = database.GetDB()

	//get the cookie from the request
	cookie, err := c.Cookie("Authorization")

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message":      "unauthorized no token",
			"errorMessage": err.Error(),
			"error_code":   http.StatusUnauthorized,
		})
		c.Abort()
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
				"message":    "unauthorized token expired",
				"error_code": http.StatusUnauthorized,
			})
			return
		}

		var username string = claims["username"].(string)
		var password string = claims["password"].(string)
		log.Println(password)

		if err != nil {
			c.JSON(500, gin.H{
				"message":    "error",
				"error_code": http.StatusUnauthorized,
			})
			c.Abort()
			return
		}

		var u models.User
		u.Username = username
		u.Password = password
		log.Println(u.Username)

		//check if the user exist
		var row = db.QueryRow("SELECT id, username, password, email, created_at, isadmin FROM users WHERE username = $1", u.Username)
		err = row.Scan(&u.ID, &u.Username, &u.Password, &u.Email, &u.CreatedAt, &u.IsAdmin)
		if err != nil {
			fmt.Println(err)
			c.JSON(http.StatusUnauthorized, gin.H{
				"message":    "unauthorized wrong username",
				"error_code": http.StatusUnauthorized,
			})
			c.Abort()
			return
		}

		if u.Password != password {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message":    "unauthorized wrong password",
				"error_code": http.StatusUnauthorized,
			})
			c.Abort()
			return
		}

		c.Set("user", u)

		c.Next()
	} else {
		fmt.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"message":    "unauthorized token invalid",
			"error_code": http.StatusUnauthorized,
		})
		return
	}
}

func RequireAdminAuth(c *gin.Context) {
	// Retrieve the user from the context set by RequireAuth middleware
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message":    "unauthorized user not found",
			"error_code": http.StatusUnauthorized,
		})
		c.Abort()
		return
	}

	// Type-assert the user as models.User
	u, ok := user.(models.User)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message":    "unauthorized user invalid",
			"error_code": http.StatusUnauthorized,
		})
		c.Abort()
		return
	}

	log.Println(u)

	// Check if the user is an admin
	if u.IsAdmin.Bool == true {
		c.Next()
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message":    "unauthorized user is not an admin",
			"error_code": http.StatusUnauthorized,
		})
		c.Abort()
		return
	}
}
