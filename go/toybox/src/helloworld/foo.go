// VVV tells us this is an executable
package main

// printf/scanf

import (
	"fmt"
	"os"
	"strconv"

	"github.com/myuser/calculator"
	"rsc.io/quote"
)

func sum1(n1 string, n2 string) (result int) {
	i1, _ := strconv.Atoi(n1)
	i2, _ := strconv.Atoi(n2)
	result = i1 + i2
	return
}

func sum2(n1 string, n2 string) int {
	i1, _ := strconv.Atoi(n1)
	i2, _ := strconv.Atoi(n2)
	var result = i1 + i2
	return result
}

func sum3(n1 string, n2 string) (int, string, string) {
	i1, _ := strconv.Atoi(n1)
	i2, _ := strconv.Atoi(n2)
	var result = i1 + i2
	return result, n1, n2
}

// c style pointers exists, for pass by reference...

func main() {
	// unused names are an error btw
	var firstName string = "JohN"
	var (
		lastName string = "Golang"
		inferred        = "Smith"
	)
	// := means cannot be previously declared?... ; no 'var' btw... ; also cannot be in functions
	uninit := 32
	// uninit = 400
	// const exists
	const pi = 3.14
	// rune (a type alias for int32, is a unicode character (unicode code point)
	rune := 'G'
	fmt.Println("Hello, 世界")
	fmt.Println("Hello", firstName, lastName, inferred, uninit, pi, rune)
	// arg1, _ := strconv.Atoi(os.Args[1])
	// fmt.Println("input: ", arg1)
	// fmt.Println("input: ", os.Args[1])
	fmt.Println("input len: ", len(os.Args))

	fmt.Println("sum1", sum1("1", "2"))
	fmt.Println("sum2", sum2("3", "4"))

	ret, _, _ := sum3("4", "5")
	fmt.Println("sum3", ret)

	// ### hint: nvim needs to be in the same context, then lsp will work
	total := calculator.Sum(3, 5)
	fmt.Println(total, calculator.Version)

	fmt.Println(quote.Hello())
	fmt.Println(quote.Glass())
	fmt.Println(quote.Go())
}
