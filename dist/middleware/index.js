"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("./auth"));
var spotify_1 = __importDefault(require("./spotify"));
exports.default = {
    auth: auth_1.default,
    spotify: spotify_1.default
};
//# sourceMappingURL=index.js.map