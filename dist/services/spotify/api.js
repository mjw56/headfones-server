"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var time_1 = require("../time");
function getUserDetailsForToken(user) {
    var id = user.id, accessToken = user.accessToken, refreshToken = user.refreshToken, expires_in = user.expires_in;
    var timeExpires = time_1.getTimeExpires(expires_in);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        id: id,
        timeExpires: timeExpires
    };
}
exports.getUserDetailsForToken = getUserDetailsForToken;
//# sourceMappingURL=api.js.map