var fs = require('fs'), path = require('path');

var vacancy = function () {

    /**
     * Object self, for public properties and methods.
     */
    var self = {};

    /**
     * Private properties and methods, start with _(underscore).
     */
    var _req = null;
    var _res = null;
    
    var _uploadsPath = 'app/uploads/repo/';

    /**
     * Start, sets response and request and config settings.
     * 
     * @param {object} req request
     * @param {object} res response
     * @returns {undefined}
     */
    self.start = function (req, res) {

        _req = req;
        _res = res;

        _saveVacancyFiles(req.files);

    };

    /**
     * Save vacancy form files.
     * 
     * @param {object} files uploaded files
     * @returns {undefined}
     */
    var _saveVacancyFiles = function (files) {

        if (files.resume) {
            var resume = files.resume[0];
            if (path.extname(resume.originalname) === '.pdf') {
                _saveFile(files.resume[0], 'resume_' + files.resume[0].filename + path.extname(resume.originalname));
            }
        }

        if (files.portfolio) {
            var portfolio = files.portfolio[0];
            if (portfolio && (path.extname(portfolio.originalname) === '.doc' || path.extname(portfolio.originalname) === '.docx')) {
                _saveFile(files.portfolio[0], 'portfolio_' + files.portfolio[0].filename + path.extname(portfolio.originalname));
            }
        }

        if (files.photo) {
            var photo = files.photo[0];
            if (photo && (path.extname(photo.originalname) === '.jpg' || path.extname(photo.originalname) === '.jpeg')) {
                _saveFile(files.photo[0], 'photo_' + files.photo[0].filename + path.extname(photo.originalname));
            }
        }

    };

    var _saveFile = function (uploadFile, newFileName) {

        fs.createReadStream(uploadFile.path).pipe(fs.createWriteStream(_uploadsPath + newFileName));
        fs.unlinkSync(uploadFile.path);

    };

    return self;

};

module.exports = vacancy;