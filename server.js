
var express = require('express');
var expHB = require('express-handlebars');

var app = express();

app.engine('handlebars', expHB() );
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.all('*', function (req, res, next) {
	console.log("[ " + req.method + " ] request for " + req.url);
	next();
})

app.get('/', function (req, res, next) {
	res.render('index');
});

app.use(express.static('public'));

app.get('*', function (req, res) {
	res.status(404).render('404');
});

app.listen(port, function () {
	console.log("[ INFO ] Server is listening on port", port);
});
