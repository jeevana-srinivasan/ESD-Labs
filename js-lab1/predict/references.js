// PREDICT, THEN RUN.   node predict/references.js

// ---- 1. Same contents, different objects ---------------------------------
console.log("1:", [1, 2] === [1, 2], { a: 1 } === { a: 1 });
// Prediction: 1: false true
//1: false false
// Arrays and objects are compared by reference, not contents. Both pairs are separately created objects.

// ---- 2. Two names, one array ---------------------------------------------
const planner = [4, 10];
const alias = planner;
alias.push(18);
console.log("2:", planner, planner === alias);
// Prediction: 2: 4,10,18 true

// ---- 3. const stops reassignment, not change -----------------------------
const ids = [1];
ids.push(2);
console.log("3:", ids);
// Prediction: 3: 1,2

// ---- 4. Spread copies ONE level -------------------------------------------
const plan = { student: "Asha", semesters: { odd: [4], even: [] } };
const copy = { ...plan };
copy.semesters.odd.push(10);
console.log("4:", plan.semesters.odd, copy === plan, copy.semesters === plan.semesters);
// Prediction: 4: 4 true false
//Spread creates a new outer object, but nested objects retain their original references (shallow copy).
//4: [4, 10] false true

// ---- 5. structuredClone copies every level --------------------------------
const deep = structuredClone(plan);
deep.semesters.even.push(2);
console.log("5:", plan.semesters.even);
// Prediction: 5: 2
//structuredClone() creates independent nested objects and arrays, so modifying deep doesn't affect plan
// 5: []

// ---- 6. Object.is — the check React uses ----------------------------------
const before = [4];
const after = before;
after.push(10);
console.log("6:", Object.is(before, after));
// Prediction:  (if React compared these two, would it re-render?)
//6: true
