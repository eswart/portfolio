const ShotBot = require('../shotbot.config');
const Job = require('ics-shotbot/job');

module.exports = function allUrls(url) {

    var job = new Job('Page: ' + url);
    job.urls = [url];

    return job;
}
