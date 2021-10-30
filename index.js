const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const waiter_webapp = require('./waiter_webapp');
const Routes = require('./routes/waiter_routes')


const pg = require("pg");
const Pool = pg.Pool;
// should we use a SSL connection
var useSSL = false;

var local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/waiters';


const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const app = express()
const waiter = waiter_webapp(pool)
waiterRoutes = Routes(waiter)

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});
// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "Error messages",
    resave: false,
    saveUninitialized: true,
}));

// initialise the flash middleware
app.use(flash());
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', function(req, res,){
    res.render('index')
       
    });
app.get('/waiters/:username', async function(req,res){
    var name = req.params.username;
    // console.log(name);
    var days = await  waiter.getDay()
    res.render('waiters',{
        days, name
    })

} );
// [{id:1, day: "Sunday"},{id:2, day: "Monday"},{id:3, day: "Tuesday"},{id:4, day: "Wednsaday"},{id:5, day: "Thursday"},{id:6, day: "Friday"},{id:7, day: "Saturday"}]
app.post('/waiters/:username',function(req,res){
    var name = req.params.username;
    var days = req.body.day
    console.log("Waiter: "+name +' ' + "days: "+days);
    
    res.redirect(name);
})

//app.get('/', waiterRoutes.homePage);
//app.get('/reg_numbers', waiterRoutes.add);
// app.post('/regTown', regRoutes.);
// app.post("/displayAll", regRoutes.showAll);
// app.get('/clearbtn', regRoutes.clear);

var PORT = process.env.PORT || 3009;
app.listen(PORT, function () {
    console.log("app started", PORT)
});