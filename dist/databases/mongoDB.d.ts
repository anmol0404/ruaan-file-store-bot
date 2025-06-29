/// <reference types="mongoose/types/aggregate.js" />
/// <reference types="mongoose/types/callback.js" />
/// <reference types="mongoose/types/collection.js" />
/// <reference types="mongoose/types/connection.js" />
/// <reference types="mongoose/types/cursor.js" />
/// <reference types="mongoose/types/document.js" />
/// <reference types="mongoose/types/error.js" />
/// <reference types="mongoose/types/expressions.js" />
/// <reference types="mongoose/types/helpers.js" />
/// <reference types="mongoose/types/middlewares.js" />
/// <reference types="mongoose/types/indexes.js" />
/// <reference types="mongoose/types/models.js" />
/// <reference types="mongoose/types/mongooseoptions.js" />
/// <reference types="mongoose/types/pipelinestage.js" />
/// <reference types="mongoose/types/populate.js" />
/// <reference types="mongoose/types/query.js" />
/// <reference types="mongoose/types/schemaoptions.js" />
/// <reference types="mongoose/types/schematypes.js" />
/// <reference types="mongoose/types/session.js" />
/// <reference types="mongoose/types/types.js" />
/// <reference types="mongoose/types/utility.js" />
/// <reference types="mongoose/types/validation.js" />
/// <reference types="mongoose/types/virtuals.js" />
/// <reference types="mongoose/types/inferschematype.js" />
import mongoose, { Model } from "mongoose";
import { MessageDocument } from "./models/messageModel.js";
import { UserDocument } from "./models/userModel.js";
import { AIODocument } from "./interfaces/aIO.js";
import { AIOSearchCriteria } from "./interfaces/searchCriteria.js";
import { SortDocument } from "./interfaces/sort.js";
import { InviteService } from "./inviteService.js";
import { InviteUser } from "./interfaces/inviteUser.js";
import { ITokenDocument } from "./interfaces/token.js";
declare class MongoDB {
    db: typeof mongoose;
    MessageModel: Model<MessageDocument>;
    UserModel: Model<UserDocument>;
    AIOModel: Model<AIODocument>;
    SortModel: Model<SortDocument>;
    TokenModel: Model<ITokenDocument>;
    inviteService: InviteService;
    databaseUrl: string;
    constructor();
    initialize(): Promise<void>;
    saveMessages(shareId: number, messageIds: number[]): Promise<number>;
    saveUser(user: UserDocument): Promise<UserDocument>;
    isUserExist(userId: string): Promise<boolean>;
    getMessages(shareId: number): Promise<number[] | undefined>;
    getAIOMessages(shareId: number): Promise<AIODocument | undefined>;
    saveAIO(aio: AIODocument): Promise<AIODocument>;
    searchAIO(criteria: AIOSearchCriteria, messageIdLink?: string | null): Promise<AIODocument[] | undefined>;
    private logNotFound;
    addAIO(shareId: number, messageIds: number[]): Promise<boolean>;
    deleteAIO(shareId: number): Promise<boolean>;
    updateAIOAttribute(shareId: number, updateQuery: any): Promise<boolean>;
    getAllUserIds(): Promise<number[]>;
    addInvite(userId: string, invitedUsername: string, invitedUserId: string): Promise<void>;
    getInviteUser(userId: string): Promise<InviteUser | null>;
    canRequest(userId: string): Promise<boolean>;
    useRequest(userId: string): Promise<void>;
    hasGeneratedToken(userId: string): Promise<boolean>;
    verifyAndValidateToken(userId: string): Promise<boolean>;
    generateNewToken(userId: string): Promise<string>;
    manageToken(userId: string, token?: string): Promise<{
        token: string;
        message: string;
    }>;
    checkBotPremiumStatus(userId: string): Promise<boolean>;
    addBotPremium(userId: string, duration: string): Promise<string>;
    getPremiumDetails(userId: string): Promise<string>;
    deleteOldTokens(days: number): Promise<void>;
    addLinkToFirstSort(newLink: {
        shareId: number;
        aioShortUrl: string;
    }): Promise<boolean>;
    getFirstSortItem(): Promise<SortDocument | null>;
    setActiveShareId(newActiveShareId: string): Promise<boolean>;
    updateFirstSortAndActivePath(newLink: {
        shareId: number;
        aioShortUrl: string;
    }, newActiveShareId: string): Promise<boolean>;
    deleteAllSortData(): Promise<boolean>;
}
declare const mongoDB: MongoDB;
export default mongoDB;
