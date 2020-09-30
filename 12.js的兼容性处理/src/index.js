// import "@babel/polyfill";

const add = (x, y) => x + y;
console.log(add(1, 2));

const promise = new Promise((resove) => {
  setTimeout(() => {
    console.log("promise", 123123);
  }, 1000);
});
console.log(promise);
