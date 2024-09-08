pub fn foobar() {
    println!("At foobar:foobar");

    // let res = l33t::two_sum(vec![2, 7, 11, 15], 9);
    // println!("{:?}", &res[..]); // {} is different from :? I guess...

    // VVV FYI , this works too
    // println!("[{},{}]", res[0], res[1]);

    l33t::print_two_sums(vec![3, 2, 4], 6);
}

mod l33t {
    // [i32; 2] Vec<i32>
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
