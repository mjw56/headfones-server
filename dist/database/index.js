"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
exports.initDatabase = function () {
    var MONGO_URI = process.env.NODE_ENV === 'production'
        ? process.env.MONGO_DB_URI_PROD
        : process.env.MONGO_DB_URI_DEV;
    mongoose_1.default.connect(MONGO_URI);
    var db = mongoose_1.default.connection;
    db.on('error', console.error);
    db.once('open', function () {
        console.log("\u2705   MongoDB connection established!");
    });
};
//# sourceMappingURL=index.js.map