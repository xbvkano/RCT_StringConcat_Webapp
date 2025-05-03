"use strict";
// src/server/controllers/kushaController.ts
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
exports.getAllKushaEntriesCsv = exports.getKushaEntryById = exports.createKushaEntry = void 0;
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
 * Handles survey + experiment submission for Kusha_data (no assignmentIds).
 */
var createKushaEntry = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, yearsProgramming, age, sexInput, languageInput, email_1, ids_1, task_accuracy_1, durations_1, totalTime_1, overallAccuracy_1, parsedExperienceYears, parsedAge, experienceYears_1, safeAge_1, sexEnum_1, langEnum_1, entry, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('📥 Received Kusha entry:', req.body);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = req.body, yearsProgramming = _a.yearsProgramming, age = _a.age, sexInput = _a.sex, languageInput = _a.language, email_1 = _a.email, ids_1 = _a.ids, task_accuracy_1 = _a.task_accuracy, durations_1 = _a.durations, totalTime_1 = _a.totalTime, overallAccuracy_1 = _a.overallAccuracy;
                parsedExperienceYears = parseInt(yearsProgramming, 10);
                parsedAge = parseInt(age, 10);
                experienceYears_1 = isNaN(parsedExperienceYears) ? 0 : parsedExperienceYears;
                safeAge_1 = isNaN(parsedAge) ? 0 : parsedAge;
                sexEnum_1 = parseSex(sexInput);
                langEnum_1 = parseLang(languageInput);
                console.log('📥 Creating Kusha entry with:', {
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
                                case 0: return [4 /*yield*/, tx.kusha_data.create({
                                        data: {
                                            experience_years: experienceYears_1,
                                            age: safeAge_1,
                                            sex: sexEnum_1,
                                            language: langEnum_1,
                                            email: email_1 || null,
                                            accuracy: overallAccuracy_1 !== null && overallAccuracy_1 !== void 0 ? overallAccuracy_1 : 0,
                                            task_accuracy: task_accuracy_1,
                                            task_ids: ids_1,
                                            total_time: totalTime_1 !== null && totalTime_1 !== void 0 ? totalTime_1 : 0,
                                            per_task_time: durations_1,
                                        },
                                    })
                                    // insert per-question rows
                                ];
                                case 1:
                                    created = _a.sent();
                                    perQuestionData = ids_1.map(function (questionId, index) { return ({
                                        question_id: parseInt(questionId, 10),
                                        user_id: created.id,
                                        result: task_accuracy_1[index],
                                        time: durations_1[index],
                                    }); });
                                    return [4 /*yield*/, tx.kusha_per_question.createMany({
                                            data: perQuestionData,
                                        })];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/, created];
                            }
                        });
                    }); })];
            case 2:
                entry = _b.sent();
                res.status(201).json(entry);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.error('❌ Error in createKushaEntry:', err_1);
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createKushaEntry = createKushaEntry;
/**
 * GET /:id
 * Retrieve a single Kusha_data entry by its ID.
 */
var getKushaEntryById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, entry, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                    res.status(400).json({ error: 'Invalid ID format' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.kusha_data.findUnique({ where: { id: id } })];
            case 1:
                entry = _a.sent();
                if (!entry) {
                    res.status(404).json({ error: 'Not found' });
                    return [2 /*return*/];
                }
                res.json(entry);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error('❌ Error in getKushaEntryById:', err_2);
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getKushaEntryById = getKushaEntryById;
/**
 * GET /
 * Download CSV of all Kusha_data results.
 */
var getAllKushaEntriesCsv = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, csv, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.kusha_data.findMany()];
            case 1:
                data = _a.sent();
                csv = (0, sync_1.stringify)(data, { header: true });
                res
                    .status(200)
                    .header('Content-Type', 'text/csv')
                    .header('Content-Disposition', 'attachment; filename="kusha_data.csv"')
                    .send(csv);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error('❌ Error in getAllKushaEntriesCsv:', err_3);
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllKushaEntriesCsv = getAllKushaEntriesCsv;
//# sourceMappingURL=kushaController.js.map