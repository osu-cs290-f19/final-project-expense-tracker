
var express = require('express');
var expHB = require('express-handlebars');

var app = express();

app.engine('handlebars', expHB() );
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

// connect to mongodb server
const MongoClient = require('mongodb').MongoClient;
const mdbconf = require('./mongodb_config.json'); // mdbconf == mongoconfig
mdbconf.port = mdbconf.port || "27017";
const mongoURL = `mongodb://${mdbconf.user}:${mdbconf.pass}@${mdbconf.host}:${mdbconf.port}/`;
var db;


// ============
//   HANDLERS
// ------------
app.all('*', (req, res, next) => {
	console.log("[ " + req.method + " ] ", req.url);
	next();
});

app.post('/api', (req, res, next) => {
	
});

app.get('/', (req, res, next) => {
	res.render('index');
});

app.use(express.static('public'));

app.get('*', (req, res) => {
	res.status(404).render('404');
});



// Login to database and start webserver
// but only start server once db is ready
console.log(`[ START ] Connecting to MongoDB...`);
MongoClient.connect(mongoURL, function (err, mongoclient) {
	if (err) { throw err; }
	
	db = mongoclient.db(mdbconf.dbname);
	
	console.log("[ START ]  > Connected.");
	
	app.listen(port, function () {
		console.log("[ START ] Server is listening on port", port);
	});
});
