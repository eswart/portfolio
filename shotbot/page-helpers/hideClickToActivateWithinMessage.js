// Change .hcp-modal selector to suit your project markup
module.exports = function hideClickToActivateWithinMessage() {
    setTimeout(function(){
        $('.home-hero').removeClass('home-hero--activate');
    }, 100)
};
