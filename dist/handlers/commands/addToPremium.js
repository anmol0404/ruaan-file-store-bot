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
import auth from "../../services/auth.js";
import database from "../../services/database.js";
import { hasReplyToMessage, isTextMessage } from "../../utils/helper.js";
export default function addToPremiumHandler(ctx) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var userId, firstName, args, addToUserToPremium, duration, replyToMessage, result, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
                    firstName = ((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.first_name) || "user";
                    args = isTextMessage(ctx.message) ? ctx.message.text.split(" ") : null;
                    addToUserToPremium = "";
                    duration = "";
                    if (!(!auth.isOwner(userId) || !userId)) return [3 /*break*/, 2];
                    return [4 /*yield*/, ctx.reply("Sorry, you have no permission to do this")];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
                case 2:
                    if (!(!args || args.length < 3 || args.length > 2)) return [3 /*break*/, 4];
                    return [4 /*yield*/, ctx.reply("Please specify the day duration (e.g., /addtopremium 1d or /addtopremium userid 1d [for days]).")];
                case 3:
                    _c.sent();
                    return [2 /*return*/];
                case 4:
                    if (!(args.length === 3)) return [3 /*break*/, 5];
                    addToUserToPremium = args[1];
                    duration = args[2];
                    return [3 /*break*/, 8];
                case 5:
                    if (!!hasReplyToMessage(ctx.message)) return [3 /*break*/, 7];
                    return [4 /*yield*/, ctx.reply("Please reply to a user message to enable autoreply.")];
                case 6:
                    _c.sent();
                    return [2 /*return*/];
                case 7:
                    replyToMessage = ctx.message.reply_to_message;
                    addToUserToPremium = replyToMessage.from.id;
                    duration = args[1];
                    _c.label = 8;
                case 8:
                    _c.trys.push([8, 11, , 12]);
                    return [4 /*yield*/, database.addBotPremium(addToUserToPremium.toString(), duration)];
                case 9:
                    result = _c.sent();
                    return [4 /*yield*/, ctx.reply("[".concat(firstName, "](tg://user?id=").concat(userId, ")").concat(result), {
                            parse_mode: "Markdown",
                        })];
                case 10:
                    _c.sent();
                    return [3 /*break*/, 12];
                case 11:
                    err_1 = _c.sent();
                    console.log(err_1);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
