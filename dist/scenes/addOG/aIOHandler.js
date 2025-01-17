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
import * as keyboard from "../../utils/markupButton/permanantButton/keyboard.js";
import telegram from "../../services/telegram.js";
import database from "../../services/database.js";
import getAIOdata from "./aIODocument.js";
import { sendToCOllection } from "../../utils/sendToCollection.js";
import env from "../../services/env.js";
import getRandomId from "../../extra/getRandomId.js";
import { processCaption } from "../../utils/caption/editCaption.js";
import { delay } from "../../extra/delay.js";
function startCopying(ctx) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var caption, msgId, AIODetails, forwardedMessageIds, AIOData, shareId, _c, botUsername, link, sortUrl, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!(ctx.message &&
                        "text" in ctx.message &&
                        (ctx.message.text.toLowerCase() === "done" || ctx.message.text === "/cancel"))) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Share AIO Canceled start again /aog")];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _d.sent()];
                case 3:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/aog")) return [3 /*break*/, 5];
                    return [4 /*yield*/, ctx.reply("send Files")];
                case 4:
                    _d.sent();
                    return [3 /*break*/, 18];
                case 5: return [4 /*yield*/, ctx.reply("Send next file if Done Click Done ".concat((_a = ctx.session.msgId) === null || _a === void 0 ? void 0 : _a.length), keyboard.oneTimeDoneKeyboard())];
                case 6:
                    _d.sent();
                    caption = getRandomId().toString();
                    msgId = ctx.message.message_id;
                    if (!("caption" in ctx.message)) return [3 /*break*/, 18];
                    caption = ctx.message.caption || "????";
                    AIODetails = {
                        aIOTitle: processCaption(caption, env.join) || "",
                        backupChannel: "none",
                        messageIds: [msgId],
                        aIOPosterID: "none",
                    };
                    return [4 /*yield*/, telegram.forwardMessages(env.dbOGChannelId, (_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.id, [msgId], false, [caption])];
                case 7:
                    forwardedMessageIds = _d.sent();
                    _d.label = 8;
                case 8:
                    _d.trys.push([8, 16, , 18]);
                    return [4 /*yield*/, getAIOdata(AIODetails, forwardedMessageIds)];
                case 9:
                    AIOData = _d.sent();
                    if (!AIOData) return [3 /*break*/, 11];
                    return [4 /*yield*/, database.saveOG(AIOData)];
                case 10:
                    _c = _d.sent();
                    return [3 /*break*/, 12];
                case 11:
                    _c = null;
                    _d.label = 12;
                case 12:
                    shareId = _c;
                    botUsername = ctx.botInfo.username;
                    link = shareId ? "https://t.me/".concat(botUsername, "?start=").concat(shareId, "-eng") : null;
                    sortUrl = (AIOData === null || AIOData === void 0 ? void 0 : AIOData.aioShortUrl) || "";
                    if (!AIOData || !shareId || !link) {
                        throw new Error("Failed to process the request ");
                    }
                    return [4 /*yield*/, ctx.reply(link + AIOData.aioShortUrl)];
                case 13:
                    _d.sent();
                    return [4 /*yield*/, delay(500, 1000)];
                case 14:
                    _d.sent();
                    return [4 /*yield*/, sendToCOllection(env.ongoingChannelID, sortUrl, processCaption(caption || "none", env.join))];
                case 15:
                    _d.sent();
                    return [3 /*break*/, 18];
                case 16:
                    error_1 = _d.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 17: return [2 /*return*/, _d.sent()];
                case 18: return [2 /*return*/];
            }
        });
    });
}
export { startCopying };
