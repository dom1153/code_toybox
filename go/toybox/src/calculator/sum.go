package calculator

// public is uppercase, private is uppercase

// private
var logM = "[LOG]"

// public
var Version = "1.0"

func internalSum(number int) int {
	return number - 1
}

// public, needs comment doc
func Sum(number1, number2 int) int {
	return number1 + number2
}
