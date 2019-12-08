
var express = require('express');
var expHB = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

app.engine('handlebars', expHB() );
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

// connect to mongodb server
const MongoClient = require('mongodb').MongoClient;
const mdbconf = require('./mongodb_config.json'); // mdbconf == mongoconfig
mdbconf.port = mdbconf.port || "27017";
const mongoURL = `mongodb://${mdbconf.user}:${mdbconf.pass}@${mdbconf.host}:${mdbconf.port}/${mdbconf.dbname}`;
var db;


// ============
//   HANDLERS
// ------------
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
	console.log("[ " + req.method + " ]", req.url);
	next();
});

app.post('/api/:username/add', async (req, res, next) => {
	const username = req.params.username.toLowerCase();
	const { id, date, amount, category, place, descrip } = req.body;
	
	if (id && date && amount && category && place && descrip) {
		
		console.log("[ POST ] Adding new entry: ", req.body);
		
		const userDB = db.collection(username);
		
		const findarr = await userDB.find({id: id}).toArray();
		
		// if duplicate id
		if (findarr.length != 0) {
			res.status(409).send("ERR Duplicate ID");
		}
		
		userDB.insertOne({
			id: id,
			date: date,
			amount: amount,
			category: category,
			place: place,
			descrip: place,
		});
		
		res.status(201).send("OK New entry added");
		
	}
	else {
		res.status(400).send("ERR Missing / blank data");
	}
	
});

app.get('/api/:username/:id', async (req, res, next) => {
	console.log("[ GET ] asking for specific entry");
});

app.get('/', (req, res, next) => {
	res.render('index');
});

app.get('/expense', (req, res, next) => {
	res.render('expense');
});

app.use(express.static('public'));

app.get('*', (req, res) => {
	res.status(404).render('404');
});



// Login to database and start webserver
// but only start server once db is ready
console.log(`[ START ] Connecting to MongoDB (${mongoURL}) `);
MongoClient.connect(mongoURL, function (err, mongoclient) {
	if (err) { throw err; }
	
	db = mongoclient.db(mdbconf.dbname);
	
	console.log("[ START ]  > Connected.");
	
	app.listen(port, function () {
		console.log("[ START ] Server is listening on port", port);
	});
});
