var helpers = function () {

    /**
     * Object self, for public properties and methods.
     */
    var self = {};

    /**
     * Validate email.
     * 
     * @param {string} email email
     * @returns {boolean}
     */
    self.validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    return self;

};

module.exports = helpers;