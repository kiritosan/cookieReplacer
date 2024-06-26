package main

import (
	"awesomeProject1/internal"
	"fmt"
	"os"
	"path"
)

func main() {
	indexPath, _ := os.Getwd()
	indexPath = path.Join(indexPath, "test/tmp/index.js")

	fmt.Println(indexPath)
	//indexPath := internal.GetWebPCIndexPosition()
	fileStr, err := internal.ReadFile(indexPath)
	if err != nil {
		fmt.Println(err)
	}
	pattern := `\bCookie: \S+`
	newFileStr := internal.ReplaceText(indexPath, pattern, fileStr)
	err = internal.WriteFile(indexPath, newFileStr)
	if err != nil {
		fmt.Println(err)
	}
}
