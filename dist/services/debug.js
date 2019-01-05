"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (app) {
    if (true) {
        var morgan = require('morgan');
        var uuid_1 = require('node-uuid');
        morgan.token('id', function (req) {
            return req.id;
        });
        morgan.token('cookie', function (req, res) {
            return req.headers['cookie'];
        });
        var assignId = function (req, res, next) {
            req.id = uuid_1.v4();
            next();
        };
        app.use(assignId);
        app.use(morgan(':id :method :url :cookie :response-time'));
    }
});
//# sourceMappingURL=debug.js.map