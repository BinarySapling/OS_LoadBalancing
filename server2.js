// Another Express server for NGINX reverse proxy demo (ES module syntax)
import express from 'express';

const app = express();

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`[server2.js] ${req.method} ${req.url} from ${req.ip}`);
    next();
});
const PORT = 3001;

app.get('/', (req, res) => {
    res.send('Hello from server2.js on port 3001!');
});

app.listen(PORT, () => {
    console.log(`Server2 running at http://localhost:${PORT}/`);
});