const fsp = require('node:fs/promises');
const { sendResponse } = require('./utils');

function handleBiographyResponse({ method, res }) {
    switch(method) {
        case 'GET': {
            fsp.readFile('./data/biography.json', { encoding: 'utf-8' })
                .then((file)=> {
                    sendResponse({ payload: file, res, statusCode: 500 });
                })
                .catch((error)=> {
                    sendResponse({ payload: JSON.stringify({ error: 'error loading biography' }), res, statusCode: 500 });
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
    handleBiographyResponse,
};