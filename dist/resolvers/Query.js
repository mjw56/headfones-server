"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var spotify_1 = __importDefault(require("../api/spotify"));
function handleErrors(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fn.apply(void 0, args)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
}
function artist(parent, _a, ctx, info) {
    var id = _a.id;
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, spotify_1.default.getArtist(ctx.user.accessToken, id)];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
;
function artistBio(parent, _a, ctx, info) {
    var id = _a.id;
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, spotify_1.default.getArtistBio(ctx.user.accessToken, id)];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function artistTopTracks(parent, _a, ctx, info) {
    var id = _a.id;
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, spotify_1.default.getArtistTopTracks(ctx.user.accessToken, id)];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function artists(parent, _a, ctx, info) {
    var ids = _a.ids;
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, spotify_1.default.getArtists(ctx.user.accessToken, ids)];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
;
function album(parent, _a, ctx, info) {
    var id = _a.id;
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, spotify_1.default.getAlbum(ctx.user.accessToken, id)];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
;
function albums(parent, _a, ctx, info) {
    var ids = _a.ids;
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, spotify_1.default.getAlbums(ctx.user.accessToken, ids)];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
;
function playlist(parent, _a, ctx, info) {
    var userId = _a.userId, playlistId = _a.playlistId;
    return __awaiter(this, void 0, void 0, function () {
        var playlist;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, spotify_1.default.getPlaylist(ctx.user.accessToken, userId, playlistId)];
                case 1:
                    playlist = _b.sent();
                    return [2 /*return*/, playlist];
            }
        });
    });
}
;
function track(parent, _a, ctx, info) {
    var id = _a.id;
    return __awaiter(this, void 0, void 0, function () {
        var track;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, spotify_1.default.getTrack(ctx.user.accessToken, id)];
                case 1:
                    track = _b.sent();
                    return [2 /*return*/, track];
            }
        });
    });
}
;
function tracks(parent, _a, ctx, info) {
    var ids = _a.ids;
    return spotify_1.default.getTracks(ctx.user.accessToken, ids);
}
;
function recentlyPlayed(parent, _a, ctx, info) {
    return __awaiter(this, void 0, void 0, function () {
        var items, recent;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, spotify_1.default.getRecentlyPlayed(ctx.user.accessToken)];
                case 1:
                    items = (_b.sent()).items;
                    recent = items.map(function (i) { return i.track; });
                    return [2 /*return*/, recent];
            }
        });
    });
}
;
function search(parent, _a, ctx, info) {
    var query = _a.query;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, spotify_1.default.search(ctx.user.accessToken, query)];
        });
    });
}
exports.Query = {
    album: handleErrors(album),
    artist: handleErrors(artist),
    artistBio: handleErrors(artistBio),
    artistTopTracks: handleErrors(artistTopTracks),
    playlist: handleErrors(playlist),
    search: handleErrors(search)
};
//# sourceMappingURL=Query.js.map