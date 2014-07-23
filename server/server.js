var express = require('express'),
    http = require('http'),
    routes = require('./routes'),
    reports = require('./routes/reports'),
    db = require('./models');
var app = express();

app.set('port', process.env.PORT || 3000)
app.use(express.logger('dev'))
app.use(express.json())
app.use(app.router)

if ('development' === app.get('env')) {
    app.use(express.errorHandler())
}

app.get('/', routes.index)
app.get('/reports.json', reports.index)
app.post('/reports.json', reports.create)

db
  .sequelize
  .sync()
  .complete(function(err) {
    if (err) {
      throw err[0]
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })
