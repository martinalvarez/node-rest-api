const http = require('node:http');
const { handleAlbumResponse } = require('./controllers/albums.js');
const { handleBiographyResponse } = require('./controllers/biography.js');
const { sendResponse } = require('./controllers/utils.js');

const PORT = process.env.PORT ?? 3000;
const server = http.createServer((req, res)=>{
    const { 
        method, 
        url 
    } = req;

    switch(url) {
        case '/albums': {
            handleAlbumResponse({ method, res });
            break;            
        }
        case '/biography': {
            handleBiographyResponse({ method, res });
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
});

server.listen(PORT, ()=>{
    console.log(`REST API server initialized in port ${server.address().port}`);
});