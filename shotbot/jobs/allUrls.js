const ShotBot = require('../shotbot.config');
const Job = require('@inVentiv/shotbot/job');

module.exports = function allUrls() {

    // All urls in config, options.urls
    var job = new Job('All Page URLs');
    job.urls = ShotBot.options.urls;

    job.addHelper('embedISIIntoPage');
    job.addHelper('hideAutoplayVideo');

    return job;
}
