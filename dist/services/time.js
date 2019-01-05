"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeExpires = function (expires_in) {
    if (expires_in === void 0) { expires_in = 3600; }
    var timeExpires = new Date();
    // give ourselves a little breathing room before it actually expires
    timeExpires.setSeconds(timeExpires.getSeconds() + (expires_in * .9));
    return timeExpires;
};
exports.getMinutesUntilExpiration = function (timeExpires) {
    var diff = new Date(timeExpires) - new Date();
    return Math.floor((diff / 1000) / 60);
};
//# sourceMappingURL=time.js.map