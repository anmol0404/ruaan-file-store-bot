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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
import { Scenes, Composer } from "telegraf";
import database from "../../services/database.js";
import env from "../../services/env.js";
import { sendCallbackQueryResponse } from "./answerCbQUery.js";
import { cleanString } from "../../utils/cleanReq.js";
import { sortEpisodesByCaption } from "./sortdata.js";
import telegram from "../../services/telegram.js";
import { getMessageLink } from "../../utils/getMessageLinkFromCtx.js";
import handleResultsReply, { editResultsReply, updateSession } from "./reqHandler.js";
import memory from "../../extra/isInProcess.js";
import { sendExpiredTokenToChat, sendExpiredTokenToCtx } from "../../utils/helper.js";
// Create a Wizard Scene
var paginationWizard = new Scenes.WizardScene("reqAIO", Composer.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var session, request, searchCriteria, messageIdLink, searchResults, finalResult, batchedResults, firstBatch, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 11, , 12]);
                if (memory.isObjectInProcess((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id)) {
                    memory.completeProcess((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id);
                }
                if (!("text" in ctx.message)) return [3 /*break*/, 8];
                session = ctx.session;
                request = ctx.message.text.replace("/m", "").trim();
                if (!(request.length > 2)) return [3 /*break*/, 7];
                searchCriteria = {
                    caption: cleanString(request.toLowerCase()),
                };
                messageIdLink = getMessageLink(ctx);
                return [4 /*yield*/, database.searchAIO(searchCriteria, messageIdLink)];
            case 1:
                searchResults = (_c.sent()) || [];
                if (!((searchResults === null || searchResults === void 0 ? void 0 : searchResults.length) === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, ctx.scene.leave()];
            case 2:
                _c.sent();
                return [2 /*return*/];
            case 3:
                finalResult = sortEpisodesByCaption(searchResults);
                updateSession(session, ctx, finalResult, request);
                batchedResults = batchResults(finalResult);
                session.aioBatches = batchedResults;
                firstBatch = batchedResults === null || batchedResults === void 0 ? void 0 : batchedResults[0];
                if (!(finalResult.length > 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, handleResultsReply(ctx, request, firstBatch, session, batchedResults.length)];
            case 4:
                _c.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, ctx.scene.leave()];
            case 6:
                _c.sent();
                _c.label = 7;
            case 7: return [2 /*return*/, ctx.wizard.next()];
            case 8: return [4 /*yield*/, ctx.scene.leave()];
            case 9:
                _c.sent();
                _c.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                error_1 = _c.sent();
                console.error(error_1);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); }), Composer.on("callback_query", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionData, result, fromUser, requestBy, qualities, callbackData_1, aIOData, page, isValidToken, haveBotPremium, firstItem, botLink, userLink, messageIds, channelId, messageIds, channelId, error_2, data_1, quality, newResult, aIOData, isQuality, isPrev, isNext, page;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return __generator(this, function (_p) {
        switch (_p.label) {
            case 0:
                sessionData = ctx.session;
                result = sessionData.result;
                if (!(ctx.callbackQuery.message && "reply_to_message" in ctx.callbackQuery.message)) return [3 /*break*/, 2];
                fromUser = (_b = (_a = ctx.callbackQuery.message.reply_to_message) === null || _a === void 0 ? void 0 : _a.from) === null || _b === void 0 ? void 0 : _b.id;
                if (!(fromUser !== ((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.id))) return [3 /*break*/, 2];
                return [4 /*yield*/, sendCallbackQueryResponse(ctx, "Request is not from you , Request yourself!")];
            case 1:
                _p.sent();
                return [2 /*return*/];
            case 2:
                requestBy = ((_d = ctx.from) === null || _d === void 0 ? void 0 : _d.id.toString()) === sessionData.reqestBy;
                qualities = ["480p", "720p", "1080p", "540p", "all"];
                if (!("data" in ctx.callbackQuery && requestBy)) return [3 /*break*/, 24];
                callbackData_1 = (_e = ctx.callbackQuery) === null || _e === void 0 ? void 0 : _e.data;
                if (!(callbackData_1 === sessionData.sendAll)) return [3 /*break*/, 14];
                aIOData = sessionData.aioBatches;
                page = (_f = sessionData.page) !== null && _f !== void 0 ? _f : 0;
                _p.label = 3;
            case 3:
                _p.trys.push([3, 13, , 14]);
                return [4 /*yield*/, database.verifyAndValidateToken((_g = ctx.from) === null || _g === void 0 ? void 0 : _g.id.toString())];
            case 4:
                isValidToken = _p.sent();
                return [4 /*yield*/, database
                        .checkBotPremiumStatus((_h = ctx.from) === null || _h === void 0 ? void 0 : _h.id.toString())
                        .catch(function (error) { return console.error(error); })];
            case 5:
                haveBotPremium = _p.sent();
                if (!!isValidToken) return [3 /*break*/, 11];
                return [4 /*yield*/, database.getFirstSortItem()];
            case 6:
                firstItem = _p.sent();
                if (!(firstItem && firstItem.sort && firstItem.sort.length > 0 && !haveBotPremium)) return [3 /*break*/, 9];
                botLink = "https://t.me/".concat(env.botUserName);
                userLink = "https://t.me/".concat(ctx.from.username || "tg://user?id=".concat(ctx.from.id));
                return [4 /*yield*/, sendExpiredTokenToCtx(ctx, userLink, botLink)];
            case 7:
                _p.sent();
                return [4 /*yield*/, sendExpiredTokenToChat(ctx.from.id, ctx.from.first_name, firstItem.sort[0].aioShortUrl).catch(function (e) { return console.log(e); })];
            case 8:
                _p.sent();
                return [2 /*return*/];
            case 9:
                messageIds = aIOData[page].map(function (item) { return item.messageIds; });
                channelId = aIOData[page].map(function (item) { return Number(item.channel); });
                return [2 /*return*/, telegram.sendAll(ctx.from.id, channelId, messageIds, ctx)];
            case 10: return [3 /*break*/, 12];
            case 11:
                messageIds = aIOData[page].map(function (item) { return item.messageIds; });
                channelId = aIOData[page].map(function (item) { return Number(item.channel); });
                return [2 /*return*/, telegram.sendAll(ctx.from.id, channelId, messageIds, ctx)];
            case 12: return [3 /*break*/, 14];
            case 13:
                error_2 = _p.sent();
                console.error(error_2);
                return [3 /*break*/, 14];
            case 14:
                sessionData.page = (_j = sessionData.page) !== null && _j !== void 0 ? _j : 0;
                if (!(callbackData_1 === sessionData.next ||
                    callbackData_1 === sessionData.prev ||
                    qualities.some(function (quality) { return callbackData_1 === null || callbackData_1 === void 0 ? void 0 : callbackData_1.startsWith(quality); }))) return [3 /*break*/, 24];
                data_1 = (_k = ctx.callbackQuery) === null || _k === void 0 ? void 0 : _k.data;
                if (data_1) {
                    quality = qualities.find(function (q) { return data_1.startsWith(q); });
                    if (quality) {
                        newResult = batchResultsAndFilter(result, quality);
                        if (newResult.length === 0) {
                            sendCallbackQueryResponse(ctx, "Not found");
                            return [2 /*return*/];
                        }
                        sessionData.aioBatches = newResult;
                        sessionData.page = 0;
                    }
                }
                aIOData = sessionData.aioBatches;
                if (!aIOData) return [3 /*break*/, 23];
                isQuality = qualities.some(function (q) { return callbackData_1 === null || callbackData_1 === void 0 ? void 0 : callbackData_1.startsWith(q); });
                isPrev = callbackData_1.startsWith("prev");
                isNext = callbackData_1.startsWith("next");
                if (isNext && sessionData.page + 1 < aIOData.length) {
                    sessionData.page = ((_l = sessionData.page) !== null && _l !== void 0 ? _l : 0) + 1;
                }
                page = (_m = sessionData.page) !== null && _m !== void 0 ? _m : 0;
                if (!(isNext || isQuality)) return [3 /*break*/, 18];
                if (!((page !== null && page !== void 0 ? page : 0) < aIOData.length)) return [3 /*break*/, 16];
                return [4 /*yield*/, editResultsReply(ctx, sessionData.reqest || "user request", aIOData[page], sessionData, aIOData.length, page + 1)];
            case 15:
                _p.sent();
                return [3 /*break*/, 17];
            case 16:
                sendCallbackQueryResponse(ctx, "This is the last, no more left!");
                _p.label = 17;
            case 17: return [2 /*return*/];
            case 18:
                if (!isPrev) return [3 /*break*/, 22];
                if (!(page > 0)) return [3 /*break*/, 20];
                return [4 /*yield*/, editResultsReply(ctx, sessionData.reqest || "user request", aIOData[page - 1], sessionData, aIOData.length, page)];
            case 19:
                _p.sent();
                sessionData.page = ((_o = sessionData.page) !== null && _o !== void 0 ? _o : 0) - 1;
                return [3 /*break*/, 21];
            case 20:
                sendCallbackQueryResponse(ctx, "This is the first, no more left!");
                _p.label = 21;
            case 21: return [2 /*return*/];
            case 22: return [3 /*break*/, 24];
            case 23:
                sendCallbackQueryResponse(ctx, "No more data available!");
                _p.label = 24;
            case 24: return [2 /*return*/];
        }
    });
}); }));
export default paginationWizard;
function batchResults(results) {
    var batchSize = 10;
    var batches = [];
    var extractedData = results.map(function (item) { return ({
        caption: item.caption,
        shareId: item.shareId.toString(),
        messageIds: item.messageIds,
        channel: item.channel,
        aioShortUrl: "",
    }); });
    for (var i = 0; i < extractedData.length; i += batchSize) {
        var batch = extractedData.slice(i, i + batchSize);
        batches.push(batch);
    }
    return batches;
}
function batchResultsAndFilter(results, quality) {
    var batchSize = 10;
    var batches = [];
    var filteredResults = [];
    if (quality.toLowerCase() === "all") {
        filteredResults = results;
    }
    else {
        filteredResults = results.filter(function (item) { return item.caption.includes(quality); });
    }
    var extractedData = filteredResults.map(function (item) { return ({
        caption: item.caption,
        shareId: item.shareId.toString(),
        messageIds: item.messageIds,
        channel: item.channel,
    }); });
    for (var i = 0; i < extractedData.length; i += batchSize) {
        var batch = extractedData.slice(i, i + batchSize);
        batches.push(batch);
    }
    return batches;
}
