import { User } from "telegraf/typings/core/types/typegram.js";
import { CommandContext } from "../interfaces.js";
export declare function sendTokenExpiredMessage(ctx: CommandContext, user: User, shortUrl: string, payload: string): Promise<void>;
export declare function sendWelcomeMessage(ctx: CommandContext, user: User): Promise<void>;
export declare function sendInviterWelcomeMessage(ctx: CommandContext, inviterId: string): Promise<void>;
export declare function sendRateLimitMessage(ctx: CommandContext, user: User): Promise<void>;
export declare function createDeepLinksList(items: {
    caption: string;
    shareId: string;
}[]): string;
export declare function editTitle(caption: string): string;
export declare function convertToTinySubscript(inputText: string): string;
export declare function hasReplyToMessage(message: any): message is {
    reply_to_message: any;
};
export declare function isTextMessage(message: any): message is {
    text: string;
};
