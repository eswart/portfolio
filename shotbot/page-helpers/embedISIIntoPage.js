// Change .hcp-modal selector to suit your project markup
module.exports = function embedISIIntoPage() {
    setTimeout(function(){
        $('body').removeClass('isi--fixed');
    }, 100)
};
