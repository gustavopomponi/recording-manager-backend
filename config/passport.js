var passport = require('passport');
var ActiveDirectoryStrategy = require('passport-activedirectory');

passport.use(new ActiveDirectoryStrategy({
  integrated: false,
  ldap: {
    url: 'ldap://srv-dc.expocaccer.net',
    baseDN: 'DC=expocaccer,DC=net',
    username: 'administrador@expocaccer.net',
    password: 'a068629@@&'
  }
}, function (profile, ad, done) {
  ad.isUserMemberOf(profile._json.dn, 'v.tecnologia', function (err, isMember) {
    if (err) {
      return done(err);
      console.log(profile);
    }
    else {
      return done(null, profile)
    }
  })
}))
