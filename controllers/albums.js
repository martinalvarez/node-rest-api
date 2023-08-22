const fs = require('node:fs');
const { sendResponse } = require('./utils');

function handleAlbumResponse({ method, res }) {
    switch(method) {
        case 'GET': {
            fs.readFile('./data/albums.json', { encoding: 'utf-8'}, (error, data) => {
                if (error) {
                    sendResponse({ payload: JSON.stringify({ error: 'error loading albums' }), res, statusCode: 500 });
                } else {
                    sendResponse({ payload: data, res });
                }
            });
            break;
        }
        default: {
            sendResponse({ payload: JSON.stringify({ error: `error ${method} method is not allowed` }), res, statusCode: 500 });
            break;
        }
    }
}

module.exports = {
    handleAlbumResponse,
};