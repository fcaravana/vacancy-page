var express = require('express'), app = express();

app.use('/app', express.static('./app'));

app.get('/', function (req, res) {
    res.redirect('/app');
});

var server = app.listen(8000, 'localhost', function () {
    console.log('Listening at http://localhost:8000/');
});
