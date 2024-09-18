package main

// 1 big import statment.
// a 'factored' import statement (instead of indv. import statements)
import (
	"fmt"
	"math"
	"math/rand" // rand is the package name
	"reflect"
	"runtime"
)

func main() {
	printHeader()
	// stepZero()
	// packages()
	multipleResults()
}

// === helper ===
func printFn(i interface{}) {
	var getFunctionName = func(i interface{}) string {
		return runtime.FuncForPC(reflect.ValueOf(i).Pointer()).Name()
	}

	var name = getFunctionName(i)
	fmt.Println(fmt.Sprintf("=== %s ===", name))
}

// === begin ===
func printHeader() {
	printFn(printHeader)
	fmt.Println("Running: A tour of go!")
}

func stepZero() {
	printFn(stepZero)
	fmt.Println("Hello, 世界")
}

func packages() {
	printFn(packages)
	// Capital names are exported / public, lowercase are not (e.g. math.pi)
	fmt.Println("My favorite number is", rand.Intn(10))
	fmt.Printf("Now you have %g problems.\n", math.Sqrt(7))
}

func multipleResults() {
	printFn(multipleResults)
	// VVV no scoped functions like JS, but anon functions OK
	var swap = func(x, y string) (string, string) {
		return y, x
	}
	a, b := swap("hello", "world")
	fmt.Println(a, b)
}
