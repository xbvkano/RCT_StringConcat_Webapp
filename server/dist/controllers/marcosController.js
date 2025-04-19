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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntryById = exports.getAllEntriesCsv = exports.getNextGroup = exports.createEntry = void 0;
var client_1 = require("@prisma/client");
var sync_1 = require("csv-stringify/sync");
var prisma = new client_1.PrismaClient();
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
 */
var createEntry = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, yearsProgramming, age, sexInput, languageInput, email, accuracy, task_accuracy, rawTime, rawGroup, parsedYears, parsedAge, sexEnum, langEnum, groupEnum, parsedTime, entry, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, yearsProgramming = _a.yearsProgramming, age = _a.age, sexInput = _a.sex, languageInput = _a.language, email = _a.email, accuracy = _a.accuracy, task_accuracy = _a.task_accuracy, rawTime = _a.time, rawGroup = _a.group;
                parsedYears = parseInt(yearsProgramming, 10);
                parsedAge = parseInt(age, 10);
                sexEnum = parseSex(sexInput);
                langEnum = parseLang(languageInput);
                console.log("Got CreateEntry request with body" + JSON.stringify(req.body, null, 2));
                if (!Object.values(client_1.DetGroup).includes(rawGroup)) {
                    res.status(400).json({ error: "Invalid group: ".concat(rawGroup) });
                    return [2 /*return*/];
                }
                groupEnum = rawGroup;
                parsedTime = new Date(rawTime);
                if (isNaN(parsedTime.valueOf())) {
                    res.status(400).json({ error: "Invalid time: ".concat(rawTime) });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.marcos_Data.create({
                        data: {
                            yearsProgramming: parsedYears,
                            age: parsedAge,
                            sex: sexEnum,
                            language: langEnum,
                            email: email,
                            accuracy: typeof accuracy === 'string' ? parseFloat(accuracy) : accuracy,
                            task_accuracy: task_accuracy,
                            time: parsedTime,
                            group: groupEnum,
                        },
                    })];
            case 1:
                entry = _b.sent();
                console.log("Returning " + JSON.stringify(entry, null, 2));
                // <— send response without returning it
                res.status(201).json(entry);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.error('❌ Error in createEntry:', err_1);
                next(err_1); // next() returns void
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createEntry = createEntry;
/**
 * GET /next-group
 */
var getNextGroup = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var chosenGroup, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Got request to getNextGroup");
                return [4 /*yield*/, prisma.$transaction(function (tx) { return __awaiter(void 0, void 0, void 0, function () {
                        var counts, countsMap, minCount, candidates;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tx.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT pg_advisory_xact_lock(42)"], ["SELECT pg_advisory_xact_lock(42)"])))];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, tx.marcos_Data.groupBy({
                                            by: ['group'],
                                            _count: { group: true },
                                        })];
                                case 2:
                                    counts = _a.sent();
                                    countsMap = Object.fromEntries(Object.values(client_1.DetGroup).map(function (g) { return [g, 0]; }));
                                    counts.forEach(function (c) {
                                        countsMap[c.group] = c._count.group;
                                    });
                                    minCount = Math.min.apply(Math, Object.values(countsMap));
                                    candidates = Object.entries(countsMap)
                                        .filter(function (_a) {
                                        var cnt = _a[1];
                                        return cnt === minCount;
                                    })
                                        .map(function (_a) {
                                        var g = _a[0];
                                        return g;
                                    });
                                    return [2 /*return*/, candidates[Math.floor(Math.random() * candidates.length)]];
                            }
                        });
                    }); })];
            case 1:
                chosenGroup = _a.sent();
                console.log("returning " + chosenGroup);
                res.json({ group: chosenGroup });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error('❌ Error in getNextGroup:', err_2);
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getNextGroup = getNextGroup;
/**
 * GET /
 */
var getAllEntriesCsv = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, csv, err_3;
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
                err_3 = _a.sent();
                console.error('❌ Error in getAllEntriesCsv:', err_3);
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllEntriesCsv = getAllEntriesCsv;
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
var templateObject_1;
//# sourceMappingURL=marcosController.js.map