var helpers = new require('../../shared/helpers/helpers')();
var fs = require('fs'), path = require('path'), nodemailer = require('nodemailer');

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

    self.error = false;
    self.errorCode = null;

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

        if (_verifyFields()) {
            _saveVacancyFiles(req.files);
            _saveVacancy(req.body);
        }
    };

    /**
     * Verify form fields.
     * 
     * @returns {boolean}
     */
    var _verifyFields = function () {

        var fields = _req.body;
        if (!fields.first_name || !fields.last_name || !fields.city || !fields.country || !fields.email || !fields.phone || !fields.motivation) {
            self.errorCode = 1;
        }

        if (!helpers.validateEmail(fields.email)) {
            self.errorCode = 2;
        }

        if (_req.files.resume) {
            var resume = _req.files.resume[0];
            if (path.extname(resume.originalname) !== '.pdf') {
                self.errorCode = 3;
            }
        }

        if (_req.files.portfolio) {
            var portfolio = _req.files.portfolio[0];
            if (portfolio && (path.extname(portfolio.originalname) !== '.doc' && path.extname(portfolio.originalname) !== '.docx')) {
                self.errorCode = 4;
            }
        }

        if (_req.files.photo) {
            var photo = _req.files.photo[0];
            if (photo && (path.extname(photo.originalname) !== '.jpg' && path.extname(photo.originalname) !== '.jpeg')) {
                self.errorCode = 5;
                fs.unlinkSync(photo.path);
            }
        }

        if (self.errorCode !== null) {
            self.error = true;

            if (_req.files.resume) {
                fs.unlinkSync(resume.path);
            }

            if (_req.files.portfolio) {
                fs.unlinkSync(portfolio.path);
            }

            if (_req.files.photo) {
                fs.unlinkSync(photo.path);
            }
        }

        return (!self.error);
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
            }
        }

        if (files.portfolio) {
            var portfolio = files.portfolio[0];
            if (portfolio && (path.extname(portfolio.originalname) === '.doc' || path.extname(portfolio.originalname) === '.docx')) {
                _saveFile(portfolio, 'portfolio_' + portfolio.filename + path.extname(portfolio.originalname));
            }
        }

        if (files.photo) {
            var photo = files.photo[0];
            if (photo && (path.extname(photo.originalname) === '.jpg' || path.extname(photo.originalname) === '.jpeg')) {
                _saveFile(photo, 'photo_' + photo.filename + path.extname(photo.originalname));
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
            newVacancy['copy'] = 'false';
        }

        if (_req.files.resume) {
            var resume = _req.files.resume[0];
            newVacancy['resume'] = _uploadsPath + 'resume_' + resume.filename + path.extname(resume.originalname);
        }

        if (_req.files.portfolio) {
            var portfolio = _req.files.portfolio[0];
            newVacancy['portfolio'] = _uploadsPath + 'portfolio_' + portfolio.filename + path.extname(portfolio.originalname);
        }

        if (_req.files.photo) {
            var photo = _req.files.photo[0];
            newVacancy['photo'] = _uploadsPath + 'photo_' + photo.filename + path.extname(photo.originalname);
        }

        var vacanciesContent = fs.readFileSync(_vacanciesPath + 'vacancies.json');

        var vacancies = (vacanciesContent.toString() === '' ? JSON.parse('[]') : JSON.parse(vacanciesContent));

        vacancies.push(newVacancy);

        var newVacancies = JSON.stringify(vacancies, true, 4);
        fs.writeFileSync(_vacanciesPath + 'vacancies.json', newVacancies);

        if (newVacancy.copy === 'true') {
            _sendMailCopy(newVacancy.email, 'Vacancy Submit', JSON.stringify(newVacancy, true, 4).replace(new RegExp(_uploadsPath, 'g'), ''));
        }
    };

    /**
     * Send mail to user with a copy of the form data.
     * 
     * @param {string} to mail
     * @param {string} subject subject
     * @param {string} text mail body
     * @returns {undefined}
     */
    var _sendMailCopy = function (to, subject, text) {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {user: 'fcaravana.meetings@gmail.com', pass: 'aminhapasse'}
        }, {
            from: 'fcaravana.meetings@gmail.com',
            headers: {'Vacancy-Page-Submit': 'Sent'}
        });

        transporter.sendMail({
            to: to,
            subject: subject,
            text: text
        });

    };

    return self;

};

module.exports = vacancy;