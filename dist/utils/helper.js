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
import env from "../services/env.js";
import { Markup } from "telegraf";
import telegram from "../services/telegram.js";
import { fmt, code, link } from "telegraf/format";
import { isValidUrl } from "../extra/validation.js";
import database from "../services/database.js";
export function sendTokenExpiredMessage(ctx, user, shortUrl, payload) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var firstName, message, keyboard;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    firstName = (((_a = user.first_name) === null || _a === void 0 ? void 0 : _a.replace(/[^a-zA-Z0-9]/g, "")) || "User").trim();
                    message = "Hello ".concat(firstName, ", your token has expired.  \nYou can generate a new token once a day, which takes just 30\u201340 seconds. After that, you\u2019ll enjoy unlimited requests for the next 24 hours!\n");
                    if (env.howToGenerateToken) {
                        message += "Tutorial:\n[TO KNOW HOW TO GENERATE NEW TOKEN](".concat(env.howToGenerateToken, ")");
                    }
                    if (env.websiteBaseUrl) {
                        shortUrl = "".concat(env.websiteBaseUrl, "?q=").concat(user.id);
                    }
                    message += "\nANY PROBLEM CONTACT: [Share Your Problem Here](".concat(env.botSupportLink || "tg://user?id=".concat(env.adminIds[0]), ")");
                    keyboard = [
                        [
                            {
                                text: "Click Me To Generate 1-Day Token",
                                url: shortUrl,
                            },
                        ],
                    ];
                    // Add second button if env.premiumPlansLink exists and is valid
                    if (env && env.premiumPlansLink && isValidUrl(env.premiumPlansLink)) {
                        keyboard.push([
                            {
                                text: "See Premium Plans",
                                url: env.premiumPlansLink,
                            },
                        ]);
                    }
                    keyboard.push([
                        {
                            text: "Try Again",
                            url: "https://t.me/".concat(env.botUserName, "?start=").concat(payload).replace(" ", ""),
                        },
                    ]);
                    return [4 /*yield*/, ctx.reply(message, {
                            reply_to_message_id: ctx.message.message_id,
                            reply_markup: {
                                inline_keyboard: keyboard,
                            },
                            parse_mode: "Markdown",
                            disable_web_page_preview: true,
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function sendWelcomeMessage(ctx, user) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var firstName, message, keyboard;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    firstName = (((_a = user.first_name) === null || _a === void 0 ? void 0 : _a.replace(/[^a-zA-Z0-9]/g, "")) || "User").trim();
                    message = "\uD83D\uDC4B \u029C\u1D07\u029F\u029F\u1D0F ".concat(firstName, "!\n\u026A \u1D00\u1D0D \u1D00 \u1D18\u1D0F\u1D21\u1D07\u0280\uA730\u1D1C\u029F \u0299\u1D0F\u1D1B \u1D1B\u029C\u1D00\u1D1B \u1D21\u1D0F\u0280\u1D0Bs \u026A\u0274 \u0262\u0280\u1D0F\u1D1C\u1D18s . \u1D00\u1D05\u1D05 \u1D0D\u1D07 \u026A\u0274 \u028F\u1D0F\u1D1C\u0280 \u0262\u0280\u1D0F\u1D1C\u1D18, \u1D00\u0274\u1D05 \u026A \u1D21\u026A\u029F\u029F \u0280\u1D07s\u1D18\u1D0F\u0274\u1D05 \u1D21\u029C\u1D07\u0274 \u1D00\u0274\u028F \u1D1Cs\u1D07\u0280 s\u1D07\u0274\u1D05s \u1D00 \u1D0D\u1D0F\u1D20\u026A\u1D07 \u1D0F\u0280 \u1D05\u0280\u1D00\u1D0D\u1D00 \u0274\u1D00\u1D0D\u1D07!\n\u279C\u1D00\u1D05\u1D0D\u026A\u0274 \u1D18\u1D07\u0280\u1D0D\u026Ass\u026A\u1D0F\u0274s \u0280\u1D07\u01EB\u1D1C\u026A\u0280\u1D07\u1D05 \uD83E\uDD70");
                    keyboard = Markup.inlineKeyboard(__spreadArray([
                        [
                            Markup.button.url("📌 ᴀᴅᴅ ᴍᴇ ᴛᴏ ʏᴏᴜʀ ɢʀᴏᴜᴘ 📌", "http://t.me/".concat(env.botUserName, "?startgroup=start")),
                        ],
                        [Markup.button.callback("🛠 ʜᴇʟᴘ", "features"), Markup.button.callback("💌 ᴀʙᴏᴜᴛ", "about")],
                        [
                            Markup.button.callback("🎟 ᴘʀᴇᴍɪᴜᴍ ᴘʟᴀɴs", "seeplans"),
                            Markup.button.callback("🎁 ʀᴇғᴇʀ", "refer"),
                        ]
                    ], (env.mainGroupLink && isValidUrl(env.mainGroupLink)
                        ? [[Markup.button.url("SEND YOUR REQUESTS HERE", env.mainGroupLink)]]
                        : []), true));
                    return [4 /*yield*/, ctx.reply(message, {
                            reply_to_message_id: (_b = ctx.message) === null || _b === void 0 ? void 0 : _b.message_id,
                            parse_mode: "HTML",
                            reply_markup: keyboard.reply_markup,
                        })];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function sendInviterWelcomeMessage(ctx, inviterId) {
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = "Welcome! You were invited by a user with ID ".concat(inviterId, ".\nJoin our main channel for unlimited movies, dramas, and more. Stay updated with the latest releases and exclusive content.\nClick the link to join and start enjoying now!\n").concat(env.join, "\n\n");
                    return [4 /*yield*/, ctx.reply(message)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function sendRateLimitMessage(ctx, user) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var firstName, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    firstName = (((_a = user.first_name) === null || _a === void 0 ? void 0 : _a.replace(/[^a-zA-Z0-9]/g, "")) || "User").trim();
                    message = "Hello ".concat(firstName, "!\nIn 20 minutes, you can only make ").concat(env.RequestLimit, " requests. Please wait for some time before making another request.\n");
                    return [4 /*yield*/, ctx.reply(message, {
                            reply_to_message_id: ctx.message.message_id,
                            parse_mode: "HTML",
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: "❣️❣️Join KDL Official ❣️❣️",
                                            url: "https://t.me/".concat(env.join),
                                        },
                                    ],
                                ],
                            },
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function createDeepLinksList(items) {
    return items
        .map(function (item) {
        return "\u27A4 [".concat(editTitle(item.caption), "](https://t.me/").concat(env.botUserName, "?start=").concat(item.shareId, "-aio)");
    })
        .join("\n");
}
export function editTitle(caption) {
    return convertToTinySubscript(caption.length > 60 ? "".concat(caption.slice(0, 57), "...") : caption);
}
export function convertToTinySubscript(inputText) {
    var subscriptMapping = {
        a: "ᴀ",
        b: "ʙ",
        c: "ᴄ",
        d: "ᴅ",
        e: "ᴇ",
        f: "ғ",
        g: "ɢ",
        h: "ʜ",
        i: "ɪ",
        j: "ᴊ",
        k: "ᴋ",
        l: "ʟ",
        m: "ᴍ",
        n: "ɴ",
        o: "ᴏ",
        p: "ᴘ",
        q: "ǫ",
        r: "ʀ",
        s: "s",
        t: "ᴛ",
        u: "ᴜ",
        v: "ᴠ",
        w: "ᴡ",
        x: "x",
        y: "ʏ",
        z: "ᴢ",
        // Numbers
        // 0: "₀",
        // 1: "₁",
        // 2: "₂",
        // 3: "₃",
        // 4: "₄",
        // 5: "₅",
        // 6: "₆",
        // 7: "₇",
        // 8: "₈",
        // 9: "₉",
    };
    var tinySubscriptText = "";
    for (var _i = 0, _a = inputText.toLowerCase(); _i < _a.length; _i++) {
        var char = _a[_i];
        tinySubscriptText += subscriptMapping[char] || char;
    }
    return tinySubscriptText.replace(/[()\[\]\+\-]/g, " ").trim();
}
export function hasReplyToMessage(message) {
    return message && message.reply_to_message !== undefined;
}
export function isTextMessage(message) {
    return message && typeof message.text === "string";
}
export function sendExpiredTokenToChat(chatId, name, shortUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var message, keyboard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = "Hello ".concat(name, ", your token has expired. You can generate a new token once a day. After that, you can make unlimited requests within 24 hours.");
                    if (env.howToGenerateToken) {
                        message += "\n\nTutorial:\n[TO KNOW HOW TO GENERATE NEW TOKEN](".concat(env.howToGenerateToken, ")");
                    }
                    message += "\nANY PROBLEM CONTACT: [Share Your Problem Here](".concat(env.botSupportLink || "tg://user?id=".concat(env.adminIds[0]), ")");
                    if (env.websiteBaseUrl) {
                        shortUrl = "".concat(env.websiteBaseUrl, "?q=").concat(chatId);
                    }
                    keyboard = [
                        [
                            {
                                text: "Click Me To Generate 1-Day Token",
                                url: shortUrl,
                            },
                        ],
                    ];
                    // Add second button if env.premiumPlansLink exists and is valid
                    if (env && env.premiumPlansLink && isValidUrl(env.premiumPlansLink)) {
                        keyboard.push([
                            {
                                text: "See Premium Plans",
                                url: env.premiumPlansLink,
                            },
                        ]);
                    }
                    // Send the message with the constructed keyboard
                    return [4 /*yield*/, telegram.app.telegram.sendMessage(chatId, message, {
                            reply_markup: {
                                inline_keyboard: keyboard,
                            },
                            parse_mode: "Markdown",
                            disable_web_page_preview: true,
                        })];
                case 1:
                    // Send the message with the constructed keyboard
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function sendExpiredTokenToCtx(ctx, userLink, botLink) {
    return __awaiter(this, void 0, void 0, function () {
        var sentMessage_1, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ctx.reply("Hello [".concat(ctx.from.first_name, "](").concat(userLink, ") \nYour Token Has Expired: [Generate New Token Once in 24 hours](").concat(botLink, ")"), {
                            parse_mode: "Markdown",
                            disable_web_page_preview: true,
                        })];
                case 1:
                    sentMessage_1 = _a.sent();
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ctx.deleteMessage(sentMessage_1.message_id)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 60 * 1000);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error sending expired token message:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var upiId = env.upiId || "yourupi@bank";
export var premiumPlan = fmt(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\u2728 \u1D18\u0280\u1D07\u1D0D\u026A\u1D1C\u1D0D \u1D18\u029F\u1D00\u0274s \u2728\n\n\uD83D\uDCCC \u1D18\u0280\u026A\u1D04\u026A\u0274\u0262:  \n\u25B8 \u20B919 \u2507 1 \u1D21\u1D07\u1D07\u1D0B  \n\u25B8 \u20B935 \u2507 1 \u1D0D\u1D0F\u0274\u1D1B\u029C  \n\u25B8 \u20B999 \u2507 3 \u1D0D\u1D0F\u0274\u1D1B\u029Cs  \n\u25B8 \u20B9169 \u2507 6 \u1D0D\u1D0F\u0274\u1D1B\u029Cs  \n\u25B8 \u20B9329 \u2507 1 \u028F\u1D07\u1D00\u0280  \n\u25B8 \u20B91.5\u1D0B \u2507 \u1D20\u1D00\u029F\u026A\u1D05 \u1D1B\u026A\u029F\u029F \u1D04\u029C\u1D00\u0274\u0274\u1D07\u029F \u1D07x\u026As\u1D1Bs  \n\n\uD83D\uDD39 \u1D18\u0280\u1D07\u1D0D\u026A\u1D1C\u1D0D \u1D04\u029C\u1D00\u0274\u0274\u1D07\u029F \uA730\u1D07\u1D00\u1D1B\u1D1C\u0280\u1D07s: \n\uD83E\uDEF3 \u0274\u1D0F \u1D05\u1D00\u026A\u029F\u028F \u1D1B\u1D0F\u1D0B\u1D07\u0274 \u0262\u1D07\u0274\u1D07\u0280\u1D00\u1D1B\u026A\u1D0F\u0274 \u0280\u1D07\u01EB\u1D1C\u026A\u0280\u1D07\u1D05 \n\uD83E\uDEF3 \u0274\u1D0F \u0280\u1D07\u01EB\u1D1C\u1D07\uA731\u1D1B \u029F\u026A\u1D0D\u026A\u1D1B\n\uD83E\uDEF3 \u0274\u1D0F \u0274\u1D07\u1D07\u1D05 \u1D1B\u1D0F \u1D0A\u1D0F\u026A\u0274 \u1D0D\u1D1C\u029F\u1D1B\u026A\u1D18\u029F\u1D07 \u1D04\u029C\u1D00\u0274\u0274\u1D07\u029F\uA731 \n\uD83E\uDEF3 \u1D00\u1D04\u1D04\u1D07ss \u1D1B\u1D0F \u0274\u1D07\u1D21 & \u1D0F\u029F\u1D05 \u1D0D\u1D0F\u1D20\u026A\u1D07s, \uA731\u1D07\u0280\u026A\u1D07s, \u1D00\u0274\u026A\u1D0D\u1D07 & \u1D0D\u1D0F\u0280\u1D07  \n\uD83E\uDEF3 \u029C\u026A\u0262\u029C-\u01EB\u1D1C\u1D00\u029F\u026A\u1D1B\u028F \u1D04\u1D0F\u0274\u1D1B\u1D07\u0274\u1D1B \u1D00\u1D20\u1D00\u026A\u029F\u1D00\u0299\u029F\u1D07  \n\uD83E\uDEF3 \u1D05\u026A\u0280\u1D07\u1D04\u1D1B \uA730\u026A\u029F\u1D07 \u1D05\u1D0F\u1D21\u0274\u029F\u1D0F\u1D00\u1D05s \n\uD83E\uDEF3 \uA730\u1D1C\u029F\u029F \u1D00\u1D05\u1D0D\u026A\u0274 \uA731\u1D1C\u1D18\u1D18\u1D0F\u0280\u1D1B \uA730\u1D0F\u0280 \u01EB\u1D1C\u1D07\u0280\u026A\u1D07s & \u0280\u1D07\u01EB\u1D1C\u1D07\uA731\u1D1B\uA731\n\uD83E\uDEF3 \u1D05\u026A\u0280\u1D07\u1D04\u1D1B & \u1D00\u1D05\uA731-\uA730\u0280\u1D07\u1D07 \u1D00\u1D04\u1D04\u1D07\uA731\uA731\n\n\u1D18\u1D00\u028F\u1D0D\u1D07\u0274\u1D1B \u1D1C\u1D18\u026A: ", "\n\u1D00\uA730\u1D1B\u1D07\u0280 \u1D18\u1D00\u028F\u1D0D\u1D07\u0274\u1D1B, \uA731\u1D07\u0274\u1D05 \uA731\u1D04\u0280\u1D07\u1D07\u0274\uA731\u029C\u1D0F\u1D1B \u1D1B\u1D0F: ", "\n"], ["\n\u2728 \u1D18\u0280\u1D07\u1D0D\u026A\u1D1C\u1D0D \u1D18\u029F\u1D00\u0274s \u2728\n\n\uD83D\uDCCC \u1D18\u0280\u026A\u1D04\u026A\u0274\u0262:  \n\u25B8 \u20B919 \u2507 1 \u1D21\u1D07\u1D07\u1D0B  \n\u25B8 \u20B935 \u2507 1 \u1D0D\u1D0F\u0274\u1D1B\u029C  \n\u25B8 \u20B999 \u2507 3 \u1D0D\u1D0F\u0274\u1D1B\u029Cs  \n\u25B8 \u20B9169 \u2507 6 \u1D0D\u1D0F\u0274\u1D1B\u029Cs  \n\u25B8 \u20B9329 \u2507 1 \u028F\u1D07\u1D00\u0280  \n\u25B8 \u20B91.5\u1D0B \u2507 \u1D20\u1D00\u029F\u026A\u1D05 \u1D1B\u026A\u029F\u029F \u1D04\u029C\u1D00\u0274\u0274\u1D07\u029F \u1D07x\u026As\u1D1Bs  \n\n\uD83D\uDD39 \u1D18\u0280\u1D07\u1D0D\u026A\u1D1C\u1D0D \u1D04\u029C\u1D00\u0274\u0274\u1D07\u029F \uA730\u1D07\u1D00\u1D1B\u1D1C\u0280\u1D07s: \n\uD83E\uDEF3 \u0274\u1D0F \u1D05\u1D00\u026A\u029F\u028F \u1D1B\u1D0F\u1D0B\u1D07\u0274 \u0262\u1D07\u0274\u1D07\u0280\u1D00\u1D1B\u026A\u1D0F\u0274 \u0280\u1D07\u01EB\u1D1C\u026A\u0280\u1D07\u1D05 \n\uD83E\uDEF3 \u0274\u1D0F \u0280\u1D07\u01EB\u1D1C\u1D07\uA731\u1D1B \u029F\u026A\u1D0D\u026A\u1D1B\n\uD83E\uDEF3 \u0274\u1D0F \u0274\u1D07\u1D07\u1D05 \u1D1B\u1D0F \u1D0A\u1D0F\u026A\u0274 \u1D0D\u1D1C\u029F\u1D1B\u026A\u1D18\u029F\u1D07 \u1D04\u029C\u1D00\u0274\u0274\u1D07\u029F\uA731 \n\uD83E\uDEF3 \u1D00\u1D04\u1D04\u1D07ss \u1D1B\u1D0F \u0274\u1D07\u1D21 & \u1D0F\u029F\u1D05 \u1D0D\u1D0F\u1D20\u026A\u1D07s, \uA731\u1D07\u0280\u026A\u1D07s, \u1D00\u0274\u026A\u1D0D\u1D07 & \u1D0D\u1D0F\u0280\u1D07  \n\uD83E\uDEF3 \u029C\u026A\u0262\u029C-\u01EB\u1D1C\u1D00\u029F\u026A\u1D1B\u028F \u1D04\u1D0F\u0274\u1D1B\u1D07\u0274\u1D1B \u1D00\u1D20\u1D00\u026A\u029F\u1D00\u0299\u029F\u1D07  \n\uD83E\uDEF3 \u1D05\u026A\u0280\u1D07\u1D04\u1D1B \uA730\u026A\u029F\u1D07 \u1D05\u1D0F\u1D21\u0274\u029F\u1D0F\u1D00\u1D05s \n\uD83E\uDEF3 \uA730\u1D1C\u029F\u029F \u1D00\u1D05\u1D0D\u026A\u0274 \uA731\u1D1C\u1D18\u1D18\u1D0F\u0280\u1D1B \uA730\u1D0F\u0280 \u01EB\u1D1C\u1D07\u0280\u026A\u1D07s & \u0280\u1D07\u01EB\u1D1C\u1D07\uA731\u1D1B\uA731\n\uD83E\uDEF3 \u1D05\u026A\u0280\u1D07\u1D04\u1D1B & \u1D00\u1D05\uA731-\uA730\u0280\u1D07\u1D07 \u1D00\u1D04\u1D04\u1D07\uA731\uA731\n\n\u1D18\u1D00\u028F\u1D0D\u1D07\u0274\u1D1B \u1D1C\u1D18\u026A: ", "\n\u1D00\uA730\u1D1B\u1D07\u0280 \u1D18\u1D00\u028F\u1D0D\u1D07\u0274\u1D1B, \uA731\u1D07\u0274\u1D05 \uA731\u1D04\u0280\u1D07\u1D07\u0274\uA731\u029C\u1D0F\u1D1B \u1D1B\u1D0F: ", "\n"])), code(upiId), link("".concat("Admin"), "tg://user?id=".concat(env.adminIds[0])));
export var developerInfo = "  \n\u2023 \u1D05\u1D07\u1D20\u1D07\u029F\u1D0F\u1D18\u1D07\u0280 : \u1D00\u0274\u1D0D\u1D0F\u029F  \n\u2023 \u026A\u1D05 : [\u1D00\u0274\u1D0D\u1D0F\u029F](t.me/eywwi)  \n\u2023 \u029F\u026A\u0299\u0280\u1D00\u0280\u028F : \u1D1B\u1D07\u029F\u1D07\u0262\u0280\u1D00\uA730  \n\u2023 \u029F\u1D00\u0274\u0262\u1D1C\u1D00\u0262\u1D07 : \u1D1Bs  \n\u2023 \u1D05\u1D00\u1D1B\u1D00\u0299\u1D00s\u1D07 : \u1D0D\u1D0F\u0274\u0262\u1D0F\u1D05\u0299  \n\u2023 \u029C\u1D0Fs\u1D1B\u1D07\u1D05 \u1D0F\u0274 : \u1D00\u029F\u029F \u1D21\u1D07\u0299  \n";
export var helpMessage = "  \n\u2728 \u029C\u1D0F\u1D21 \u1D1B\u1D0F \u0280\u1D07\u01EB\u1D1C\u1D07\uA731\u1D1B \u1D05\u0280\u1D00\u1D0D\u1D00\uA731 & \u1D0D\u1D0F\u1D20\u026A\u1D07\uA731 \u2728  \n\n1\uFE0F\u20E3 \uA731\u1D07\u1D00\u0280\u1D04\u029C \u1D1B\u029C\u1D07 \u1D04\u1D0F\u0280\u0280\u1D07\u1D04\u1D1B \u0274\u1D00\u1D0D\u1D07 \u1D0F\u0274 \u0262\u1D0F\u1D0F\u0262\u029F\u1D07.  \n2\uFE0F\u20E3 \uA731\u1D07\u0274\u1D05 \u1D1B\u029C\u1D07 \u0274\u1D00\u1D0D\u1D07 \u026A\u0274 \u1D1B\u029C\u1D07 \u0262\u0280\u1D0F\u1D1C\u1D18.  \n3\uFE0F\u20E3 \u1D1C\uA731\u1D07 \u1D1B\u029C\u026A\uA731 \uA730\u1D0F\u0280\u1D0D\u1D00\u1D1B:  \n\n\uD83D\uDCCC \uA730\u1D0F\u0280 \uA731\u1D07\u0280\u026A\u1D07\uA731:  \n\u27A4 \u1D05\u0280\u1D00\u1D0D\u1D00 \u0274\u1D00\u1D0D\u1D07 + S01 (\uA730\u1D0F\u0280 \uA731\u1D07\u1D00\uA731\u1D0F\u0274 1, \u1D04\u029C\u1D00\u0274\u0262\u1D07 \uA730\u1D0F\u0280 \u1D0F\u1D1B\u029C\u1D07\u0280\uA731)  \n\n\uD83D\uDCCC \uA730\u1D0F\u0280 \u029C\u026A\u0274\u1D05\u026A \u1D05\u0280\u1D00\u1D0D\u1D00\uA731:  \n\u27A4 \u1D05\u0280\u1D00\u1D0D\u1D00 \u0274\u1D00\u1D0D\u1D07 + \u029C\u026A\u0274\u1D05\u026A  \n\n\uD83D\uDCCC \uA730\u1D0F\u0280 \u1D0D\u1D0F\u1D20\u026A\u1D07\uA731:  \n\u27A4 \u1D0D\u1D0F\u1D20\u026A\u1D07 \u0274\u1D00\u1D0D\u1D07 + \u028F\u1D07\u1D00\u0280 (\u1D07x: \u1D0A\u1D0F\u1D0B\u1D07\u0280 2019)  \n\n\uD83D\uDE80 \uA730\u1D0F\u029F\u029F\u1D0F\u1D21 \u1D1B\u029C\u1D07\uA731\u1D07 \uA731\u1D1B\u1D07\u1D18\uA731!  \n";
export function getInviteMessage(username, userId) {
    var firstName = ((username === null || username === void 0 ? void 0 : username.replace(/[^a-zA-Z0-9]/g, "")) || "User").trim();
    var inviteLink = generateInviteLink(userId, false);
    return ("Hello ".concat(firstName, "!\n\n") + "Invite your friends! Your invite link is:\n".concat(inviteLink, "\n\n")
    //  +
    // `You can check your invite progress using the command: /myinvites,\n` +
    // `To see who has invited the most people, use the command: /myinvitestatus`
    );
}
export var generateInviteLink = function (userId, sharLink) {
    if (sharLink) {
        return "https://t.me/share/url?url=https://t.me/".concat(env.botUserName, "?start=invite-").concat(userId);
    }
    return "https://t.me/".concat(env.botUserName, "?start=invite-").concat(userId);
};
export function episodeTagToStart(str) {
    var regexList = [
        /(s\d{1,2})\s*(e\d{1,2})/i, // S01 E01 (space)
        /(s\d{1,2}e\d{1,2})/i, // S01E01
        /(ep\d{1,2}\s*s\d{1,2})/i, // Ep01S01
        /(s\d{1,2}\s*ep\d{1,2})/i, // S01 Ep01
        /(ep\s?\d{1,2})/i, // Ep01
        /(e\d{1,2})/i, // E01
    ];
    var qualityRegex = /\b(720p|1080p|540p|480p|340p)\b/i;
    var episodeTag = "";
    var qualityTag = "";
    var cleanedStr = str;
    for (var _i = 0, regexList_1 = regexList; _i < regexList_1.length; _i++) {
        var regex = regexList_1[_i];
        var match = str.match(regex);
        if (match) {
            episodeTag = match[0].replace(/\s+/g, "").toUpperCase();
            cleanedStr = cleanedStr.replace(match[0], "");
            break;
        }
    }
    var qualityMatch = str.match(qualityRegex);
    if (qualityMatch) {
        qualityTag = qualityMatch[0].toLowerCase();
        cleanedStr = cleanedStr.replace(qualityMatch[0], "");
    }
    if (episodeTag) {
        return "".concat(episodeTag, " ").concat(qualityTag, " ").concat(cleanedStr).trim().replace(/\s+/g, " ");
    }
    return str.trim().replace(/\s+/g, " ");
}
// Validate query parameter and return userId
export function validateQuery(query) {
    if (!query || typeof query !== "string" || query.trim() === "") {
        throw new Error("Invalid or missing query parameter");
    }
    var userId = query.trim();
    if (!/^\d+$/.test(userId)) {
        throw new Error("userId must be a numeric string");
    }
    return userId;
}
// Generate or retrieve token from database
export function getTokenFromDatabase(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var token, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, database.manageToken(userId)];
                case 1:
                    token = (_a.sent()).token;
                    if (!token) {
                        throw new Error("Failed to generate token");
                    }
                    return [2 /*return*/, token];
                case 2:
                    error_2 = _a.sent();
                    throw new Error("Database error: ".concat(error_2.message));
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Send Telegram message with token
export function sendTelegramMessage(userId, token) {
    return __awaiter(this, void 0, void 0, function () {
        var displayToken, message, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    displayToken = token.slice(0, 20);
                    message = "\u2728 *New Token Generated* !* \u2728\n\n\uD83D\uDD11 Your token: *".concat(displayToken, "...*\n\uD83D\uDC46\uD83D\uDC46 *Tap Try Again* to proceed!\uD83D\uDC46\uD83D\uDC46");
                    return [4 /*yield*/, telegram.app.telegram.sendMessage(Number(userId), message)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    throw new Error("Telegram error: ".concat(error_3.message));
                case 3: return [2 /*return*/];
            }
        });
    });
}
var templateObject_1;
