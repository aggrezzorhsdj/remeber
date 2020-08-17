const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dbconfig = require('./backend/db/db.config');
const todosRouter = require('./backend/routes/todos.routes');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const cors = require('cors');

/* Connect DB*/
mongoose.connect(dbconfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
        console.log('Database sucessfully connected')
    },
    error => {
        console.log('Database could not connected: ' + error)
    }
)

/*Body Parser*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

/* Cors */
app.use(cors());

/* Routes */
app.use('/api/todos', todosRouter);

/* Initialize Listening Server on @const port*/
app.listen(port, () => {
    console.log('server is running');
})
