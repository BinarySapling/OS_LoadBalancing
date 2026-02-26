import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello from process ${process.pid}`);
});

app.get("/block", (req, res) => {
  // CPU-blocking operation: calculate a large Fibonacci number
  function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
  }
  const result = fib(40); // Adjust n for desired CPU load
  res.send(`Fibonacci(40) = ${result} from process ${process.pid}`);
});

app.listen(3001, () => {
  console.log(`Server started on port 3000 (pid: ${process.pid})`);
});
