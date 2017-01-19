const ShotBot = require('@inVentiv/shotbot/options');

/**
 * Global Options.  Shared values for the project.  Update here for re-use across jobs
 * size, for every url with a title page for each section
 *
 * @property  "projectName"  Title used for cover Pages.  To skip the title page, leave blank
 * @property  "domain"  Base domain screenshot. No traling slash please
 * @property  "destination"  Folder where you want screenshots to showup in your project.  Defaults to 'ShotBots'
 * @property  [size]  Named object to setup sizes for project { mobile: 350, desktop: 1400 }
 * @property  [urls]  Optional URL Array. Urls can be stored her for use across multiple jobs or simpley passed into the jobs themselves as needed
 *
 */
ShotBot.options.projectName = "Trulicity.com";
// ShotBot.options.domain = "https://icsdevuser:icsrocks@trulicity-web.lamp.ics-dev.com";
ShotBot.options.domain = "http://Kenneth.Corbett:H4fRapru@stage-trulicityusen-v2.cp-access.com";
// ShotBot.options.domain = "http://localhost:9090";
ShotBot.options.destination = "./screenshots/"
ShotBot.options.sizes = {
  mobile: 375,
  desktop: 1400,
};
ShotBot.options.urls = [];

 /*****************************************************************
  * Export Options and jobs to ShotBot for processing.
  * DO NOT MOODIFY
  (\___/)
  < @ @ >
   |   |
   {o_o}
  *****************************************************************/
 module.exports = ShotBot;
