var TeamCity = require('./TeamCity');

module.exports = function TeamCityColor(formatError, reportSlow) {
    TeamCity.call(this, formatError, reportSlow);       

    this.SUCCESS_COLOR = '\x1B[32m';
    this.FAILURE_COLOR = '\x1B[31m';
};