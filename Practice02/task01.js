import {Oven} from './oven.js'

let oven = new Oven(20);
console.log(oven.maxT);
oven.maxT = 10;
console.log(oven.maxT);
