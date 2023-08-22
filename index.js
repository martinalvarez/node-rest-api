const http = require('node:http');

const server = http.createServer((req, res)=>{
    const { 
        headers,
        method, 
        url 
    } = req;

    console.log(`*** ${method}: ${url} ***`);

    for (const key in headers) {
        const value = headers[key];
        console.log(`Key: ${key}: : ${value}`);
    }

    res.end('coming soon...');
});

server.listen(3000, ()=>{
    console.log(`REST API server initialized in port ${server.address().port}`);
});