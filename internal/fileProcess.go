package internal

import (
	"fmt"
	"github.com/atotto/clipboard"
	"log"
	"os"
	"regexp"
)

func GetTextFromClipboard() string {
	// 读取剪切板中的内容到字符串
	content, err := clipboard.ReadAll()
	if err != nil {
		panic(err)
	}
	return content
}

func ReadFile(path string) (string, error) {
	file, err := os.ReadFile(path)
	if err != nil {
		return "", err
	}
	return string(file), nil
}

func ReplaceText(filePath, pattern, targetText string) string {
	fileStr, err := ReadFile(filePath)
	if err != nil {
		fmt.Println("Error reading file:", err)
	}

	// 编译正则表达式
	re, err := regexp.Compile(pattern)
	if err != nil {
		log.Fatal("Error compiling regex:", err)
	}

	// 使用正则表达式进行替换
	newFileStr := re.ReplaceAllString(fileStr, targetText)

	return newFileStr
}

func WriteFile(path, content string) error {
	file, err := os.Create(path)
	if err != nil {
		return err
	}
	defer file.Close()

	_, err = file.WriteString(content) // 写入字符串内容
	if err != nil {
		return err // 返回写入内容时的错误
	}

	return nil // 如果没有错误发生，返回nil
}
