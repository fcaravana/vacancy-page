var express = require('express'),
    app = express();

app.use('/', express.static('./'));

var server = app.listen(8080, 'localhost', function () {
    console.log('Listening at http://localhost:8080/');
});
