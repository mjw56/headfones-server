"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res) {
    req.logout();
    res.clearCookie('jwt');
    res.json({ success: true });
});
//# sourceMappingURL=logout.js.map