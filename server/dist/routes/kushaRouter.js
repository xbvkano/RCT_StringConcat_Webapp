"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var kushaController_1 = require("../controllers/kushaController");
var router = (0, express_1.Router)();
// Marcos routes
router.get('/', kushaController_1.getAllKushaEntriesCsv);
router.post('/', kushaController_1.createKushaEntry);
router.get('/:id', kushaController_1.getKushaEntryById);
exports.default = router;
//# sourceMappingURL=kushaRouter.js.map