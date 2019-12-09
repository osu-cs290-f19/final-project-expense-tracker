
const express = require('express');
const expHB = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

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
app.all('*', (req, res, next) => {
	console.log("[ " + req.method + " ]", req.url);
	next();
});

app.use(bodyParser.json());

app.post('/api/:username/add', async (req, res, next) => {
	const username = req.params.username.toLowerCase();
	const { id, date, amount, category, place, descrip } = req.body;
	
	// if missing data
	if ( !(!isNaN(id) && date && amount && category && place && descrip) ) {
		res.status(400).send("ERR Missing / blank data");
		console.log("[ ERR ] Missing data");
		return;
	}
	
	console.log("[ POST ] Adding new entry: " + JSON.stringify(req.body));
	
	// if non-positive/non-int ID
	if (isNaN(id) || id < 0 || Math.floor(id) != id) {
		res.status(400).send("ERR Bad ID");
		console.log("[ ERR ] Bad ID");
		return;
	} 
	
	const userDB = db.collection(username);
	
	const findarr = await userDB.find({id: id}).toArray();
	
	// if duplicate id
	if (findarr.length != 0) {
		res.status(409).send("ERR Duplicate ID");
		console.log("[ ERR ] Duplicate ID");
		return;
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
	
});

app.get('/api/:username/:id', async (req, res, next) => {
	const username = req.params.username.toLowerCase();
	const userDB = db.collection(username);
	const id = req.params.id;
	let filterObj;
	
	console.log("[ GET ] asking for specific entry", id);
	
	// if all
	if (req.params.id == 'all') {
		filterObj = {};
	}
	// if non-positive/non-int ID
	else if (isNaN(id) || id < 0 || Math.floor(id) != id) {
		res.status(400).send("ERR Bad ID");
		console.log("[ ERR ] Bad ID");
		return;
	} else {
		filterObj = {"id": id}
	}
	
	const findarr = await userDB.find(filterObj).toArray();
	
	res.status(200).send(findarr);
	
});

app.get('/', (req, res, next) => {
	res.render('index', {js: "index"});
});

app.get('/expenses/:username', async (req, res, next) => {
	const username = req.params.username.toLowerCase();
	const userDB = db.collection(username);
	const findarr = await userDB.find({}).toArray();
	res.render('expense', {row: findarr, js: "expense"});
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
