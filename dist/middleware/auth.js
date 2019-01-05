"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    else {
        res.redirect('/login');
    }
});
//# sourceMappingURL=auth.js.map