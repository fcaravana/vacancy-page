/**
 * Required files and initializations
 */
var express = require('express'), 
    multer = require('multer'), 
    fs = require("fs"), 
    querystring = require('querystring'),
    ini = require('ini'),
    vacancyCtrl = require(__dirname + '/server/components/vacancy/vacancy-ctrl');

var config = ini.parse(fs.readFileSync(__dirname + '/server/shared/config/config.ini', 'utf-8'));
var upload = multer({dest: config.upload.tmp});

app = express();

/**
 * Static routes
 */
app.use('/vacancy-page', express.static('./app'));

/**
 * Available routes
 */
app.get('/', function (req, res) {
    res.redirect('/vacancy-page');
});

app.post('/vacancy-form', upload.fields([{name: 'resume', maxCount: 1}, {name: 'portfolio', maxCount: 1}, {name: 'photo', maxCount: 1}]), function (req, res) {

    var url = '/vacancy-page';
    
    vacancy = new vacancyCtrl();
    vacancy.start(req, res, config);
    
    url = (vacancy.error ? url + '?error=' + vacancy.errorCode + '&' + querystring.stringify(req.body) : url + '?success=true');    
    res.redirect(url);

});

/**
 * HTTP Server
 */
var server = app.listen(8000, 'localhost', function () {
    console.log('Listening at http://localhost:8000/');
});
