"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var resolvers_1 = __importDefault(require("./resolvers"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var passport_1 = __importDefault(require("passport"));
var passport_oauth2_refresh_1 = __importDefault(require("passport-oauth2-refresh"));
var apollo_errors_1 = require("apollo-errors");
var database_1 = require("./database");
var routes_1 = __importDefault(require("./routes"));
var middleware_1 = __importDefault(require("./middleware"));
var strategy_1 = __importDefault(require("./services/jwt/strategy"));
var strategy_2 = __importDefault(require("./services/spotify/strategy"));
var debug_1 = __importDefault(require("./services/debug"));
var config_1 = require("./config");
var server = new graphql_yoga_1.GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: resolvers_1.default,
    context: function (req, res) {
        var response = req.response;
        var user = req.request.user;
        return { response: response, user: user };
    }
});
database_1.initDatabase();
passport_1.default.use(strategy_2.default);
passport_oauth2_refresh_1.default.use(strategy_2.default);
passport_1.default.use('jwt', strategy_1.default);
server.use(cookie_parser_1.default());
server.use(body_parser_1.default());
server.use(passport_1.default.initialize());
debug_1.default(server);
server.use('/auth/connect', middleware_1.default.spotify.redirect, function () { });
server.use('/auth/callback', middleware_1.default.spotify.base, routes_1.default.login);
server.use('/logout', routes_1.default.logout);
server.use('/app', middleware_1.default.auth, routes_1.default.app);
server.use('/user', passport_1.default.authenticate(['jwt'], { session: false }), routes_1.default.user);
server.use('/token', passport_1.default.authenticate(['jwt'], { session: false }), routes_1.default.token);
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    server.use(express_1.default.static(path_1.default.join(__dirname, '../../', 'client/build')));
    // Handle React routing, return all requests to React app
    server.get(/^\/(?!playground).*/, function (req, res) {
        res.sendFile('index.html', { root: path_1.default.join(__dirname, '../../', 'client/build') });
    });
}
var options = {
    endpoint: '/graphql',
    port: config_1.PORT,
    playground: '/playground',
    formatError: apollo_errors_1.formatError
};
server.express.use(cookie_parser_1.default());
server.express.use(passport_1.default.initialize());
server.express.post('/graphql', passport_1.default.authenticate(['jwt'], { session: false }));
server.start(options, function () { return console.log("Server is running on http://localhost:" + config_1.PORT); });
//# sourceMappingURL=index.js.map