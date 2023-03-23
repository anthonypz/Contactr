module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        console.log('User is authenticated')
        return next()
      } else {
        res.redirect('/')
      }
    }
  }
  