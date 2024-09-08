mod cheatsheet;
mod foobar;
mod guessing_game;
mod impatient;
mod rust_by_example;

fn main() {
    println!(">>> At main.rs");

    if false {
        impatient::print();
    }

    if false {
        guessing_game::play();
    }

    if false {
        rust_by_example::print();
    }

    if false {
        cheatsheet::reference()
    }

    if true {
        foobar::foobar();
    }
}
