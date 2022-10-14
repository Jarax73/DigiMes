const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/users");
const passport = require("passport");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Random string";

passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        const user = await User.findOne({ _id: jwt_payload.id });
        if (!user) return done("Error", false);
        console.log(user);
        return done(null, user);
        // User.findOne({ id: jwt_payload.id }, function (err, user) {
        //     console.log(jwt_payload.id);
        //     if (err) {
        //         return done(err, false);
        //     }
        //     if (user) {
        //         console.log(user._id);
        //         return done(null, user);
        //     } else {
        //         return done(null, false);
        //         // or you could create a new account
        //     }
        // });
    })
);
