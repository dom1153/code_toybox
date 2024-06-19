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

type triangle struct {
	size int
}

// VVV replace struct with say string, and you can overload it?!
type square struct {
	size int
}

// embedding, note quite inheritance
type cTriangle struct {
	triangle
	color string
}

type combo struct {
	triangle
	square
}

// VVV these are private functions, but public/private rules only apply to other modules
// VVV pass by value, just like methods, use pointers if you want a destructive method
func (t triangle) perimeter() int {
	return t.size * 3
}
func (c square) perimeter() int {
	return c.size * 4
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
	fmt.Println("len(os.Args", len(os.Args))

	fmt.Println("sum1", sum1("1", "2"))
	fmt.Println("sum2", sum2("3", "4"))

	ret, _, _ := sum3("4", "5")
	fmt.Println("sum3", ret)

	// ### hint: nvim needs to be in the same context, then lsp will work
	total := calculator.Sum(3, 5)
	fmt.Println("calculator.Sum()", total, calculator.Version)

	fmt.Println("quote.Hello()", quote.Hello())
	fmt.Println("quote.Glass()", quote.Glass())
	fmt.Println("quote.Go()", quote.Go())

	t := triangle{3}
	s := square{3}
	fmt.Println("Perimeter (triangle):", t.perimeter())
	fmt.Println("Perimeter (square):", s.perimeter())

	foo := string("hello")
	fmt.Println("foo (string)", foo)

	ct := cTriangle{triangle{3}, "blue"}
	fmt.Println("cTriangle size:", ct.size)
	fmt.Println("cTriangle color:", ct.color)

	come := combo{triangle{3}, square{4}}
	fmt.Println("combo size (triangle):", come.triangle.size)
}
