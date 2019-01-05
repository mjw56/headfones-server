"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJwt(user) {
    var token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, {
        expiresIn: 86400 * 30,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
        subject: user.id.toString()
    });
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, data) {
        console.log('token verification:', err, data);
    });
    return token;
}
exports.default = generateJwt;
//# sourceMappingURL=generateToken.js.map