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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Markup, Telegraf, deunionize } from "telegraf";
import env from "./env.js";
import filterAsync from "../extra/filterAsync.js";
import mapAsync from "../extra/mapAsync.js";
import splitArray from "../extra/splitArray.js";
import { scheduleMessageDeletion } from "../extra/scheduleMessageDeletion.js";
import { processCaption } from "../utils/caption/editCaption.js";
import memory from "../extra/isInProcess.js";
var Telegram = /** @class */ (function () {
    function Telegram() {
        this.app = new Telegraf(env.token);
        this.messages = new Map();
        this.waitingMessageId = NaN;
        this.waitingMessageTimeout = setTimeout(function () { });
        this.firstWaitingMessage = true;
        this.inviteLinks = new Map();
        this.app.catch(function (err, ctx) {
            console.error("Error for update type '".concat(ctx.updateType, "':"), err);
            console.error("An unexpected error occurred:", err);
        });
    }
    Telegram.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var forceChatIds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.app.telegram.setMyCommands([
                            {
                                command: "start",
                                description: "Start the bot",
                            },
                            {
                                command: "add",
                                description: "Admin Command",
                            },
                            {
                                command: "editaio",
                                description: "Admin Command",
                            },
                            {
                                command: "/cancel",
                                description: "Admin Command",
                            },
                        ])];
                    case 1:
                        _a.sent();
                        forceChatIds = __spreadArray([], env.forceGroupIds, true);
                        return [4 /*yield*/, mapAsync(forceChatIds, function (chatId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getInviteLink(chatId)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Telegram.prototype.sendWaitingMessage = function (chatId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var totalMessages, text, replyMarkup, delay;
            var _this = this;
            return __generator(this, function (_b) {
                clearTimeout(this.waitingMessageTimeout);
                totalMessages = ((_a = this.messages.get(chatId)) === null || _a === void 0 ? void 0 : _a.length) || 0;
                text = "Send me any message and click Finish when you are done!\n" +
                    "Total messages: ".concat(totalMessages);
                replyMarkup = {
                    inline_keyboard: [[{ text: "Finish", callback_data: "share-finish" }]],
                };
                delay = this.firstWaitingMessage ? 0 : 1000;
                this.waitingMessageTimeout = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, waitingMessage;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.deleteWaitingMessage(chatId)];
                            case 1:
                                _b.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                _a = _b.sent();
                                return [3 /*break*/, 3];
                            case 3: return [4 /*yield*/, this.app.telegram.sendMessage(chatId, text, {
                                    reply_markup: replyMarkup,
                                })];
                            case 4:
                                waitingMessage = _b.sent();
                                this.waitingMessageId = waitingMessage.message_id;
                                this.firstWaitingMessage = false;
                                return [2 /*return*/];
                        }
                    });
                }); }, delay);
                return [2 /*return*/];
            });
        });
    };
    Telegram.prototype.deleteWaitingMessage = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.app.telegram.deleteMessage(chatId, this.waitingMessageId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Telegram.prototype.sendForceJoinMessage = function (shareId, chatId, user, chatsUserHasNotJoined) {
        return __awaiter(this, void 0, void 0, function () {
            var text, replyMarkup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = "Hello ".concat(user.first_name, "\n") + "you must join all the groups/channels below first";
                        return [4 /*yield*/, this.getForceChatButtons(shareId, chatsUserHasNotJoined)];
                    case 1:
                        replyMarkup = _a.sent();
                        return [4 /*yield*/, this.app.telegram.sendMessage(chatId, text, {
                                reply_markup: replyMarkup,
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Telegram.prototype.getForceChatButtons = function (shareId, chatsUserHasNotJoined) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var limitPerRow, rawButtons, forceChatButtons;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        limitPerRow = 2;
                        return [4 /*yield*/, mapAsync(chatsUserHasNotJoined, function (chatId, index) { return __awaiter(_this, void 0, void 0, function () {
                                var label, inviteLink;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            label = "Chat ".concat(index + 1);
                                            return [4 /*yield*/, this.getInviteLink(chatId)];
                                        case 1:
                                            inviteLink = _a.sent();
                                            return [2 /*return*/, Markup.button.url(label, inviteLink)];
                                    }
                                });
                            }); })];
                    case 1:
                        rawButtons = _b.sent();
                        forceChatButtons = splitArray(rawButtons, limitPerRow);
                        forceChatButtons.push([
                            Markup.button.url("Try again after join above chats", "https://t.me/".concat((_a = this.app.botInfo) === null || _a === void 0 ? void 0 : _a.username, "?start=").concat(shareId, "-aio")),
                        ]);
                        return [2 /*return*/, {
                                inline_keyboard: forceChatButtons,
                            }];
                }
            });
        });
    };
    Telegram.prototype.addMessage = function (chatId, messageId) {
        var messages = this.messages.get(chatId) || [];
        messages.push(messageId);
        this.messages.set(chatId, messages);
    };
    Telegram.prototype.clearMessages = function (chatId) {
        this.messages.delete(chatId);
        this.firstWaitingMessage = true;
        this.waitingMessageId = NaN;
    };
    Telegram.prototype.forwardMessages = function (toChatId, fromChatId, messageIds, deleteOrNot, captions, ctx) {
        if (deleteOrNot === void 0) { deleteOrNot = false; }
        if (captions === void 0) { captions = []; }
        if (ctx === void 0) { ctx = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var resultIds, botLink, userLink, message, error_2, i, messageId, success, caption, result, error_3, message, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultIds = [];
                        if (!ctx) return [3 /*break*/, 9];
                        if (!memory.startProcess(ctx.from.id)) return [3 /*break*/, 7];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!env.botUserName) return [3 /*break*/, 4];
                        botLink = "https://t.me/".concat(env.botUserName);
                        userLink = ctx.from.username
                            ? "https://t.me/".concat(ctx.from.username)
                            : "tg://user?id=".concat(ctx.from.id);
                        return [4 /*yield*/, telegram.app.telegram.sendMessage(ctx.chat.id, "Hello [".concat(ctx.from.first_name, "](").concat(userLink, ") \nYour Files: [Here Your Files In PM](").concat(botLink, ")"), {
                                parse_mode: "Markdown",
                                disable_web_page_preview: true,
                            })];
                    case 2:
                        message = _a.sent();
                        return [4 /*yield*/, scheduleMessageDeletion(this, ctx.chat.id, message.message_id, 0.3)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.error("Error sending log:", error_2);
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, ctx
                            .answerCbQuery("Previous process is still in progress. Please wait a moment and retry!", {
                            show_alert: true,
                        })
                            .catch(function (e) { return console.log(e); })];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, []];
                    case 9:
                        i = 0;
                        _a.label = 10;
                    case 10:
                        if (!(i < messageIds.length)) return [3 /*break*/, 23];
                        messageId = messageIds[i];
                        success = false;
                        _a.label = 11;
                    case 11:
                        if (!!success) return [3 /*break*/, 22];
                        _a.label = 12;
                    case 12:
                        _a.trys.push([12, 17, , 21]);
                        caption = captions[i] ? processCaption(captions[i], env.join) : undefined;
                        return [4 /*yield*/, this.app.telegram.copyMessage(toChatId, fromChatId || env.dbAIOChannelId, messageId, deleteOrNot ? {} : { caption: caption })];
                    case 13:
                        result = _a.sent();
                        resultIds.push(result.message_id);
                        if (!deleteOrNot) return [3 /*break*/, 15];
                        return [4 /*yield*/, scheduleMessageDeletion(this, toChatId, result.message_id, 5)];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15:
                        success = true;
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                    case 16:
                        _a.sent();
                        return [3 /*break*/, 21];
                    case 17:
                        error_3 = _a.sent();
                        success = false;
                        if (!(error_3.code === 429)) return [3 /*break*/, 19];
                        console.log("".concat(error_3));
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 40000); })];
                    case 18:
                        _a.sent();
                        return [3 /*break*/, 20];
                    case 19: return [3 /*break*/, 11];
                    case 20: return [3 /*break*/, 21];
                    case 21: return [3 /*break*/, 11];
                    case 22:
                        i++;
                        return [3 /*break*/, 10];
                    case 23:
                        if (!deleteOrNot) return [3 /*break*/, 28];
                        _a.label = 24;
                    case 24:
                        _a.trys.push([24, 27, , 28]);
                        return [4 /*yield*/, this.app.telegram.sendMessage(toChatId, "I will delete the above files in 5 minutes, so forward them to another chat.")];
                    case 25:
                        message = _a.sent();
                        return [4 /*yield*/, scheduleMessageDeletion(this, toChatId, message.message_id, 5)];
                    case 26:
                        _a.sent();
                        return [3 /*break*/, 28];
                    case 27:
                        error_4 = _a.sent();
                        return [3 /*break*/, 28];
                    case 28:
                        if (ctx) {
                            memory.completeProcess(ctx.from.id);
                            memory.removeObject(ctx.from.id);
                        }
                        return [2 /*return*/, resultIds];
                }
            });
        });
    };
    Telegram.prototype.sendAll = function (toChatId, fromChatId, messageIds, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var botLink, userLink, message, error_5, resultIds, i, messageId, fromChannel, success, result, error_6, message, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!memory.startProcess(ctx.from.id)) return [3 /*break*/, 24];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!env.botUserName) return [3 /*break*/, 4];
                        botLink = "https://t.me/".concat(env.botUserName);
                        userLink = ctx.from.username
                            ? "https://t.me/".concat(ctx.from.username)
                            : "tg://user?id=".concat(ctx.from.id);
                        return [4 /*yield*/, telegram.app.telegram.sendMessage(ctx.chat.id, "Hello [".concat(ctx.from.first_name, "](").concat(userLink, ") \nYour Files: [Here Your Files In PM](").concat(botLink, ")"), {
                                parse_mode: "Markdown",
                                disable_web_page_preview: true,
                            })];
                    case 2:
                        message = _a.sent();
                        return [4 /*yield*/, scheduleMessageDeletion(this, ctx.chat.id, message.message_id, 0.3)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        console.error("Error sending log:", error_5);
                        return [3 /*break*/, 6];
                    case 6:
                        resultIds = [];
                        i = 0;
                        _a.label = 7;
                    case 7:
                        if (!(i < messageIds.length)) return [3 /*break*/, 19];
                        messageId = messageIds[i];
                        fromChannel = fromChatId[i] || env.dbAIOChannelId;
                        success = false;
                        _a.label = 8;
                    case 8:
                        if (!!success) return [3 /*break*/, 18];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 13, , 17]);
                        return [4 /*yield*/, this.app.telegram.copyMessage(toChatId, fromChannel, messageId)];
                    case 10:
                        result = _a.sent();
                        resultIds.push(result.message_id);
                        return [4 /*yield*/, scheduleMessageDeletion(this, toChatId, result.message_id, 5)];
                    case 11:
                        _a.sent();
                        success = true;
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                    case 12:
                        _a.sent();
                        return [3 /*break*/, 17];
                    case 13:
                        error_6 = _a.sent();
                        if (!(error_6.code === 429)) return [3 /*break*/, 15];
                        console.log("".concat(error_6));
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 40000); })];
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        success = true;
                        _a.label = 16;
                    case 16: return [3 /*break*/, 17];
                    case 17: return [3 /*break*/, 8];
                    case 18:
                        i++;
                        return [3 /*break*/, 7];
                    case 19:
                        _a.trys.push([19, 22, , 23]);
                        return [4 /*yield*/, this.app.telegram.sendMessage(toChatId, "I will delete the above files in 5 minutes, so forward them to another chat.")];
                    case 20:
                        message = _a.sent();
                        return [4 /*yield*/, scheduleMessageDeletion(this, toChatId, message.message_id, 5).catch(function (e) {
                                return console.log(e);
                            })];
                    case 21:
                        _a.sent();
                        return [3 /*break*/, 23];
                    case 22:
                        error_7 = _a.sent();
                        return [3 /*break*/, 23];
                    case 23:
                        memory.completeProcess(ctx.from.id);
                        memory.removeObject(ctx.from.id);
                        return [2 /*return*/, resultIds];
                    case 24: return [4 /*yield*/, ctx
                            .answerCbQuery("Previous process is still in progress. Please wait a moment and retry!", {
                            show_alert: true,
                        })
                            .catch(function (e) { return console.log(e); })];
                    case 25:
                        _a.sent();
                        return [2 /*return*/, []];
                }
            });
        });
    };
    Telegram.prototype.getChatsUserHasNotJoined = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var chatIds;
            var _this = this;
            return __generator(this, function (_a) {
                chatIds = __spreadArray(__spreadArray([], env.forceChannelIds, true), env.forceGroupIds, true);
                return [2 /*return*/, filterAsync(chatIds, function (chatId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.alreadyJoinChat(chatId, userId)];
                            case 1: return [2 /*return*/, !(_a.sent())];
                        }
                    }); }); })];
            });
        });
    };
    Telegram.prototype.alreadyJoinChat = function (chatId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.app.telegram.getChatMember(chatId, userId)];
                    case 1:
                        status = (_a.sent()).status;
                        return [2 /*return*/, (status === "administrator" ||
                                status === "creator" ||
                                status === "member" ||
                                status === "restricted")];
                }
            });
        });
    };
    Telegram.prototype.getInviteLink = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedInviteLink, existingInviteLink, _a, inviteLink;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cachedInviteLink = this.inviteLinks.get(chatId);
                        if (cachedInviteLink) {
                            return [2 /*return*/, cachedInviteLink];
                        }
                        _a = deunionize;
                        return [4 /*yield*/, this.app.telegram.getChat(chatId)];
                    case 1:
                        existingInviteLink = _a.apply(void 0, [_b.sent()]).invite_link;
                        if (existingInviteLink) {
                            this.inviteLinks.set(chatId, existingInviteLink);
                            return [2 /*return*/, existingInviteLink];
                        }
                        return [4 /*yield*/, this.app.telegram.exportChatInviteLink(chatId)];
                    case 2:
                        inviteLink = _b.sent();
                        this.inviteLinks.set(chatId, inviteLink);
                        return [2 /*return*/, inviteLink];
                }
            });
        });
    };
    return Telegram;
}());
var telegram = new Telegram();
export default telegram;
