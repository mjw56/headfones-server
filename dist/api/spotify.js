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
var node_fetch_1 = __importDefault(require("node-fetch"));
var dataloader_1 = __importDefault(require("dataloader"));
function makeHeaders(token) {
    return {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': "application/json"
    };
}
function cacheKeyFnForQueryKeys(key) {
    return serializeToURLParameters(key);
}
function serializeToURLParameters(obj) {
    return Object.entries(obj).map(function (_a) {
        var key = _a[0], val = _a[1];
        return val && key + "=" + val;
    })
        .filter(function (i) { return i; })
        .join('&');
}
function checkResponseStatus(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fn.apply(void 0, args)];
                    case 1:
                        result = _a.sent();
                        if (result.status === 401) {
                            throw { status: 401, message: 'access token expired' };
                        }
                        else {
                            return [2 /*return*/, result.json()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
}
function saveTracksToLib(token, trackIds) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.spotify.com/v1/me/tracks?ids=" + trackIds.toString();
                    return [4 /*yield*/, node_fetch_1.default(url, {
                            method: 'PUT',
                            headers: makeHeaders(token)
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.saveTracksToLib = saveTracksToLib;
function removeTracksFromLib(token, trackIds) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.spotify.com/v1/me/tracks?ids=" + trackIds.toString();
                    return [4 /*yield*/, node_fetch_1.default(url, {
                            method: 'DELETE',
                            headers: makeHeaders(token)
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.removeTracksFromLib = removeTracksFromLib;
function followPlaylist(token, _a) {
    var ownerId = _a.ownerId, playlistId = _a.playlistId, _b = _a.isPublic, isPublic = _b === void 0 ? true : _b;
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    url = "https://api.spotify.com/v1/users/" + ownerId + "/playlists/" + playlistId + "/followers";
                    return [4 /*yield*/, node_fetch_1.default(url, {
                            method: 'PUT',
                            headers: makeHeaders(token),
                            body: JSON.stringify({ public: isPublic })
                        })];
                case 1: return [2 /*return*/, _c.sent()];
            }
        });
    });
}
exports.followPlaylist = followPlaylist;
function unfollowPlaylist(token, _a) {
    var ownerId = _a.ownerId, playlistId = _a.playlistId;
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = "https://api.spotify.com/v1/users/" + ownerId + "/playlists/" + playlistId + "/followers";
                    return [4 /*yield*/, node_fetch_1.default(url, {
                            method: 'DELETE',
                            headers: makeHeaders(token)
                        })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.unfollowPlaylist = unfollowPlaylist;
function getSavedContains(token, trackIds) {
    return __awaiter(this, void 0, void 0, function () {
        var url, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.spotify.com/v1/me/tracks/contains?ids=" + trackIds.toString();
                    return [4 /*yield*/, node_fetch_1.default(url, {
                            method: 'GET',
                            headers: makeHeaders(token)
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getSavedContains = getSavedContains;
function getFeaturedPlaylists(token, queryParams) {
    if (queryParams === void 0) { queryParams = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/browse/featured-playlists?" + serializeToURLParameters(queryParams), {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getFeaturedPlaylists = getFeaturedPlaylists;
function getCategoryPlaylists(token, id, queryParams) {
    if (queryParams === void 0) { queryParams = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/browse/categories/" + id + "/playlists?" + serializeToURLParameters(queryParams), {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getCategoryPlaylists = getCategoryPlaylists;
function getRecommendations(token, queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/recommendations?" + serializeToURLParameters(queryParams), {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getRecommendations = getRecommendations;
function getCategories(token, queryParams) {
    if (queryParams === void 0) { queryParams = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/browse/categories?" + serializeToURLParameters(queryParams), {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getCategories = getCategories;
function getCategory(token, id) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/browse/categories/" + id, {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getCategory = getCategory;
function getRecentlyPlayed(token) {
    return __awaiter(this, void 0, void 0, function () {
        var url, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.spotify.com/v1/me/player/recently-played?limit=50";
                    return [4 /*yield*/, node_fetch_1.default(url, {
                            method: 'GET',
                            headers: makeHeaders(token)
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getRecentlyPlayed = getRecentlyPlayed;
function getTopType(token, params) {
    return __awaiter(this, void 0, void 0, function () {
        var type, limit, offset, time_range, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    type = params.type, limit = params.limit, offset = params.offset, time_range = params.time_range;
                    return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/me/top/" + type + "?" + serializeToURLParameters({ limit: limit, offset: offset, time_range: time_range }), {
                            method: 'GET',
                            headers: makeHeaders(token)
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getTopType = getTopType;
function getPlaylist(token, userId, playlistId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/users/" + userId + "/playlists/" + playlistId, {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getPlaylist = getPlaylist;
function getUser(token, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/users/" + userId, {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getUser = getUser;
function getMe(token) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/me", {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getMe = getMe;
function getPlaylistTracks(token, _a) {
    var userId = _a.userId, playlistId = _a.playlistId, _b = _a.limit, limit = _b === void 0 ? 100 : _b, _c = _a.offset, offset = _c === void 0 ? 0 : _c;
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/users/" + userId + "/playlists/" + playlistId + "/tracks?" + serializeToURLParameters({ limit: limit, offset: offset }), {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _d.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _d.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getPlaylistTracks = getPlaylistTracks;
function getPlaylistFollowersContains(token, _a) {
    var playlistUserId = _a.playlistUserId, playlistId = _a.playlistId, userIds = _a.userIds;
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/users/" + playlistUserId + "/playlists/" + playlistId + "/followers/contains?ids=" + userIds.toString(), {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _b.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getPlaylistFollowersContains = getPlaylistFollowersContains;
function getAlbum(token, id) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/albums/" + id.toString(), {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getAlbum = getAlbum;
function getAlbums(token, ids) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/albums?ids=" + ids.toString(), {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getAlbums = getAlbums;
function getTrack(token, id) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/tracks/" + id.toString(), {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getTrack = getTrack;
function getTracks(token, ids) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/tracks?ids=" + ids.toString(), {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getTracks = getTracks;
function getArtist(token, id) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/artists/" + id.toString(), {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getArtist = getArtist;
function getArtistBio(token, id) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://spclient.wg.spotify.com/open-backend-2/v1/artists/" + id, {
                        method: 'OPTIONS',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    // TODO: this will not work, need alternative
                    res = _a.sent();
                    return [2 /*return*/, {}];
            }
        });
    });
}
exports.getArtistBio = getArtistBio;
function getArtistTopTracks(token, id) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/artists/" + id.toString() + "/top-tracks?country=US", {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getArtistTopTracks = getArtistTopTracks;
function getArtists(token, ids) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/artists?ids=" + ids.toString(), {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getArtists = getArtists;
function getAudioFeatures(token, ids) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.spotify.com/v1/audio-features/?ids=" + ids.toString(), {
                        method: 'GET',
                        headers: makeHeaders(token)
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getAudioFeatures = getAudioFeatures;
function search(token, query) {
    if (query === void 0) { query = ''; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, node_fetch_1.default("https://api.spotify.com/v1/search/?q=" + encodeURIComponent(query) + "*&type=album,artist,playlist,track", {
                    method: 'GET',
                    headers: makeHeaders(token)
                })];
        });
    });
}
exports.search = search;
function makeUserLoader(token) {
    var _this = this;
    var batchLoadFn = function (_a) {
        var key = _a[0];
        return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = key;
                        return [4 /*yield*/, getUser(token, userId)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, [user]];
                }
            });
        });
    };
    return new dataloader_1.default(batchLoadFn, { batch: false });
}
exports.makeUserLoader = makeUserLoader;
function makePlaylistLoader(token) {
    var _this = this;
    var batchLoadFn = function (_a) {
        var key = _a[0];
        return __awaiter(_this, void 0, void 0, function () {
            var userId, playlistId, playlist;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = key.userId, playlistId = key.playlistId;
                        return [4 /*yield*/, getPlaylist(token, userId, playlistId)];
                    case 1:
                        playlist = _b.sent();
                        return [2 /*return*/, [playlist]];
                }
            });
        });
    };
    return new dataloader_1.default(batchLoadFn, { batch: false });
}
exports.makePlaylistLoader = makePlaylistLoader;
function makePlaylistTracksLoader(token) {
    var _this = this;
    var batchLoadFn = function (_a) {
        var key = _a[0];
        return __awaiter(_this, void 0, void 0, function () {
            var tracks;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getPlaylistTracks(token, key)];
                    case 1:
                        tracks = _b.sent();
                        return [2 /*return*/, [tracks]];
                }
            });
        });
    };
    return new dataloader_1.default(batchLoadFn, { batch: false });
}
exports.makePlaylistTracksLoader = makePlaylistTracksLoader;
function makeAlbumsLoader(token) {
    var _this = this;
    var batchLoadFn = function (keys) { return __awaiter(_this, void 0, void 0, function () {
        var albums;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAlbums(token, keys)];
                case 1:
                    albums = (_a.sent()).albums;
                    return [2 /*return*/, albums];
            }
        });
    }); };
    return new dataloader_1.default(batchLoadFn, { maxBatchSize: 20 });
}
exports.makeAlbumsLoader = makeAlbumsLoader;
function makeArtistsLoader(token) {
    var _this = this;
    var batchLoadFn = function (keys) { return __awaiter(_this, void 0, void 0, function () {
        var artists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getArtists(token, keys)];
                case 1:
                    artists = (_a.sent()).artists;
                    return [2 /*return*/, artists];
            }
        });
    }); };
    return new dataloader_1.default(batchLoadFn, { maxBatchSize: 50 });
}
exports.makeArtistsLoader = makeArtistsLoader;
function makeTracksLoader(token) {
    var _this = this;
    var batchLoadFn = function (keys) { return __awaiter(_this, void 0, void 0, function () {
        var tracks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTracks(token, keys)];
                case 1:
                    tracks = (_a.sent()).tracks;
                    return [2 /*return*/, tracks];
            }
        });
    }); };
    return new dataloader_1.default(batchLoadFn, { maxBatchSize: 50 });
}
exports.makeTracksLoader = makeTracksLoader;
function makeSavedContainsLoader(token) {
    var _this = this;
    var batchLoadFn = function (keys) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSavedContains(token, keys)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    return new dataloader_1.default(batchLoadFn, { maxBatchSize: 50 });
}
exports.makeSavedContainsLoader = makeSavedContainsLoader;
function makeAudioFeaturesLoader(token) {
    var _this = this;
    var batchLoadFn = function (keys) { return __awaiter(_this, void 0, void 0, function () {
        var audio_features;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAudioFeatures(token, keys)];
                case 1:
                    audio_features = (_a.sent()).audio_features;
                    return [2 /*return*/, audio_features];
            }
        });
    }); };
    return new dataloader_1.default(batchLoadFn, { maxBatchSize: 50 });
}
exports.makeAudioFeaturesLoader = makeAudioFeaturesLoader;
function makeCategoriesLoader(token) {
    var _this = this;
    var batchLoadFn = function (_a) {
        var key = _a[0];
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getCategories(token, key)];
                    case 1: return [2 /*return*/, [_b.sent()]];
                }
            });
        });
    };
    return new dataloader_1.default(batchLoadFn, { batch: false, cacheKeyFn: cacheKeyFnForQueryKeys });
}
exports.makeCategoriesLoader = makeCategoriesLoader;
function makeCategoryLoader(token) {
    var _this = this;
    var batchLoadFn = function (_a) {
        var key = _a[0];
        return __awaiter(_this, void 0, void 0, function () {
            var category;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getCategory(token, key)];
                    case 1:
                        category = _b.sent();
                        return [2 /*return*/, [category]];
                }
            });
        });
    };
    return new dataloader_1.default(batchLoadFn, { batch: false });
}
exports.makeCategoryLoader = makeCategoryLoader;
function makeCategoriesPlaylistsLoader(token) {
    var _this = this;
    var batchLoadFn = function (_a) {
        var _b = _a[0], id = _b.id, queryParams = _b.queryParams;
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, getCategoryPlaylists(token, id, queryParams)];
                    case 1: return [2 /*return*/, [_c.sent()]];
                }
            });
        });
    };
    return new dataloader_1.default(batchLoadFn, { batch: false, cacheKeyFn: cacheKeyFnForQueryKeys });
}
exports.makeCategoriesPlaylistsLoader = makeCategoriesPlaylistsLoader;
function makeRecommendationsLoader(token) {
    var _this = this;
    var batchLoadFn = function (_a) {
        var key = _a[0];
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getRecommendations(token, key)];
                    case 1: return [2 /*return*/, [_b.sent()]];
                }
            });
        });
    };
    return new dataloader_1.default(batchLoadFn, { batch: false, cacheKeyFn: cacheKeyFnForQueryKeys });
}
exports.makeRecommendationsLoader = makeRecommendationsLoader;
function makeGetTopTypeLoader(token) {
    var _this = this;
    var batchLoadFn = function (_a) {
        var key = _a[0];
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getTopType(token, key)];
                    case 1: return [2 /*return*/, [_b.sent()]];
                }
            });
        });
    };
    return new dataloader_1.default(batchLoadFn, { batch: false, cacheKeyFn: cacheKeyFnForQueryKeys });
}
exports.makeGetTopTypeLoader = makeGetTopTypeLoader;
function makePlaylistFollowersContainsLoader(token) {
    var _this = this;
    var batchLoadFn = function (_a) {
        var key = _a[0];
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getPlaylistFollowersContains(token, key)];
                    case 1: return [2 /*return*/, [_b.sent()]];
                }
            });
        });
    };
    return new dataloader_1.default(batchLoadFn, { batch: false, cacheKeyFn: cacheKeyFnForQueryKeys });
}
exports.makePlaylistFollowersContainsLoader = makePlaylistFollowersContainsLoader;
// Skipping the dataloader just here since the loader is meant to called with only .load()
// Use it the same way as you would with a dataloader, i.e only on per request basis
function makeMeLoader(token) {
    var _this = this;
    var cacheMe = null;
    return {
        load: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!cacheMe) return [3 /*break*/, 2];
                        return [4 /*yield*/, getMe(token)];
                    case 1:
                        cacheMe = _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, cacheMe];
                }
            });
        }); }
    };
}
exports.makeMeLoader = makeMeLoader;
function makeLoaders(token) {
    return {
        UserLoader: makeUserLoader(token),
        PlaylistLoader: makePlaylistLoader(token),
        PlaylistTracksLoader: makePlaylistTracksLoader(token),
        AlbumsLoader: makeAlbumsLoader(token),
        ArtistsLoader: makeArtistsLoader(token),
        TracksLoader: makeTracksLoader(token),
        SavedContainsLoader: makeSavedContainsLoader(token),
        AudioFeaturesLoader: makeAudioFeaturesLoader(token),
        CategoriesLoader: makeCategoriesLoader(token),
        RecommendationsLoader: makeRecommendationsLoader(token),
        CategoryPlaylistLoader: makeCategoriesPlaylistsLoader(token),
        CategoryLoader: makeCategoryLoader(token),
        TopTypeLoader: makeGetTopTypeLoader(token),
        PlaylistFollowersContainsLoader: makePlaylistFollowersContainsLoader(token),
        MeLoader: makeMeLoader(token)
    };
}
exports.makeLoaders = makeLoaders;
exports.default = {
    getAlbum: getAlbum,
    getAlbums: getAlbums,
    getArtist: getArtist,
    getArtistBio: getArtistBio,
    getArtistTopTracks: getArtistTopTracks,
    getArtists: getArtists,
    getPlaylist: getPlaylist,
    getTrack: getTrack,
    getTracks: getTracks,
    getRecentlyPlayed: getRecentlyPlayed,
    search: checkResponseStatus(search)
};
//# sourceMappingURL=spotify.js.map