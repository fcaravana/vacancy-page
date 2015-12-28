var express = require('express'), multer = require('multer'), fs = require("fs");

var upload = multer({dest: './app/uploads/tmp/'});
app = express();

var vacancyCtrl = require(__dirname + '/server/components/vacancy/vacancyCtrl');

app.use('/app', express.static('./app'));

app.get('/', function (req, res) {
    res.redirect('/app');
});

app.post('/vacancy-form', upload.fields([{name: 'resume', maxCount: 1}, {name: 'portfolio', maxCount: 1}, {name: 'photo', maxCount: 1}]), function (req, res) {
    
    vacancy = new vacancyCtrl();
    vacancy.start(req, res);

});

var server = app.listen(8000, 'localhost', function () {
    console.log('Listening at http://localhost:8000/');
});
