const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy(['/math'], { target: 'http://localhost:8081' }));
}