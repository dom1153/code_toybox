pub fn foobar() {
    println!("At foobar:foobar");

    // let res = l33t::two_sum(vec![2, 7, 11, 15], 9);
    // println!("{:?}", &res[..]); // {} is different from :? I guess...

    // VVV FYI , this works too
    // println!("[{},{}]", res[0], res[1]);

    // l33t::print_two_sums(vec![3, 2, 4], 6);
    // blah::veccc();
    blah::mappp();
}

#[allow(dead_code)]
mod l33t {
    // [i32; 2] |  Vec<i32>
    fn two_sum(nums: Vec<i32>, target: i32) -> [i32; 2] {
        // Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
        // You may assume that each input would have exactly one solution, and you may not use the same element twice.
        //   Input: nums = [2,7,11,15], target = 9
        //   Output: [0,1]
        //   Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
        //   Follow up: can you make it better than O^2

        /*
          pseudo:
           for x in nums:
             for y in nums:
               if (x + y) == target
                 return [x, y]
                 break;
           print [x, y]
        */

        // question: for some reason this is & (e.g. &nums)
        // question: why does enumerate does not need &
        const VERBOSE: bool = true;
        for (i, x) in nums.iter().enumerate() {
            if VERBOSE {
                println!("nums[{0}]: {1}", i, x);
            }
            // VVV TODO: need vec slice
            // question: wait... why does i work here and not x...
            for (j, y) in nums[i + 1..].iter().enumerate() {
                let idx_y = i + j + 1;
                if VERBOSE {
                    println!("  nums[{}]: {}", idx_y, y);
                }
                if (x + y) == target {
                    // ... question: why do we 'dereferencing the borrow' ; it's an int...
                    // this *... it does not copy does it?
                    if VERBOSE {
                        println!("    OK! {} + {} = {}", x, y, x + y);
                    }
                    return [*x, *y];
                }
            }
        }

        return [-1, -1];
    }

    pub fn print_two_sums(nums: Vec<i32>, target: i32) {
        // (nums, target) = (vec![3, 2, 4], 6);
        println!(
            "two_sums!\tnums: {:?} | target: {} | result: {:?}",
            &nums, // question: why is this a borrow (but vec![literal] is not...)
            target,
            two_sum(nums.to_vec(), target) // question: to_vec() seems stupid here...
        );
    }
}

#[allow(dead_code)]
mod blah {
    // VVV from the docs ;)
    pub fn veccc() {
        let mut vec = Vec::new();
        vec.push(1);
        vec.push(2);

        assert_eq!(vec.len(), 2);
        assert_eq!(vec[0], 1);

        assert_eq!(vec.pop(), Some(2)); // why Some() here? verbose I suppose?
        assert_eq!(vec.len(), 1);

        vec[0] = 7;
        assert_eq!(vec[0], 7);

        vec.extend([1, 2, 3]); // this is just 'append' no? (a many push)
                               // must be iterable?
        vec.append(&mut vec![4, 5, 6]); // vec! here requires &mut... for some reason
                                        // append... is actually a ***move*** operation?... that's why it requires &mut!

        // VVV this is cool, but verbose
        // for x in &vec {
        //     println!("vec: {x}");
        // }

        println!("vec: {vec:?}");

        // assert_eq!(vec, [7, 1, 2, 3]);
        assert_eq!(vec, [7, 1, 2, 3, 4, 5, 6]);
    }

    // from the docs!
    pub fn mappp() {
        // Type inference lets us omit an explicit type signature (which
        // would be `HashMap<String, String>` in this example).
        let mut book_reviews = std::collections::HashMap::new();

        // quetion: &str vs String
        // Review some books.
        book_reviews.insert(
            "Adventures of Huckleberry Finn".to_string(),
            "My favorite book.".to_string(),
        );
        book_reviews.insert(
            "Grimms' Fairy Tales".to_string(),
            "Masterpiece.".to_string(),
        );
        book_reviews.insert(
            "Pride and Prejudice".to_string(),
            "Very enjoyable.".to_string(),
        );
        book_reviews.insert(
            "The Adventures of Sherlock Holmes".to_string(),
            "Eye lyked it alot.".to_string(),
        );

        // Check for a specific one.
        // When collections store owned values (String), they can still be
        // queried using references (&str).
        if !book_reviews.contains_key("Les Misérables") {
            println!(
                "We've got {} reviews, but Les Misérables ain't one.",
                book_reviews.len()
            );
        }

        // oops, this review has a lot of spelling mistakes, let's delete it.
        book_reviews.remove("The Adventures of Sherlock Holmes");

        // Look up the values associated with some keys.
        let to_find = ["Pride and Prejudice", "Alice's Adventure in Wonderland"];
        for &book in &to_find {
            match book_reviews.get(book) {
                Some(review) => println!("{book}: {review}"),
                None => println!("{book} is unreviewed."),
            }
        }

        // Look up the value for a key (will panic if the key is not found).
        println!("Review for Jane: {}", book_reviews["Pride and Prejudice"]);

        // Iterate over everything.
        for (book, review) in &book_reviews {
            println!("{book}: \"{review}\"");
        }
    }
}
