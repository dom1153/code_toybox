pub fn print() {
    println!("At impatient.rs");

    // the 32, type annotation
    if !true {
        let _: i32 = 5;
    }

    // tuples
    if !true {
        let _pair = ('a', 17); // let pair: (char, i32) = ('a', 17);
        println!("pair.0: '{}', pair.1: '{}'", _pair.0, _pair.1);
    }

    if !true {
        let (some_char, _some_int) = ('a', 17);
        assert!(some_char == 'a'); // pass
        assert_eq!(some_char, 'a'); // pass
        assert!(_some_int == 17); // pass
        assert_eq!(_some_int, 17); // pass
        if false {
            assert!(some_char == 'b'); // fail
        }
    }

    // let (l, r) = slice.split_at(middle);
    if true {
        let x = vec![1, 2, 3, 4, 5, 6, 7, 8]
            .iter() // why do we iter and not call map on this directly? (guess that's how we do it here)
            .map(|x| x + 3)
            .fold(0, |x, y| x + y);
        println!("x (vec iter().map().fold(): {}", x);

        for c in "SuRPRISE INbOUND"
            .chars()
            .filter(|c| c.is_lowercase())
            .flat_map(|c| c.to_uppercase())
        {
            println!("iter chars().filters().flat_map(): {}", c);
        }
    }

    // structs
    // Number is reused, leave in module scope
    struct Number {
        odd: bool,
        value: i32,
    }

    // struct instantiation
    if !true {
        let x = Number {
            odd: false,
            value: 2,
        };
        let y = Number {
            value: 3,
            odd: true,
        };

        println!("x.odd: {}, y.value: {}", x.odd, y.value)
    }

    // matches
    if !true {
        fn print_number(n: Number) {
            match n.value {
                1 => println!("Number: One"),
                2 => println!("Number: Two"),
                _ => println!("Number: {}", n.value),
            }
        }
        print_number(Number {
            value: 3,
            odd: true,
        })
    }

    if !true {
        // impl is not scope bound ;), which makes sense
        impl Number {
            fn is_positive(self) -> bool {
                self.value > 0
            }
        }
        let minus_two = Number {
            odd: false,
            value: -2,
        };
        println!("is Number positive? {}", minus_two.is_positive());
    }

    if !true {
        // generics suck man...

        // from the rust docs https://doc.rust-lang.org/book/ch10-01-syntax.html
        struct Point<T> {
            x: T,
            _y: T,
        }
        impl<T> Point<T> {
            fn x(&self) -> &T {
                &self.x
            }
        }
        let p = Point { x: 5, _y: 10 };
        println!("p.x = {}", p.x());
    }

    // enum reference
    // VVV imagine this works...
    if !true {
        // enum Option<T> {
        //     None,
        //     Some(T),
        // }
        // impl<T> Option<T> {
        //     fn unwrap(self) -> T {
        //         match self {
        //             Self::Some(t) => t,
        //             Self::None => panic!("{}", ..),
        //         }
        //     }
        // }
    }

    // https://stackoverflow.com/questions/21747136/how-do-i-print-in-rust-the-type-of-a-variable
    if !true {
        fn print_type_of<T>(_: &T) {
            println!("typeof: {}", std::any::type_name::<T>())
        }
        print_type_of(&32);
    }

    if !true {
        // VVV prints Ok("🍉") without unwrap (s1 is a 'Result' type)
        let s1 = std::str::from_utf8(&[240, 159, 141, 137]);
        println!("{:?}", s1);

        // print_type_of(s1); // <-- doesn't compile

        // rust will be smart to warn this is incorrect
        // let s2 = std::str::from_utf8(&[195, 40]);
        // println!("{:?}", s2);

        let s = std::str::from_utf8(&[240, 159, 141, 137]).unwrap();
        println!("{:?}", s);
    }

    if !true {
        // 0 or greater
        println!("(0..).contains(&100): {}", (0..).contains(&100));
        // 20 or less than 20
        println!("(..=20).contains(&20): {}", (..=20).contains(&20));
        // only 3, 4, 5
        println!("(3..6).contains(&4): {}", (3..6).contains(&4));
    }
}
