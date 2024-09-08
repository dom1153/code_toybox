// 'use' is for convenience import (e.g std:io is ok, or 'use' -> io:)

// VVV 'attribute' to disable 'dead_code' lint
#[allow(dead_code)]
#[allow(unused_variables)]
pub fn reference() {
    println!("at cheatsheet::reference()");

    // variables and types (arrays?) - unmutable by default

    // blocks expressions do not need semicolons... (redundant)

    // Struct
    struct S {
        x: i32,
    }
    struct S2(i32, i32); // tuple struct (.0)
    struct S3; // empty

    enum E {
        A,    // unit type
        B(),  // tuple type
        C {}, // struct type
    }

    // global, single memory (must be assigned)
    static X: i32 = 5;
    const X2: f32 = 3.14;
    let _x3: i32 = 0; // standard stack allocated
    let mut _x4: i32 = 1; // mutuable goes before name
    let array: [i32; 3] = [1, 2, 3]; // arrays are fixed sized; stack-allocated
    let boxed_array: Box<[i32]> = Box::new([1, 2, 3]); // heap-allocated, coerced to a slice

    trait T {}

    // VVV for implementing inherted traits
    // impl S4 {};

    // TODO: all the wonderful & * of rust...
    // Lifetimes: 'a

    // string maniuplation (conversion)
    // std input

    // loops (python redundant-less parens)
    while X == 5 {} // while x is true

    if false {
        // ^^^ if false here to avoid 'unreachable' code
        loop {} // forever loop :)
    }

    // data structures (stack; vectors, queue, hashmap)
    // std::collections ; Vec and HashMap
    let mut vec = Vec::new();
    vec.push(1);
    vec.push(2);
    vec.len();
    // see foobar::blah for examples from the rust book!

    // more todo: how to debug rust
}
