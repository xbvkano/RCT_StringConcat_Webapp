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
// Every minute, clean up assignments older than 30 minutes that never completed
node_cron_1.default.schedule('*/1 * * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
    var cutoff, count, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cutoff = new Date(Date.now() - 30 * 60 * 1000);
                return [4 /*yield*/, prisma.assignment.updateMany({
                        where: {
                            completed: false,
                            abandoned: false,
                            createdAt: { lt: cutoff },
                        },
                        data: {
                            abandoned: true,
                        },
                    })];
            case 1:
                count = (_a.sent()).count;
                if (count > 0) {
                    console.log("\uD83D\uDDD1  Cleaned up ".concat(count, " abandoned assignments (older than 30m)"));
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
 * Handles survey + experiment submission. Expects assignmentIds for balancing.
*/
var createEntry = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, assignmentIds_1, yearsProgramming, age, sexInput, languageInput, email_1, ids_1, task_accuracy_1, durations_1, totalTime_1, overallAccuracy_1, parsedExperienceYears, parsedAge, experienceYears_1, safeAge_1, sexEnum_1, langEnum_1, entry, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, assignmentIds_1 = _a.assignmentIds, yearsProgramming = _a.yearsProgramming, age = _a.age, sexInput = _a.sex, languageInput = _a.language, email_1 = _a.email, ids_1 = _a.ids, task_accuracy_1 = _a.task_accuracy, durations_1 = _a.durations, totalTime_1 = _a.totalTime, overallAccuracy_1 = _a.overallAccuracy;
                if (!assignmentIds_1) {
                    res.status(400).json({ error: 'Missing assignmentIds' });
                    return [2 /*return*/];
                }
                parsedExperienceYears = parseInt(yearsProgramming, 10);
                parsedAge = parseInt(age, 10);
                experienceYears_1 = isNaN(parsedExperienceYears) ? 0 : parsedExperienceYears;
                safeAge_1 = isNaN(parsedAge) ? 0 : parsedAge;
                sexEnum_1 = parseSex(sexInput);
                langEnum_1 = parseLang(languageInput);
                console.log('📥 Creating entry with:', {
                    assignmentIds: assignmentIds_1,
                    experienceYears: experienceYears_1,
                    safeAge: safeAge_1,
                    sexEnum: sexEnum_1,
                    langEnum: langEnum_1,
                    email: email_1,
                    ids: ids_1,
                    task_accuracy: task_accuracy_1,
                    durations: durations_1,
                    totalTime: totalTime_1,
                    overallAccuracy: overallAccuracy_1,
                });
                return [4 /*yield*/, prisma.$transaction(function (tx) { return __awaiter(void 0, void 0, void 0, function () {
                        var created, perQuestionData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tx.marcos_Data.create({
                                        data: {
                                            experience_years: experienceYears_1,
                                            age: safeAge_1,
                                            sex: sexEnum_1,
                                            language: langEnum_1,
                                            email: email_1,
                                            accuracy: overallAccuracy_1 !== null && overallAccuracy_1 !== void 0 ? overallAccuracy_1 : 0,
                                            task_accuracy: task_accuracy_1,
                                            task_ids: ids_1,
                                            total_time: totalTime_1 !== null && totalTime_1 !== void 0 ? totalTime_1 : 0,
                                            per_task_time: durations_1,
                                        },
                                    })];
                                case 1:
                                    created = _a.sent();
                                    if (!(assignmentIds_1.length > 0)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, tx.assignment.updateMany({
                                            where: { id: { in: assignmentIds_1 } },
                                            data: { completed: true, abandoned: false },
                                        })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    perQuestionData = ids_1.map(function (questionId, index) { return ({
                                        question_id: parseInt(questionId, 10),
                                        user_id: created.id,
                                        result: task_accuracy_1[index],
                                        time: durations_1[index],
                                    }); });
                                    return [4 /*yield*/, tx.marcos_per_question.createMany({
                                            data: perQuestionData,
                                        })];
                                case 4:
                                    _a.sent();
                                    return [2 /*return*/, created];
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
var getNextGroup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var question_size_raw, syntax_size_raw, group_id_raw, question_size_1, syntax_size_1, group_id_1, _a, adjustedQuestionArray, adjustedSyntaxArray, assignmentIds, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.log("Getting next group");
                question_size_raw = req.query.question_size;
                syntax_size_raw = req.query.syntax_size;
                group_id_raw = req.query.group_id;
                question_size_1 = Number(question_size_raw);
                syntax_size_1 = Number(syntax_size_raw);
                group_id_1 = Number(group_id_raw);
                if (!question_size_raw || !syntax_size_raw || !group_id_raw ||
                    isNaN(question_size_1) || isNaN(syntax_size_1) || isNaN(group_id_1) ||
                    question_size_1 <= 0 || syntax_size_1 <= 0 || group_id_1 <= 0) {
                    res.status(400).json({
                        error: 'Invalid input',
                        question_size: question_size_raw,
                        syntax_size: syntax_size_raw,
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.$transaction(function (tx) { return __awaiter(void 0, void 0, void 0, function () {
                        var questionArray, syntaxArray, abandonedAssignment, newLatinCounter, assignmentIds, maxLatinCounter, lastLatinCounter, newAssignment, adjustedQuestionArray, adjustedSyntaxArray;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, tx.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT pg_advisory_xact_lock(42)"], ["SELECT pg_advisory_xact_lock(42)"])))];
                                case 1:
                                    _b.sent();
                                    questionArray = Array.from({ length: question_size_1 }, function (_, i) { return i + 1; });
                                    syntaxArray = Array.from({ length: question_size_1 }, function (_, i) { return i + 1; });
                                    return [4 /*yield*/, tx.assignment.findFirst({
                                            where: {
                                                group: group_id_1,
                                                abandoned: true,
                                            },
                                            orderBy: {
                                                latinCounter: 'asc',
                                            },
                                        })];
                                case 2:
                                    abandonedAssignment = _b.sent();
                                    if (!abandonedAssignment) return [3 /*break*/, 4];
                                    return [4 /*yield*/, tx.assignment.update({
                                            where: { id: abandonedAssignment.id },
                                            data: {
                                                abandoned: false,
                                                completed: false,
                                            },
                                        })];
                                case 3:
                                    _b.sent();
                                    newLatinCounter = abandonedAssignment.latinCounter;
                                    assignmentIds = abandonedAssignment.id;
                                    return [3 /*break*/, 7];
                                case 4: return [4 /*yield*/, tx.assignment.aggregate({
                                        where: { group: group_id_1 },
                                        _max: {
                                            latinCounter: true,
                                        },
                                    })];
                                case 5:
                                    maxLatinCounter = _b.sent();
                                    lastLatinCounter = (_a = maxLatinCounter._max.latinCounter) !== null && _a !== void 0 ? _a : -1;
                                    newLatinCounter = lastLatinCounter + 1;
                                    return [4 /*yield*/, tx.assignment.create({
                                            data: {
                                                completed: false,
                                                abandoned: false,
                                                latinCounter: newLatinCounter,
                                                group: group_id_1,
                                            },
                                        })];
                                case 6:
                                    newAssignment = _b.sent();
                                    assignmentIds = newAssignment.id;
                                    _b.label = 7;
                                case 7:
                                    adjustedQuestionArray = questionArray.map(function (val) { return ((val + newLatinCounter - 1) % question_size_1) + 1; });
                                    adjustedSyntaxArray = syntaxArray.map(function (val) { return ((((val - newLatinCounter - 1) % syntax_size_1) + syntax_size_1) % syntax_size_1) + 1; });
                                    return [2 /*return*/, {
                                            adjustedQuestionArray: adjustedQuestionArray,
                                            adjustedSyntaxArray: adjustedSyntaxArray,
                                            assignmentIds: assignmentIds,
                                        }];
                            }
                        });
                    }); })];
            case 1:
                _a = _b.sent(), adjustedQuestionArray = _a.adjustedQuestionArray, adjustedSyntaxArray = _a.adjustedSyntaxArray, assignmentIds = _a.assignmentIds;
                res.json({
                    questionArray: adjustedQuestionArray,
                    syntaxArray: adjustedSyntaxArray,
                    assignmentIds: assignmentIds,
                });
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