const ShotBot = require('../shotbot.config');
const Bot = require('@inVentiv/shotbot/bot');

var masterBot = new Bot();

// masterBot.addUrl('/').withHelpers('hideAutoplayVideo').withHelpers('showStickyISI')
// masterBot.addUrl('/').withHelpers('hideClickToActivateWithinMessage').withHelpers('embedISIIntoPage').withHelpers('hideAutoplayVideo')
// masterBot.addUrl('/about-trulicity.html').withHelpers('embedISIIntoPage');
// masterBot.addUrl('/how-to-use.html').withHelpers('embedISIIntoPage');
// masterBot.addUrl('/getting-started.html').withHelpers('embedISIIntoPage');
// masterBot.addUrl('/getting-started.html').withHelpers('showForms').withHelpers('embedISIIntoPage')
// masterBot.addUrl('/getting-started.html#submit-email-form').withHelpers('showForms').withHelpers('embedISIIntoPage').withHelpers("hashToClick");
// masterBot.addUrl('/getting-started.html#email-signup-form').withHelpers('showForms').withHelpers('embedISIIntoPage').withHelpers("hashToTestFormSubmit");
// masterBot.addUrl('/getting-started.html#email-signup-form').withHelpers('showForms').withHelpers('embedISIIntoPage').withHelpers("hashToTestFormError");
// masterBot.addUrl('/getting-started.html#submit-sharps-form').withHelpers('showForms').withHelpers('embedISIIntoPage').withHelpers("hashToClick");
// masterBot.addUrl('/getting-started.html#sharps-container-form').withHelpers('showForms').withHelpers('embedISIIntoPage').withHelpers("hashToTestFormSubmit");
// masterBot.addUrl('/what-to-expect.html').withHelpers('embedISIIntoPage')
// masterBot.addUrl('/about-type-2-diabetes.html').withHelpers('embedISIIntoPage');
// masterBot.addUrl('/diabetes-treatment-savings-card-and-support.html').withHelpers('embedISIIntoPage');
// masterBot.addUrl('/diabetes-treatment-savings-card-and-support.html#example-exit-modal').withHelpers('embedISIIntoPage').withHelpers("hashToClick");
// masterBot.addUrl('/diabetes-treatment-savings-card-and-support.html').withHelpers('embedISIIntoPage').withHelpers('showForms');
// masterBot.addUrl('/diabetes-treatment-savings-card-and-support.html#email-savings-card').withHelpers('embedISIIntoPage').withHelpers('showForms').withHelpers("hashToClick");
// masterBot.addUrl('/diabetes-treatment-savings-card-and-support.html#discount-card-get').withHelpers('embedISIIntoPage').withHelpers('showForms').withHelpers("hashToTestFormSubmit");
// masterBot.addUrl('/diabetes-treatment-savings-card-and-support.html#activate-savings-card').withHelpers('embedISIIntoPage').withHelpers('showForms').withHelpers("hashToClick");
// masterBot.addUrl('/diabetes-treatment-savings-card-and-support.html#discount-card-activate').withHelpers('embedISIIntoPage').withHelpers('showForms').withHelpers("hashToTestFormSubmit");
// masterBot.addUrl('/contact.html').withHelpers('embedISIIntoPage')

// masterBot.addUrl('/healthcare-professionals.html').withHelpers('embedISIIntoPage')
// masterBot.addUrl('/healthcare-professionals.html').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal');
// masterBot.addUrl('/healthcare-professionals.html#menu').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal').withHelpers("hashToClick");
// masterBot.addUrl('/healthcare-professionals-treating-type-2-diabetes-patients.html').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal');
// masterBot.addUrl('/healthcare-professionals-a1c-reduction-clinical-study.html').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal');
/* Mobile ONLY */ masterBot.addUrl('/healthcare-professionals-a1c-reduction-clinical-study.html').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal').withHelpers('showStudyDesigns');
// masterBot.addUrl('/healthcare-professionals-impact-on-blood-glucose.html').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal');
/* Mobile ONLY */ masterBot.addUrl('/healthcare-professionals-impact-on-blood-glucose.html').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal').withHelpers('showStudyDesigns');
// masterBot.addUrl('/healthcare-professionals-glp-1-ra-therapy-and-administration.html').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal');
// masterBot.addUrl('/healthcare-professionals-adverse-reactions.html').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal');
// masterBot.addUrl('/healthcare-professionals-prescribing-type-2-diabetes-therapy.html').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal');
// masterBot.addUrl('/type-2-diabetes-information.html').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal');
// masterBot.addUrl('/healthcare-professionals-educational-videos.html').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal');
// masterBot.addUrl('/healthcare-professionals-savings-card.html').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal');
// masterBot.addUrl('/healthcare-professionals-savings-card.html#submit-hcp-savings-card-form').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal').withHelpers("hashToClick");
// masterBot.addUrl('/healthcare-professionals-savings-card.html#hcp-savings-card-form').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal').withHelpers("hashToTestFormSubmit");
// masterBot.addUrl('/healthcare-professionals-contact.html').withHelpers('embedISIIntoPage').withHelpers('hideHCPModal');

// masterBot.addUrl('/sitemap.html').withHelpers('embedISIIntoPage')
// masterBot.addUrl('/unsubscribe.html').withHelpers('embedISIIntoPage')
// masterBot.addUrl('/unsubscribe.html#unsubscribe-form-submit').withHelpers('embedISIIntoPage').withHelpers("hashToClick");
// masterBot.addUrl('/unsubscribe.html#unsubscribe-form').withHelpers('embedISIIntoPage').withHelpers("hashToTestFormSubmit");


// Return your Job created oabuve
module.exports = masterBot;
