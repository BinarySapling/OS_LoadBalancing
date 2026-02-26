// Simple Express server for NGINX reverse proxy demo (ES module syntax)
import express from 'express';

const app = express();

// Log all incoming requests
app.use((req, res, next) => {
	console.log(`[server.js] ${req.method} ${req.url} from ${req.ip}`);
	next();
});
const PORT = 3000;

app.get('/', (req, res) => {
	res.send('Hello from server.js on port 3000!');
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});
