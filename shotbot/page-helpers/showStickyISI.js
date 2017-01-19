// Change .hcp-modal selector to suit your project markup
module.exports = function hideClickToActivateWithinMessage() {
    setTimeout(function(){
        $('body').addClass('isi--fixed');
        $('.isi__fixed-spacer,footer').remove();
    }, 500)
};
