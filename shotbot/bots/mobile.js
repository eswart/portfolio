const ShotBot = require('../shotbot.config');
const Bot = require('ics-shotbot/bot');


var mobileBot = require('./_master');

console.log('mobile shotbot here [-c°▃°]-c');
mobileBot.sizes.push(ShotBot.options.sizes.mobile);
mobileBot.options.destination = ShotBot.options.destination + '/mobile/';

// Return your Job created above
module.exports = mobileBot;
