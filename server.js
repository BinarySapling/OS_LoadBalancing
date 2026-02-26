import cluster from "cluster";
import os from "os";
import express from "express";

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  cluster.schedulingPolicy = cluster.SCHED_NONE;
  console.log(`Primary process ${process.pid} is running`);
  console.log(`Forking for ${totalCPUs} CPUs...\n`);
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} exited`);
    console.log("Starting a new worker...")
    cluster.fork();
  });
} else {
  const app = express();
  app.get("/", (req, res) => {
    res.send(`Hello from worker ${process.pid}`);
  });

  app.listen(3000, () => {
    console.log(`Worker ${process.pid} started server on port 3000`);
  });
  app.get("/block",(req,res)=>{
    const start = Date.now()
    while(Date.now() - start<5000){}
    res.send("CPU BLOCKING")
  })
}