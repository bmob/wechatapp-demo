package main

import (
	"fmt"
"bmob/library/file"
)

func main(){

	
	appPath := GetCurPath()


	fmt.Println("hello",appPath)
}

/*获取当前文件执行的路径*/
func GetCurPath() string {
	file, _ := exec.LookPath(os.Args[0])

	//得到全路径，比如在windows下E:\\golang\\test\\a.exe
	path, _ := filepath.Abs(file)

	rst := filepath.Dir(path)

	return rst
}