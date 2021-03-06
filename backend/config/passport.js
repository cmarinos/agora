var SamlStrategy = require('passport-saml').Strategy;

module.exports = function (passport, conf) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.use(new SamlStrategy({
    path: conf.passport.saml.path,
    entryPoint: conf.passport.saml.entryPoint,
    issuer: conf.passport.saml.issuer,
    callbackUrl: conf.passport.saml.callbackUrl,
    identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
    serviceName: conf.passport.saml.serviceName,
    serviceDescription: conf.passport.saml.serviceDescription,
    requestedAttributes: conf.passport.saml.requestedAttributes,
    decryptionCert: conf.passport.saml.decryptionCert,
    decryptionPvk: conf.passport.saml.decryptionPvk,
    privateCert: conf.passport.saml.privateCert,
    publicCert: conf.passport.saml.publicCert,
    disableRequestedAuthnContext: conf.passport.saml.disableRequestedAuthnContext
  },
  function(profile, done) {
    id = profile.nameID ||
          profile['urn:oid:1.3.6.1.4.1.5923.1.1.1.10'] ||
          profile.eduPersonTargetedID ||
          profile['urn:oid:1.3.6.1.4.1.5923.1.1.1.6'] ||
          profile.eduPersonPrincipalName ;

    email = profile['urn:oid:0.9.2342.19200300.100.1.3'] ||
            profile.mail ||
            profile.email ;

    displayName = profile['urn:oid:0.9.2342.19200300.100.1.3'] ||
                  profile.displayName ||
                  profile['urn:oid:2.5.4.3'] ||
                  profile.cn ;

    firstName = profile['urn:oid:2.5.4.42'] || profile.givenName ;
    lastName = profile['urn:oid:2.5.4.4'] || profile.sn ;
    return done(null, {
      id : id,
      email : email,
      displayName : displayName,
      firstName : firstName,
      lastName : lastName
    });
  })
);
};
