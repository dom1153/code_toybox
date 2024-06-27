use rand::Rng;
use std::io;

pub fn play() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100);
    println!("(The secret number is: {secret_number})");

    // just an unconditional loop
    loop {
        println!("Please input a number:");
        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");
        // let guess: u32 = guess.trim().parse().expect("Your guess must be a number");

        // as_str converts String -> &str
        // triple /// is for doc strings?
        // if guess.as_str().trim().to_lowercase() == "q" {
        //     println!("Found q, Exiting");
        //     break;
        // }
        match guess.trim().to_lowercase().as_str() {
            "q" | "" => {
                println!("Found q, exiting");
                break;
            }
            _ => (), // () is just the 'unit value'
        }

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {}", guess);

        // use code action lsp to fill this in (e.g. fills in std::cmp
        match guess.cmp(&secret_number) {
            std::cmp::Ordering::Less => println!("Too small... Try again"),
            std::cmp::Ordering::Greater => println!("Too big!!! Try again"),
            std::cmp::Ordering::Equal => {
                println!("You Win!");
                break;
            }
        }
    }
}
