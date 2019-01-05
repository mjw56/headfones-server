"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport_spotify_1 = require("passport-spotify");
exports.default = new passport_spotify_1.Strategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_REDIRECT,
    passReqToCallback: true,
    proxy: true
}, function (request, accessToken, refreshToken, expires_in, profile, done) {
    process.nextTick(function () {
        done(null, Object.assign({}, profile, { accessToken: accessToken, refreshToken: refreshToken, expires_in: expires_in }));
    });
});
//# sourceMappingURL=strategy.js.map