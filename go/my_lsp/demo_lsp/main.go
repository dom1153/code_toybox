package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"
)

func main() {
	logger := getLogger(nil)
	logger.Println("Hey buddy, I started")
}

func getLogger(filename *string) *log.Logger {
	cwd, err := os.Getwd()
	if err != nil {
		panic("Could not get the current working directory")
	}
	if filename == nil {
		name := fmt.Sprintf("log_%s.log", time.Now().Format("2006-01-02"))
		filename = &name
	}
	log_path := filepath.Join(cwd, "logs", *filename)
	// make logs directory if it doesn't exist
	// check if the directory exists
	if _, err := os.Stat("logs"); os.IsNotExist(err) {
		// create the directory
		err := os.Mkdir("logs", os.ModePerm)
		if err != nil {
			panic("Could not create the logs directory")
		}
	}

	logFile, err := os.OpenFile(log_path, os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0666)
	if err != nil {
		panic("hey, you didn't give a good file bozzo")
	}

	return log.New(logFile, "[demo_lsp]", log.Ldate|log.Ltime|log.Lshortfile)
}
