"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server/index.ts
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var marcosRouter_1 = __importDefault(require("./routes/marcosRouter")); // make sure this path matches your file name
var kushaRouter_1 = __importDefault(require("./routes/kushaRouter"));
var errorHandler_1 = require("./middlewares/errorHandler");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// health check
app.get('/', function (_req, res) {
    res.send('Server is running!');
});
// all /marcos endpoints
app.use('/marcos', marcosRouter_1.default);
app.use('/kusha', kushaRouter_1.default);
// error handler (must have 4 params: (err, req, res, next))
app.use(errorHandler_1.errorHandler);
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    return console.log("\uD83D\uDE80  Server ready at http://localhost:".concat(PORT));
});
//# sourceMappingURL=index.js.map