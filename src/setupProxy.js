const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy(['/postgres'], { target: 'https://calc-spring.herokuapp.com' }));
}