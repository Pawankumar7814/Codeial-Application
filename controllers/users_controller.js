module.exports.profile = function(req, res) {
    // return res.end('user profile page');
    return res.status(200).render('profile', {
        title: "Profile - Codeial"
    })
}