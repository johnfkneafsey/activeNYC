import express from 'express';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HOST = process.env.HOST;
const config = require('./config');
const { User, Event } = require('./models');
const app = express();
mongoose.Promise = global.Promise;
const jsonParser = bodyParser.json();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.CLIENT_ROOT);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
   next();
});

app.put('/users', jsonParser, (req, res) => {
    res.status(200)
  
    console.log('USERS REQ ', req);

    User
        .findOne({id: req.body.id})
        .exec()
        .then(user => {
            if (!user) {
                console.log('BUILDING NEW USER')
                var newUser = {
                    first_name: req.body.first_name,
                    gender: req.body.gender,
                    id: req.body.id,
                    last_name: req.body.last_name,
                    link: req.body.link,
                    name: req.body.name
                }    
                console.log('NEW USER ', newUser)
                return User
                    .create(newUser)
            }
        })
        .then(user => {
            console.log('USER ',user)
            return user
        })
        .catch(err => {
            console.log(err);
        })
});

app.get('/events', jsonParser, (req, res) => {
    res.status(200)
  
    console.log('events get REQ ', req.body);

    Event
        .find()
        .exec()
        .then(events => {
          console.log('WHAT KIDNA EVENTS DO WE GOT???', events)
          res.json(events.map(event => event.apiRepr()))
        })
        .catch(err => {
            console.log(err);
        })
});


app.post('/events', jsonParser, (req, res) => {
    res.status(200)
  
    console.log('events create REQ ', req.body);

    Event
        .create(req.body)
        .then(event => {
          console.log('EVENT CREATED ', event)
        })
        .catch(err => {
            console.log(err);
        })
});

//SERVER
let server;
function runServer(host, port) {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost/ActiveNYC', function(err) {
            if(err) {
                return reject(err);
            }
        })
        server = app.listen(port, host, () => {
            console.log(`Server running on ${host}:${port}`);
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer(config.HOST, config.PORT);
}

module.exports = {
    app, runServer, closeServer
};