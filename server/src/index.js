"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const marcosRouter_1 = __importDefault(require("./routes/marcosRouter")); // make sure this path matches your file name
const kushaRouter_1 = __importDefault(require("./routes/kushaRouter"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// health check
app.get('/', (_req, res) => {
    res.send('Server is running!');
});
// all /marcos endpoints
app.use('/marcos', marcosRouter_1.default);
app.use('/kusha', kushaRouter_1.default);
// error handler (must have 4 params: (err, req, res, next))
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀  Server ready at http://localhost:${PORT}`));
