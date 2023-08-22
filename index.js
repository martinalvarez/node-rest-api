const fs = require('node:fs');
const fsp = require('node:fs/promises');
const http = require('node:http');

const responseHeaders = {
    'json': {
        'Content-Type': 'application/json',
    },
}

function debugRequest({ headers, method, url }) {
    console.log(`*** ${method}: ${url} ***`);

    for (const key in headers) {
        const value = headers[key];
        console.log(`Key: ${key}: : ${value}`);
    }
}

function sendResponse({ contentType = 'json', payload, res, statusCode=200 }) {
    const [key, value ] = Object.entries(responseHeaders[contentType])[0];

    res.setHeader(key, value);
    res.statusCode = statusCode;    
    res.end(payload);
}

const server = http.createServer((req, res)=>{
    const { 
        method, 
        url 
    } = req;

    switch (method) {
        case 'GET': {
            switch(url) {
                case '/albums': {
                    fs.readFile('./data/albums.json', { encoding: 'utf-8'}, (error, data) => {
                        if (error) {
                            sendResponse({ payload: JSON.stringify({ error: 'error loading albums' }), res, statusCode: 500 });
                        } else {
                            sendResponse({ payload: data, res });
                        }
                    });
                    break;
                }
                case '/biography': {
                    fsp.readFile('./data/biography.json', { encoding: 'utf-8' })
                        .then((file)=> {
                            sendResponse({ payload: file, res, statusCode: 500 });
                        })
                        .catch((error)=> {
                            sendResponse({ payload: JSON.stringify({ error: 'error loading biography' }), res, statusCode: 500 });
                        });
                    break;
                }
                case '/cerati': {
                    sendResponse({ payload: JSON.stringify({ error: 'resource not found' }), res, statusCode: 404 });
                    break;
                }
                default: {
                    sendResponse({ payload: JSON.stringify({ message: 'coming soon' }), res});
                    break;
                }
            }
            break;  
        }
        default: {
            sendResponse({ payload: { message: 'coming soon' }, res});
            break;            
        }
    }
});

server.listen(3000, ()=>{
    console.log(`REST API server initialized in port ${server.address().port}`);
});