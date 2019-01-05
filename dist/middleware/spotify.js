"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var scope_json_1 = __importDefault(require("../scope.json"));
var SCOPE_VALUES = scope_json_1.default.SCOPE_VALUES;
var base = passport_1.default.authenticate('spotify', { session: false, failureRedirect: '/' });
var redirect = function (req, res, next) {
    return passport_1.default.authenticate('spotify', {
        scope: SCOPE_VALUES,
        showDialog: true,
        session: false
    })(req, res, next);
};
exports.default = {
    base: base,
    redirect: redirect
};
//# sourceMappingURL=spotify.js.map