"use strict";
// src/server/controllers/marcosController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntryById = exports.getAllEntriesCsv = exports.getNextGroup = exports.createEntry = void 0;
const client_1 = require("@prisma/client");
const sync_1 = require("csv-stringify/sync");
const prisma = new client_1.PrismaClient();
function parseSex(input) {
    switch (input.toLowerCase()) {
        case 'male': return client_1.Sex.male;
        case 'female': return client_1.Sex.female;
        case 'other': return client_1.Sex.other;
        default:
            throw new Error(`Invalid sex: ${input}`);
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
const createEntry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { yearsProgramming, age, sex: sexInput, language: languageInput, email, accuracy, task_accuracy, time: rawTime, group: rawGroup, } = req.body;
        const parsedYears = parseInt(yearsProgramming, 10);
        const parsedAge = parseInt(age, 10);
        const sexEnum = parseSex(sexInput);
        const langEnum = parseLang(languageInput);
        console.log("Got CreateEntry request with body" + JSON.stringify(req.body, null, 2));
        if (!Object.values(client_1.DetGroup).includes(rawGroup)) {
            res.status(400).json({ error: `Invalid group: ${rawGroup}` });
            return;
        }
        const groupEnum = rawGroup;
        const parsedTime = new Date(rawTime);
        if (isNaN(parsedTime.valueOf())) {
            res.status(400).json({ error: `Invalid time: ${rawTime}` });
            return;
        }
        const entry = yield prisma.marcos_Data.create({
            data: {
                yearsProgramming: parsedYears,
                age: parsedAge,
                sex: sexEnum,
                language: langEnum,
                email,
                accuracy: typeof accuracy === 'string' ? parseFloat(accuracy) : accuracy,
                task_accuracy,
                time: parsedTime,
                group: groupEnum,
            },
        });
        console.log("Returning " + JSON.stringify(entry, null, 2));
        // <— send response without returning it
        res.status(201).json(entry);
    }
    catch (err) {
        console.error('❌ Error in createEntry:', err);
        next(err); // next() returns void
    }
});
exports.createEntry = createEntry;
/**
 * GET /next-group
 */
const getNextGroup = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Got request to getNextGroup");
        const chosenGroup = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            yield tx.$executeRaw `SELECT pg_advisory_xact_lock(42)`;
            const counts = yield tx.marcos_Data.groupBy({
                by: ['group'],
                _count: { group: true },
            });
            const countsMap = Object.fromEntries(Object.values(client_1.DetGroup).map(g => [g, 0]));
            counts.forEach(c => {
                countsMap[c.group] = c._count.group;
            });
            const minCount = Math.min(...Object.values(countsMap));
            const candidates = Object.entries(countsMap)
                .filter(([, cnt]) => cnt === minCount)
                .map(([g]) => g);
            return candidates[Math.floor(Math.random() * candidates.length)];
        }));
        console.log("returning " + chosenGroup);
        res.json({ group: chosenGroup });
    }
    catch (err) {
        console.error('❌ Error in getNextGroup:', err);
        next(err);
    }
});
exports.getNextGroup = getNextGroup;
/**
 * GET /
 */
const getAllEntriesCsv = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.marcos_Data.findMany();
        const csv = (0, sync_1.stringify)(data, { header: true });
        res
            .status(200)
            .header('Content-Type', 'text/csv')
            .header('Content-Disposition', 'attachment; filename="marcos_data.csv"')
            .send(csv);
    }
    catch (err) {
        console.error('❌ Error in getAllEntriesCsv:', err);
        next(err);
    }
});
exports.getAllEntriesCsv = getAllEntriesCsv;
/**
 * GET /:id
 */
const getEntryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID format' });
            return;
        }
        const entry = yield prisma.marcos_Data.findUnique({ where: { id } });
        if (!entry) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        res.json(entry);
    }
    catch (err) {
        console.error('❌ Error in getEntryById:', err);
        next(err);
    }
});
exports.getEntryById = getEntryById;
