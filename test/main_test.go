package test

import (
	"cookieReplacer/internal"
	"fmt"
	"github.com/atotto/clipboard"
	"log"
	"os"
	"strings"
	"testing"
)

func TestGetWebPCIndexPosition(t *testing.T) {

	//t.Run("no args", func(t *testing.T) {
	//	got := internal.GetWebPCIndexPosition()
	//	want := "C:\\Users\\zhangh-cs\\WebstormProjects\\web-pc\\config\\index.js"
	//
	//	if got != want {
	//		t.Errorf("WEB_PC_INDEX_POSITION=%q, want %q", got, want)
	//	}
	//})

	t.Run("with args", func(t *testing.T) {
		got := internal.GetWebPCIndexPosition("../.env")
		want := "C:\\Users\\zhangh-cs\\WebstormProjects\\web-pc\\config\\index.js"

		if got != want {
			t.Errorf("WEB_PC_INDEX_POSITION=%q, want %q", got, want)
		}
	})
}

func TestGetTextFromClipboard(t *testing.T) {

	err := clipboard.WriteAll("_ga=GA1.2.1107884557.1718258314; zg_d")
	if err != nil {
		return
	}

	got := internal.GetTextFromClipboard()
	wantContain := "_ga"
	if !strings.Contains(got, wantContain) {
		t.Errorf("got %q, not contain %q", got, wantContain)
	}
}

func TestReadFile(t *testing.T) {
	filePath := "C:\\Users\\zhangh-cs\\WebstormProjects\\web-pc\\config\\index.js"
	got, err := internal.ReadFile(filePath)
	if err != nil {
		fmt.Println("Error reading file:", err)
	}
	want := "Cookie: "
	if !strings.Contains(got, want) {
		t.Errorf("got %q, don't contain %q", got, want)
	}
}

func TestReplaceText(t *testing.T) {
	filePath := "C:\\Users\\zhangh-cs\\WebstormProjects\\web-pc\\config\\index.js"
	pattern := `\bCookie: \S+`
	targetText := `Cookie: test`
	got := internal.ReplaceText(filePath, pattern, targetText)
	if !strings.Contains(got, targetText) {
		t.Errorf("got %q, don't contain %q", got, targetText)
	}
}

func TestWriteFile(t *testing.T) {
	dirPath := "./tmpFileFolder/"
	filename := "createFileTest.txt"
	text := "test 111"
	// 检查文件夹是否存在
	if _, err := os.Stat(dirPath); os.IsNotExist(err) {
		// 文件夹不存在，创建文件夹
		err := os.MkdirAll(dirPath, 0755) // 使用 0755 权限创建文件夹
		if err != nil {
			log.Fatalf("Error creating directory: %v", err)
		}
		fmt.Println("Directory created:", dirPath)
	} else {
		// 文件夹已存在
		fmt.Println("Directory already exists:", dirPath)
	}

	err := internal.WriteFile(dirPath+filename, text)
	if err != nil {
		t.Errorf("WriteFile failed: %v", err)
		return
	}

	file, err := internal.ReadFile(dirPath + filename)
	if err != nil {
		t.Errorf("ReadFile failed: %v", err)
	}
	if file != text {
		t.Errorf("content doesn't match: got %v, want %v", file, text)
	}
}
