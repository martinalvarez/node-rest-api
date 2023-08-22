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

module.exports = {
    debugRequest,
    sendResponse,
};