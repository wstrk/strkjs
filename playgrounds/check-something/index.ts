import { hexToNumber } from 'strkjs';


//TODO: Checkout the difference between felt and hex and how to convert them to number
console.log("Hello via Bun!");
// let res = `0x534e5f4d41494e` as const
let res = `0x00534E5F4D41494E` as const
let con = hexToNumber(res)

console.log(con)

// 23448594291968336 - result.
// 23448594291968334 - actual