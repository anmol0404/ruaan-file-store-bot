import { User } from "telegraf/typings/core/types/typegram.js";
import { DatabaseClient, RequestDBClient } from "../interfaces.js";
import { AIOSearchCriteria } from "../databases/interfaces/searchCriteria.js";
import { AIODocument } from "../databases/interfaces/aIO.js";
import { SortDocument } from "../databases/interfaces/sort.js";
import { InviteUser } from "../databases/interfaces/inviteUser.js";
declare class Database {
    client: DatabaseClient;
    constructor();
    initialize(): Promise<void>;
    saveMessages(messageIds: number[]): Promise<number>;
    saveAIO(aIODocument: AIODocument): Promise<number>;
    searchAIO(searchCriteria: AIOSearchCriteria, messageIdLink?: string | null): Promise<AIODocument[] | undefined>;
    getAIOMessages(shareId: number): Promise<AIODocument | undefined>;
    saveUser(user: User): Promise<User>;
    isUserExist(user: string): Promise<boolean>;
    getMessages(shareId: number): Promise<number[] | undefined>;
    addAIO(shareId: number, eps: number[]): Promise<any>;
    deleteAIO(shareId: number): Promise<any>;
    updateAIOAttribute(shareId: number, attribute: any): Promise<any>;
    getAllUserIds(): Promise<number[] | undefined>;
    addInvite(userId: string, invitedUsername: string, invitedUserId: string): Promise<void>;
    getInviteUser(userId: string): Promise<InviteUser | null>;
    canRequest(userId: string): Promise<boolean>;
    useRequest(userId: string): Promise<void>;
    hasGeneratedToken(userId: string): Promise<boolean>;
    verifyAndValidateToken(userId: string): Promise<boolean>;
    generateNewToken(userId: string): Promise<string>;
    manageToken(userId: string): Promise<{
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
declare class ReqDB {
    reqClient: RequestDBClient;
    constructor();
    initialize(): Promise<void>;
    addUserRequest(userId: string): Promise<any>;
    hasReachedRequestLimit(userId: string): Promise<any>;
    saveRequestData(userId: string): Promise<any>;
}
declare const reqDB: ReqDB;
export { reqDB };
declare const database: Database;
export default database;
