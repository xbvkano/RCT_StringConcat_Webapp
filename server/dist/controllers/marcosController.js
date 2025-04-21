"use strict";
// src/server/controllers/marcosController.ts
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.getAllEntriesCsv = exports.getEntryById = exports.getNextGroup = exports.createEntry = void 0;
var client_1 = require("@prisma/client");
var node_cron_1 = __importDefault(require("node-cron"));
var sync_1 = require("csv-stringify/sync");
var prisma = new client_1.PrismaClient();
// Every minute, clean up assignments older than 20 minutes that never completed
node_cron_1.default.schedule('*/1 * * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
    var cutoff, count, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cutoff = new Date(Date.now() - 30 * 60 * 1000);
                return [4 /*yield*/, prisma.assignment.deleteMany({
                        where: {
                            completed: false,
                            createdAt: { lt: cutoff },
                        },
                    })];
            case 1:
                count = (_a.sent()).count;
                if (count > 0) {
                    console.log("\uD83D\uDDD1  Cleaned up ".concat(count, " abandoned assignments (older than 20m)"));
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error('Error cleaning up abandoned assignments:', err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
function parseSex(input) {
    switch (input.toLowerCase()) {
        case 'male': return client_1.Sex.male;
        case 'female': return client_1.Sex.female;
        case 'other': return client_1.Sex.other;
        default:
            throw new Error("Invalid sex: ".concat(input));
    }
}
function parseLang(input) {
    switch (input.toLowerCase()) {
        case 'cpp':
        case 'c++': return client_1.ProgrammingLanguage.cpp;
        case 'java': return client_1.ProgrammingLanguage.java;
        case 'csharp':
        case 'c#': return client_1.ProgrammingLanguage.csharp;
        case 'js':
        case 'javascript': return client_1.ProgrammingLanguage.js;
        case 'ts':
        case 'typescript': return client_1.ProgrammingLanguage.ts;
        case 'python': return client_1.ProgrammingLanguage.python;
        default: return client_1.ProgrammingLanguage.other;
    }
}
/**
 * POST /
 * Handles survey + experiment submission. Expects assignmentId for balancing.
 */
var createEntry = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, assignmentId_1, yearsProgramming, age, sexInput, languageInput, email_1, accuracy_1, task_accuracy_1, durationMs_1, rawGroup, parsedYears_1, parsedAge_1, sexEnum_1, langEnum_1, groupEnum_1, entry, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, assignmentId_1 = _a.assignmentId, yearsProgramming = _a.yearsProgramming, age = _a.age, sexInput = _a.sex, languageInput = _a.language, email_1 = _a.email, accuracy_1 = _a.accuracy, task_accuracy_1 = _a.task_accuracy, durationMs_1 = _a.durationMs, rawGroup = _a.group;
                parsedYears_1 = parseInt(yearsProgramming, 10);
                parsedAge_1 = parseInt(age, 10);
                sexEnum_1 = parseSex(sexInput);
                langEnum_1 = parseLang(languageInput);
                if (!Object.values(client_1.DetGroup).includes(rawGroup)) {
                    res.status(400).json({ error: "Invalid group: ".concat(rawGroup) });
                    return [2 /*return*/];
                }
                groupEnum_1 = rawGroup;
                console.log('📥 Creating entry with:', { yearsProgramming: yearsProgramming, age: age, sexEnum: sexEnum_1, langEnum: langEnum_1, email: email_1, accuracy: accuracy_1, task_accuracy: task_accuracy_1, durationMs: durationMs_1, groupEnum: groupEnum_1, assignmentId: assignmentId_1 });
                return [4 /*yield*/, prisma.$transaction(function (tx) { return __awaiter(void 0, void 0, void 0, function () {
                        var created;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tx.marcos_Data.create({
                                        data: {
                                            yearsProgramming: parsedYears_1,
                                            age: parsedAge_1,
                                            sex: sexEnum_1,
                                            language: langEnum_1,
                                            email: email_1,
                                            accuracy: typeof accuracy_1 === 'string' ? parseFloat(accuracy_1) : accuracy_1,
                                            task_accuracy: task_accuracy_1,
                                            durationMs: durationMs_1,
                                            group: groupEnum_1,
                                        },
                                    })
                                    // mark assignment completed
                                ];
                                case 1:
                                    created = _a.sent();
                                    if (!assignmentId_1) return [3 /*break*/, 3];
                                    return [4 /*yield*/, tx.assignment.update({
                                            where: { id: assignmentId_1 },
                                            data: { completed: true },
                                        })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2 /*return*/, created];
                            }
                        });
                    }); })];
            case 1:
                entry = _b.sent();
                res.status(201).json(entry);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                console.error('❌ Error in createEntry:', err_2);
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createEntry = createEntry;
/**
 * GET /next-group
 * Reserves a slot by inserting into Assignment.
 */
var getNextGroup = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var ACTIVE_GROUPS_1, _a, chosenGroup, assignmentId, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                ACTIVE_GROUPS_1 = [
                    client_1.DetGroup.AngleBracket,
                    client_1.DetGroup.Backslash,
                    client_1.DetGroup.TemplateLiteral,
                ];
                console.log('🔄 getNextGroup called');
                return [4 /*yield*/, prisma.$transaction(function (tx) { return __awaiter(void 0, void 0, void 0, function () {
                        var counts, countMap, minCount, candidates, idx, chosen, id;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: 
                                // ensure single concurrent access
                                return [4 /*yield*/, tx.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT pg_advisory_xact_lock(42)"], ["SELECT pg_advisory_xact_lock(42)"
                                        // count only completed assignments for balance
                                    ])))];
                                case 1:
                                    // ensure single concurrent access
                                    _a.sent();
                                    return [4 /*yield*/, tx.assignment.groupBy({
                                            by: ['group'],
                                            _count: { group: true },
                                        })];
                                case 2:
                                    counts = _a.sent();
                                    console.log("Counts: " + JSON.stringify(counts));
                                    countMap = Object.fromEntries(ACTIVE_GROUPS_1.map(function (g) { return [g, 0]; }));
                                    counts.forEach(function (c) {
                                        var g = c.group;
                                        if (ACTIVE_GROUPS_1.includes(g))
                                            countMap[g] = c._count.group;
                                    });
                                    minCount = Math.min.apply(Math, ACTIVE_GROUPS_1.map(function (g) { return countMap[g]; }));
                                    candidates = ACTIVE_GROUPS_1.filter(function (g) { return countMap[g] === minCount; });
                                    idx = Math.floor(Math.random() * candidates.length);
                                    chosen = candidates[idx];
                                    console.log("Chosen group: " + chosen);
                                    return [4 /*yield*/, tx.assignment.create({ data: { group: chosen } })];
                                case 3:
                                    id = (_a.sent()).id;
                                    return [2 /*return*/, { chosenGroup: chosen, assignmentId: id }];
                            }
                        });
                    }); })];
            case 1:
                _a = _b.sent(), chosenGroup = _a.chosenGroup, assignmentId = _a.assignmentId;
                res.json({ group: chosenGroup, assignmentId: assignmentId });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                console.error('❌ Error in getNextGroup:', err_3);
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getNextGroup = getNextGroup;
/**
 * GET /:id
 */
var getEntryById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, entry, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                    res.status(400).json({ error: 'Invalid ID format' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.marcos_Data.findUnique({ where: { id: id } })];
            case 1:
                entry = _a.sent();
                if (!entry) {
                    res.status(404).json({ error: 'Not found' });
                    return [2 /*return*/];
                }
                res.json(entry);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.error('❌ Error in getEntryById:', err_4);
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getEntryById = getEntryById;
/**
 * GET /
 * Download CSV of all results
 */
var getAllEntriesCsv = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, csv, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.marcos_Data.findMany()];
            case 1:
                data = _a.sent();
                csv = (0, sync_1.stringify)(data, { header: true });
                res
                    .status(200)
                    .header('Content-Type', 'text/csv')
                    .header('Content-Disposition', 'attachment; filename="marcos_data.csv"')
                    .send(csv);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                console.error('❌ Error in getAllEntriesCsv:', err_5);
                next(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllEntriesCsv = getAllEntriesCsv;
var templateObject_1;
//# sourceMappingURL=marcosController.js.map