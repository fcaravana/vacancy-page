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
    var _vacanciesPath = 'app/components/vacancy/';

    var _error = false;

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

        if (!_error) {
            _saveVacancyFiles(req.files);
            _saveVacancy(req.body);
        }
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
                _saveFile(resume, 'resume_' + resume.filename + path.extname(resume.originalname));
            } else {
                fs.unlinkSync(resume.path);
            }
        }

        if (files.portfolio) {
            var portfolio = files.portfolio[0];
            if (portfolio && (path.extname(portfolio.originalname) === '.doc' || path.extname(portfolio.originalname) === '.docx')) {
                _saveFile(portfolio, 'portfolio_' + portfolio.filename + path.extname(portfolio.originalname));
            } else {
                fs.unlinkSync(portfolio.path);
            }
        }

        if (files.photo) {
            var photo = files.photo[0];
            if (photo && (path.extname(photo.originalname) === '.jpg' || path.extname(photo.originalname) === '.jpeg')) {
                _saveFile(photo, 'photo_' + photo.filename + path.extname(photo.originalname));
            } else {
                fs.unlinkSync(photo.path);
            }
        }

    };

    /**
     * Save file to repo.
     * 
     * @param {object} uploadFile file object
     * @param {string} newFileName file name
     * @returns {undefined}
     */
    var _saveFile = function (uploadFile, newFileName) {

        fs.createReadStream(uploadFile.path).pipe(fs.createWriteStream(_uploadsPath + newFileName));
        fs.unlinkSync(uploadFile.path);

    };

    /**
     * Save vacancy to JSON file.
     * 
     * @param {object} newVacancy object with new vacancy data
     * @returns {undefined}
     */
    var _saveVacancy = function (newVacancy) {

        if (!newVacancy.copy) {
            newVacancy["copy"] = "false";
        }

        if (_req.files.resume) {
            var resume = _req.files.resume[0];
            if (path.extname(resume.originalname) === '.pdf') {
                newVacancy["resume"] = _uploadsPath + 'resume_' + resume.filename + path.extname(resume.originalname);
            }
        }

        if (_req.files.portfolio) {
            var portfolio = _req.files.portfolio[0];
            if (portfolio && (path.extname(portfolio.originalname) === '.doc' || path.extname(portfolio.originalname) === '.docx')) {
                newVacancy["portfolio"] = _uploadsPath + 'portfolio_' + portfolio.filename + path.extname(portfolio.originalname);
            }
        }

        if (_req.files.photo) {
            var photo = _req.files.photo[0];
            if (photo && (path.extname(photo.originalname) === '.jpg' || path.extname(photo.originalname) === '.jpeg')) {
                newVacancy["photo"] = _uploadsPath + 'photo_' + photo.filename + path.extname(photo.originalname);
            }
        }

        var vacanciesContent = fs.readFileSync(_vacanciesPath + 'vacancies.json');

        var vacancies = (vacanciesContent.toString() === '' ? JSON.parse('[]') : JSON.parse(vacanciesContent));

        vacancies.push(newVacancy);

        var newVacancies = JSON.stringify(vacancies, true, 4);
        fs.writeFileSync(_vacanciesPath + 'vacancies.json', newVacancies);

    };

    return self;

};

module.exports = vacancy;