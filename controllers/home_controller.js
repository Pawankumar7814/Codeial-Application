module.exports.home = function(req, res) {
    return res.status(200).render('home', {
        title: "Home - Codeial"
    });
    // return res.end('EXpress is up for codeial');
}