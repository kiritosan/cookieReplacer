package main

import (
	"cookieReplacer/internal"
	"fmt"
	"strings"
)

func main() {
	// 从环境变量获取 index.js 的路径
	indexPath := internal.GetWebPCIndexPosition()
	fmt.Println("index.js Path:", indexPath)

	pattern := `(Cookie: ).*`
	cookieStr := internal.GetTextFromClipboard()
	// 使用 strings.Join 将多行合并为单行，使用空字符串作为分隔符
	singleLineCookieStr := strings.Join(strings.Split(cookieStr, "\n"), "")
	singleLineCookieStr = strings.Join(strings.Split(singleLineCookieStr, "\r"), "")
	replacement := fmt.Sprintf("${1}'%s'", singleLineCookieStr)

	newFileStr := internal.ReplaceText(indexPath, pattern, replacement)
	internal.WriteFile(indexPath, newFileStr)
}
