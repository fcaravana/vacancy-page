var contacts = function () {

    /**
     * Self, for public properties and methods.
     */
    var self = {};

    /**
     * Private properties, start with _{name}.
     */
    var _req = null;
    var _res = null;

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

        console.log(req.body);
        console.log(req.files);
        res.send("ok");

    };

    return self;

};

module.exports = contacts;