package internal

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

func GetWebPCIndexPosition(envFilePath ...string) string {
	var err error
	if len(envFilePath) == 0 {
		err = godotenv.Load()
	} else {
		err = godotenv.Load(envFilePath[0])
	}
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	return os.Getenv("WEB_PC_INDEX_POSITION")
}
