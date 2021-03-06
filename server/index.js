const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

require("./routes/employee.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Job Dispatch API running on port 8080!'))
