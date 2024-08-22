use std::fmt;

pub fn print() {
    custom_print_display_trait();

    debug_print();

    struct_types();

    alias_type();
}

fn alias_type() {
    #[allow(dead_code)]
    enum VeryVerboseEnumOfThingsToDoWithNumbers {
        Add,
        Subtract,
    }

    impl VeryVerboseEnumOfThingsToDoWithNumbers {
        #[allow(dead_code)]
        fn run(&self, x: i32, y: i32) -> i32 {
            match self {
                // here 'Self' is just an alias to the long type name
                Self::Add => x + y,
                Self::Subtract => x - y,
            }
        }
    }
}

fn custom_print_display_trait() {
    // this example has custom print formatting, ? operator, and uses vec.iter.enumerate (index looping)
    struct List(Vec<i32>);

    impl fmt::Display for List {
        fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
            let vec = &self.0;

            write!(f, "[")?;

            for (count, v) in vec.iter().enumerate() {
                // Use the ? operator to return on errors.
                // preppend , on non-first index
                if count != 0 {
                    write!(f, ", ")?;
                }
                write!(f, "{idx} : {}", v, idx = count)?;
            }

            write!(f, "]")
        }
    }

    // VVV testbench
    let v = List(vec![4, 5, 6]);
    println!("Custom print structure: {}", v);
}

fn debug_print() {
    // VVV this is also a 'unit' struct, useful for generics (no fields)
    #[allow(dead_code)]
    #[derive(Debug)]
    struct Structure(i32);

    #[allow(dead_code)]
    #[derive(Debug)]
    struct Deep(Structure);

    // testbench

    println!("{:?} months in a year.", 12);
    println!(
        "{1:?} {0:?} is the {actor:?} name.",
        "Slater",
        "Christian",
        actor = "actor's"
    );

    println!("Now {:?} will print!", Structure(3));

    println!("Now {:?} will print!", Deep(Structure(7)));

    // escape {} with... more curly braces! {{}}
    println!(
        "But with {{:#?}} we get cool results:\n{:#?}",
        Deep(Structure(7))
    );
}

fn struct_types() {
    // A unit struct
    struct Unit;

    // A tuple struct
    struct Pair(i32, f32);

    // A struct with two fields
    struct Point {
        x: f32,
        y: f32,
    }

    // Instantiate a `Point`
    let point: Point = Point { x: 10.3, y: 0.4 };
    let another_point: Point = Point { x: 5.2, y: 0.2 };

    // Access the fields of the point
    println!("point coordinates: ({}, {})", point.x, point.y);

    // Make a new point by using struct update syntax to use the fields of our
    // other one
    let bottom_right = Point {
        x: 5.2,
        ..another_point
    };

    // `bottom_right.y` will be the same as `point.y` because we used that field
    // from `point`
    println!("second point: ({}, {})", bottom_right.x, bottom_right.y);

    // Destructure the point (stored into _left_edge and _top_edge)
    let Point {
        x: _left_edge,
        y: _top_edge,
    } = point;

    // Instantiate a unit struct
    let _unit = Unit;

    // Instantiate a tuple struct
    let pair = Pair(1, 0.1);

    // Access the fields of a tuple struct
    println!("pair contains {:?} and {:?}", pair.0, pair.1);

    // Destructure a tuple struct
    let Pair(integer, decimal) = pair;

    println!("pair contains {:?} and {:?}", integer, decimal);
}
