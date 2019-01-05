"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema_1 = require("../schema");
var User = mongoose_1.default.model('User', schema_1.userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map