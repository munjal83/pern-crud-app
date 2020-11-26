const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
//const employees = require('./data/employees.json')


const app = express()

let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

app.get('/', (req, res, next) => {
  res.json({ message: "Hello from express" });
})

require("./routes/employee.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Job Dispatch API running on port 8080!'))
