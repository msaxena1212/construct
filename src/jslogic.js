//closure

function outerfn() {
  let count = 0;
  function innerfn() {
    count++;
    console.log(count, 'count');
  }
  return innerfn;
}
const fn = outerfn();
fn();

//call, apply, bind

const obj = {
  name: 'Prince Pal',
  age: 30,
};

function greetCall(city, country) {
  obj.greeting = `I live in ${city}, ${country}.`;
}

greetCall.call(obj, 'New York', 'USA');
console.log(obj.greeting, 'call');

function greetApply(city, country) {
  obj.greeting = `I live in ${city}, ${country}.`;
}

greetApply.apply(obj, ['New York', 'USA']);
console.log(obj.greeting, 'apply');

function greetBind(city, country) {
  obj.greeting = `I live in ${city}, ${country}.`;
}

const boundGreet = greetBind.bind(obj);
boundGreet('New York', 'USA');
console.log(obj.greeting, 'bind');

// Higher-order functions

function higherOrderFunction(fn) {
  return `Hello : ${fn}`;
}

function callbackFunction(callbackArg) {
  console.log(callbackArg('Prince Pal'));
}

callbackFunction(higherOrderFunction);

// recursine function
function recursiveFunction(n) {
  if (n === 0) {
     console.log("Done!");
    return;
  }
  console.log(n);
  recursiveFunction(n -1);
}
recursiveFunction(5);

// let const var

// var → Function scoped, redeclare allowed, hoisted with undefined.
// let → Block scoped, reassignment allowed, redeclare not allowed.
// const → Block scoped, reassignment not allowed, object properties can still be modified.


// var → function scoped sirf function ke andar accessible hai.

if (true) {
  var age = 25;
}
console.log(age);

// let → block scoped or ES6 me introduce hua. sirf us block ke andar accessible hai.
if (true) {
  let ages = 25;
  console.log(ages);
}
//  console.log(ages); // ReferenceError: ages is not defined


// const → block scoped + reassignment not allowed
const name = "Prince";

// name = "Pal"; // TypeError: Assignment to constant variable.

const user = {
  name: "Prince"
};

user.name = "Pal"; // allowed, kyunki hum object ke properties ko change kar rahe hain, na ki user variable ko reassign kar rahe hain.

console.log(user); //Pal                                                                     

// Prototype JavaScript ka inheritance mechanism hai jisme objects apne
// parent prototype se properties aur methods access karte hain through the prototype chain.

// mat filter reduce

const arr = [1, 2, 3, 4];

console.log(arr.map(x => x * 2));
console.log(arr.filter(x => x > 2));
console.log(arr.reduce((a, b) => a + b, 0));

const products = [
  { price: 100 },
  { price: 200 },
  { price: 300 },
 ];

const total = products.reduce((sum, item) => {
  console.log(sum,'sum');
  console.log(item,'item');
  return sum + item.price;
}, 0);

console.log(total,'total');


const employees = [
  { name: 'Prince', salary: 50000 },
  { name: 'Rahul', salary: 60000 },
  { name: 'Amit', salary: 70000 },
  { name: 'Deepak', salary: 90000 }
];

const highpaidemployees = employees.filter(emp => Math.max(...employees.map(hs => hs.salary)) === emp.salary) 
console.log(highpaidemployees,'highpaidemployees');


const highestEmployee = employees.reduce(
  (max, emp) => emp.salary > max.salary ? emp : max
);

console.log(highestEmployee,'test');

let highestEmployeex = employees[2];

for (let i = 1; i < employees.length; i++) {
  if (employees[i].salary > highestEmployeex.salary) {
    highestEmployeex = employees[i];
  }
}

console.log(highestEmployee);

const maxNo = [
 50000,
 60000,
 70000 ,
 90000
];

const highNo = maxNo.filter(item => Math.max(...maxNo.map(hn=>  hn)) == item)

console.log(highNo,'highNo');


const DpNo = [
 50000,
 60000,
 60000,
 70000,
 70000,
 90000
];


const a =  DpNo.filter((item, index) => DpNo.indexOf(item) === index)
console.log("hgchxhhc",a)

const uniqData = [...new Set(DpNo)]

console.log(uniqData,'uniqData');

const employ = [
  { name: 'Prince', salary: 50000 },
  { name: 'Prince', salary: 50000 },
  { name: 'Rahul', salary: 80000 },
  { name: 'Amit', salary: 70000 },
  { name: 'Amit', salary: 70000 },
  { name: 'Deepak', salary: 90000 }
];


const unics = employ.filter((item,index,arr) => index == arr.findIndex((fitem)=>  fitem.name == item.name)
)
console.log(unics,'unics');

const result = unics.sort((a, b) => a.salary - b.salary);

console.log(result,'result');



