const ShotBot = require('../shotbot.config');
const Bot = require('ics-shotbot/bot');


var desktopBot = require('./_master');

console.log('desktop shotbot here [-c°▃°]-c');
desktopBot.sizes.push(ShotBot.options.sizes.desktop);
desktopBot.options.destination = ShotBot.options.destination + '/desktop/';

// Return your Job created above
module.exports = desktopBot;
