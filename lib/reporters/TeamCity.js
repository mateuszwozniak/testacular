var BaseReporter = require('./Base');

module.exports = function TeamCity(formatError, reportSlow) {
    BaseReporter.call(this, formatError, reportSlow); 

    this.specSuccess = function (browser, result) {
        this.write(this.createTcOutputLine('testFinished', {
            name: result.suite[0] + ' ' + result.description,
            duration: result.time 
        }));
    }; 

    this.specFailure = function (browser, result) {
        this.write(this.createTcOutputLine('testFailed', {
            name: result.suite[0] + ' ' + result.description,
            duration: result.time,
            message: result.log.join(' - ')
        }));
    };

    this.specSkipped = function (browser, result) {
        this.write(this.createTcOutputLine('testIgnored', {
            name: result.suite[0] + ' ' + result.description
        }));
    };

    this.onRunStart = function (browsers) {
        this.write(this.createTcOutputLine('testSuiteStarted', {
            name: 'testacular suite'
        }));
    };

    this.onRunComplete = function (browsers, results) {
        this.write(this.createTcOutputLine('testSuiteFinished', {
            name: 'testacular.suite'
        }));
    };

    this.createTcOutputLine = function (label, args) {
        var attributes = Object.keys(args).map(function (key) {
            return key + "='" + args[key] + "'";
        });
        return "##teamcity[" + label + " " + attributes.join(' ') + "]\n";
    };
};
