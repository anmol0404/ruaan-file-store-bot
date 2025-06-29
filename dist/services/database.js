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
import getProperDB, { getReqDB } from "../extra/getProperDB.js";
import getRandomId from "../extra/getRandomId.js";
var Database = /** @class */ (function () {
    function Database() {
        this.client = getProperDB();
    }
    Database.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.initialize()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.saveMessages = function (messageIds) {
        return __awaiter(this, void 0, void 0, function () {
            var shareId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shareId = getRandomId();
                        return [4 /*yield*/, this.client.saveMessages(shareId, messageIds)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, shareId];
                }
            });
        });
    };
    Database.prototype.saveAIO = function (aIODocument) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.saveAIO(aIODocument)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, aIODocument.shareId];
                }
            });
        });
    };
    Database.prototype.searchAIO = function (searchCriteria, messageIdLink) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.searchAIO(searchCriteria, messageIdLink)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.getAIOMessages = function (shareId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getAIOMessages(shareId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.saveUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.saveUser(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.isUserExist = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.isUserExist(user)];
            });
        });
    };
    Database.prototype.getMessages = function (shareId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getMessages(shareId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.addAIO = function (shareId, eps) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.addAIO(shareId, eps)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.deleteAIO = function (shareId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.deleteAIO(shareId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.updateAIOAttribute = function (shareId, attribute) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.updateAIOAttribute(shareId, attribute)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.getAllUserIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.getAllUserIds()];
            });
        });
    };
    //invite
    Database.prototype.addInvite = function (userId, invitedUsername, invitedUserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.addInvite(userId, invitedUsername, invitedUserId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getInviteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getInviteUser(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.canRequest = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.canRequest(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.useRequest = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.useRequest(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //token
    Database.prototype.hasGeneratedToken = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.hasGeneratedToken(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.verifyAndValidateToken = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.verifyAndValidateToken(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.generateNewToken = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.generateNewToken(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.manageToken = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.manageToken(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // premium
    Database.prototype.checkBotPremiumStatus = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.checkBotPremiumStatus(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.addBotPremium = function (userId, duration) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.addBotPremium(userId, duration)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.getPremiumDetails = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getPremiumDetails(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.deleteOldTokens = function (days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.deleteOldTokens(days)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.addLinkToFirstSort = function (newLink) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.addLinkToFirstSort(newLink)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.getFirstSortItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getFirstSortItem()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.setActiveShareId = function (newActiveShareId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.setActiveShareId(newActiveShareId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.updateFirstSortAndActivePath = function (newLink, newActiveShareId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.updateFirstSortAndActivePath(newLink, newActiveShareId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Database.prototype.deleteAllSortData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.deleteAllSortData()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Database;
}());
var ReqDB = /** @class */ (function () {
    function ReqDB() {
        this.reqClient = getReqDB();
    }
    ReqDB.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reqClient.initialize()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReqDB.prototype.addUserRequest = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.reqClient.addUserRequest(userId)];
            });
        });
    };
    ReqDB.prototype.hasReachedRequestLimit = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.reqClient.hasReachedRequestLimit(userId)];
            });
        });
    };
    ReqDB.prototype.saveRequestData = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.reqClient.saveRequestData(userId)];
            });
        });
    };
    return ReqDB;
}());
var reqDB = new ReqDB();
export { reqDB };
var database = new Database();
export default database;
