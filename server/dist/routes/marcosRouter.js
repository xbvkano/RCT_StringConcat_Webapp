"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var marcosController_1 = require("../controllers/marcosController");
var router = (0, express_1.Router)();
// Marcos routes
router.get('/', marcosController_1.getAllEntriesCsv);
router.post('/', marcosController_1.createEntry);
router.get('/next-group', marcosController_1.getNextGroup);
router.get('/:id', marcosController_1.getEntryById);
exports.default = router;
//# sourceMappingURL=marcosRouter.js.map