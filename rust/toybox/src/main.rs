mod guessing_game;
mod impatient;

fn main() {
    println!(">>> At main.rs");

    if false {
        impatient::print();
    }

    if true {
        guessing_game::play();
    }
}
