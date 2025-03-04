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
import { Markup } from "telegraf";
import env from "../services/env.js";
import { developerInfo, getInviteMessage, helpMessage, premiumPlan } from "../utils/helper.js";
import auth from "../services/auth.js";
import database from "../services/database.js";
export default {
    private: function (ctx, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __awaiter(this, void 0, void 0, function () {
            var messageText, _m, command, args, _o, error_1, callbackData, msgId, message, firstName, message_1, keyboard, keyboard, err_1;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        console.log((_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id);
                        if (!(ctx.message && "text" in ctx.message && auth.isAdmin((_c = (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : 0))) return [3 /*break*/, 10];
                        messageText = (_d = ctx.message) === null || _d === void 0 ? void 0 : _d.text;
                        _m = messageText.split(" "), command = _m[0], args = _m.slice(1);
                        _p.label = 1;
                    case 1:
                        _p.trys.push([1, 8, , 10]);
                        _o = command;
                        switch (_o) {
                            case "/addsort": return [3 /*break*/, 2];
                            case "/deletesort": return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, handleUpdateFirstAndActive(ctx, args)];
                    case 3:
                        _p.sent();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, deleteSort(ctx)];
                    case 5:
                        _p.sent();
                        return [3 /*break*/, 7];
                    case 6: return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        error_1 = _p.sent();
                        console.error("Error handling command:", error_1);
                        return [4 /*yield*/, ctx.reply("An error occurred while processing your request.")];
                    case 9:
                        _p.sent();
                        return [3 /*break*/, 10];
                    case 10:
                        if (!(ctx.callbackQuery && "data" in ctx.callbackQuery)) return [3 /*break*/, 17];
                        callbackData = ctx.callbackQuery.data;
                        msgId = (_e = ctx.message) === null || _e === void 0 ? void 0 : _e.message_id;
                        _p.label = 11;
                    case 11:
                        _p.trys.push([11, 16, , 17]);
                        message = "";
                        switch (callbackData) {
                            case "addDrama":
                                message = "";
                                break;
                            case "add":
                                message = "use /add to add new drama or series or movie";
                                break;
                            case "edit":
                                message = "use </edit name here> to add new drama or series or movie";
                                break;
                            case "search":
                                message = "send uploaded drama or series or movie name ";
                                break;
                            case "features":
                                message = helpMessage;
                                break;
                            case "seeplans":
                                message = premiumPlan;
                                break;
                            case "about":
                                message = developerInfo;
                                break;
                            case "refer":
                                message = getInviteMessage(((_g = (_f = ctx.callbackQuery) === null || _f === void 0 ? void 0 : _f.from) === null || _g === void 0 ? void 0 : _g.first_name) || "user", ((_h = ctx.callbackQuery) === null || _h === void 0 ? void 0 : _h.from.id.toString()) || "");
                                break;
                            case "home":
                                message = "home";
                                break;
                            default:
                                break;
                        }
                        if (!(message === "home")) return [3 /*break*/, 13];
                        firstName = (((_k = (_j = ctx.message) === null || _j === void 0 ? void 0 : _j.from.first_name) === null || _k === void 0 ? void 0 : _k.replace(/[^a-zA-Z0-9]/g, "")) || "User").trim();
                        message_1 = "\uD83D\uDC4B \u029C\u1D07\u029F\u029F\u1D0F ".concat(firstName, "!\n\u026A \u1D00\u1D0D \u1D00 \u1D18\u1D0F\u1D21\u1D07\u0280\uA730\u1D1C\u029F \u0299\u1D0F\u1D1B \u1D1B\u029C\u1D00\u1D1B \u1D21\u1D0F\u0280\u1D0Bs \u026A\u0274 \u0262\u0280\u1D0F\u1D1C\u1D18s. \u1D00\u1D05\u1D05 \u1D0D\u1D07 \u026A\u0274 \u028F\u1D0F\u1D1C\u0280 \u0262\u0280\u1D0F\u1D1C\u1D18, \u1D00\u0274\u1D05 \u026A \u1D21\u026A\u029F\u029F \u0280\u1D07s\u1D18\u1D0F\u0274\u1D05 \u1D21\u029C\u1D07\u0274 \u1D00\u0274\u028F \u1D1Cs\u1D07\u0280 s\u1D07\u0274\u1D05s \u1D00 \u1D0D\u1D0F\u1D20\u026A\u1D07 \u1D0F\u0280 \u1D05\u0280\u1D00\u1D0D\u1D00 \u0274\u1D00\u1D0D\u1D07!\n\u279C\u1D00\u1D05\u1D0D\u026A\u0274 \u1D18\u1D07\u0280\u1D0D\u026Ass\u026A\u1D0F\u0274s \u0280\u1D07\u01EB\u1D1C\u026A\u0280\u1D07\u1D05 \uD83E\uDD70");
                        keyboard = Markup.inlineKeyboard([
                            [
                                Markup.button.url("📌 ᴀᴅᴅ ᴍᴇ ᴛᴏ ʏᴏᴜʀ ɢʀᴏᴜᴘ 📌", "http://t.me/".concat(env.botUserName, "?startgroup=start")),
                            ],
                            [
                                Markup.button.callback("🛠 ʜᴇʟᴘ", "features"),
                                Markup.button.callback("💌 ᴀʙᴏᴜᴛ", "about"),
                            ],
                            [
                                Markup.button.callback("🎟 ᴘʀᴇᴍɪᴜᴍ", "seeplans"),
                                Markup.button.callback("🎁 ʀᴇғᴇʀ", "refer"),
                            ],
                        ]);
                        return [4 /*yield*/, ctx.editMessageText(message_1, {
                                parse_mode: "Markdown",
                                reply_markup: keyboard.reply_markup,
                            })];
                    case 12:
                        _p.sent();
                        return [3 /*break*/, 15];
                    case 13:
                        keyboard = Markup.inlineKeyboard([[Markup.button.callback("🔙 Home", "home")]]);
                        return [4 /*yield*/, ctx.editMessageText(message, {
                                parse_mode: "Markdown",
                                reply_markup: keyboard.reply_markup,
                                disable_web_page_preview: true,
                            })];
                    case 14:
                        _p.sent();
                        _p.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        err_1 = _p.sent();
                        console.log("Error handling callback:", err_1);
                        return [3 /*break*/, 17];
                    case 17:
                        if (((_l = ctx.chat) === null || _l === void 0 ? void 0 : _l.id) !== undefined) {
                            next();
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
};
function handleUpdateFirstAndActive(ctx, args) {
    return __awaiter(this, void 0, void 0, function () {
        var shareId, aioShortUrl, newActiveShareId, success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shareId = args[0], aioShortUrl = args[1], newActiveShareId = args[2];
                    if (!(!shareId || !aioShortUrl || !newActiveShareId)) return [3 /*break*/, 2];
                    return [4 /*yield*/, ctx.reply("Usage: /updateFirstAndActive <shareId> <aioShortUrl> <newActiveShareId>")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, database.updateFirstSortAndActivePath({ shareId: Number(shareId), aioShortUrl: aioShortUrl }, newActiveShareId)];
                case 3:
                    success = _a.sent();
                    return [4 /*yield*/, ctx.reply(success
                            ? "First sort item and Active Share ID updated successfully!"
                            : "Failed to update First sort item and Active Share ID.")];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function deleteSort(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.deleteAllSortData()];
                case 1:
                    success = _a.sent();
                    return [4 /*yield*/, ctx.reply(success ? "Active Share ID set successfully!" : "Failed to set Active Share ID.")];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
