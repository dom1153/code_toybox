package main

// 1 big import statment.
// a 'factored' import statement (instead of indv. import statements)
import (
	"fmt"
	"math"
	"math/cmplx"
	"math/rand" // rand is the package name
	"reflect"
	"runtime"
)

func main() {
	printHeader()
	// stepZero()
	// packages()
	multipleResults()
	varTypes()
	zeroValues()
	typeConversion()
	consts()
}

// === helper ===
func printFn(i interface{}) {
	// := is declare *and* assign
	getFunctionName := func(i interface{}) string {
		return runtime.FuncForPC(reflect.ValueOf(i).Pointer()).Name()
	}

	var name = getFunctionName(i)
	fmt.Println(fmt.Sprintf("=== %s ===", name))
}

// === begin cool code ===
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
	swap := func(x, y string) (string, string) {
		return y, x
	}
	a, b := swap("hello", "world")
	fmt.Println(a, b)

	// functions can be named (implicitly declared at top)
	// only advised for short functions due to readability... a stupid feature then...
	var split = func(sum int) (x, y int) {
		x = sum * 4 / 9
		y = sum - x
		return // 'naked', implicitly returns x, y
	}
	fmt.Println(split(17))

}

func varTypes() {
	printFn(varTypes)

	/*
	   bool

	   string

	   int  int8  int16  int32  int64
	   uint uint8 uint16 uint32 uint64 uintptr

	   byte // alias for uint8

	   rune // alias for int32
	        // represents a Unicode code point

	   float32 float64

	   complex64 complex128
	*/

	// VVV 'factored' var declaration???
	var (
		ToBe   bool       = false
		MaxInt uint64     = 1<<64 - 1
		z      complex128 = cmplx.Sqrt(-5 + 12i)
	)
	fmt.Printf("Type: %T Value: %v\n", ToBe, ToBe)
	fmt.Printf("Type: %T Value: %v\n", MaxInt, MaxInt)
	fmt.Printf("Type: %T Value: %v\n", z, z)
}

func zeroValues() {
	printFn(zeroValues)
	// uninitialed values are 'zeroed'.
	var i int
	var f float64
	var b bool
	var s string
	fmt.Printf("%v %v %v %q\n", i, f, b, s)
}

func typeConversion() {
	// c style casting ;)
	printFn(typeConversion)
	var x, y int = 3, 4
	var f float64 = math.Sqrt(float64(x*x + y*y))
	var z uint = uint(f)
	fmt.Println(x, y, z)
}

func consts() {
	printFn(consts)
	// VVV note; no type;  can be character, string, boolean, or numeric values.
	const World = "世界"
	const Pi = 3.14
	fmt.Println("Hello", World)
	fmt.Println("Happy", Pi, "Day")

	const Truth = true
	fmt.Println("Go rules?", Truth)

	const (
		// Create a huge number by shifting a 1 bit left 100 places.
		// In other words, the binary number that is 1 followed by 100 zeroes.
		Big = 1 << 100
		// Shift it right again 99 places, so we end up with 1<<1, or 2.
		Small = Big >> 99
	)

	needInt := func(x int) int { return x*10 + 1 }
	needFloat := func(x float64) float64 {
		return x * 0.1
	}

	fmt.Println(needInt(Small))
	fmt.Println(needFloat(Small))
	fmt.Println(needFloat(Big))
	// fmt.Println(needInt(Big)) // runtime error
}
