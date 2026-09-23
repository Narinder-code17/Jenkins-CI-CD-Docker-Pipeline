const http = require("http");

const PORT = process.env.PORT || 3005;

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    
    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Jenkins CI/CD Application</title>
        </head>
        <body>
            <h1>Jenkins CI/CD Pipeline</h1>
            <p>Application deployed successfully through Jenkins and Docker.</p>
            <p>Environment: ${process.env.NODE_ENV || "development"}</p>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});