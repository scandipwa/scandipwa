const express = require('express');
const compression = require('compression');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const path = require('path');
const spdy = require('spdy');

const app = express();

app.use(compression());
app.use(express.static('../scandipwa/build'));
app.use('/default/graphql', createProxyMiddleware({
    target: 'https://scandipwapmrev.indvp.com/',
    changeOrigin: true,
}));

app.get('/default/virtual-products.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../scandipwa/build/index.html'));
});

// app.get('/essentials-wrap-swaddle-3-pk-rising-star-es-wrap-risi', (req, res) => {
//     res.sendFile(path.join(__dirname, '../adenanais/build/index.html'));
// });

const options = {
    key: fs.readFileSync(path.join(__dirname, '/privateKey.key')),
    cert: fs.readFileSync(path.join(__dirname, '/certificate.crt')),
};

spdy.createServer(options, app).listen(8080, (error) => {
    if (error) {
        console.error(error);

        return process.exit(1);
    }
    console.log('HTTP/2 server listening on port: 8080');
});
