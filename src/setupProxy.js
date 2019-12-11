const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy(['/postgres'], { target: "https://calculator-react-spring.herokuapp.com" }));
}