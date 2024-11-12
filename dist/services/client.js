"use strict";
// import { Api, TelegramClient } from "telegram/index.js";
// import { StringSession } from "telegram/sessions/index.js";
// import { myVar } from "../myVar.js";
// import { TotalList } from "telegram/Helpers";
// import { processCaption } from "../utils/caption/editCaption.js";
// const apiIdBHAIString: string = process.env.API_ID_LUFFY || "";
// const apiHashBHAI: string = process.env.API_HASH_LUFFY || "";
// const sessionBHAI: string = process.env.SESSION_LUFFY || "";
// export const bhai = new TelegramClient(
//   new StringSession(sessionBHAI),
//   parseInt(apiIdBHAIString),
//   apiHashBHAI,
//   { connectionRetries: 5 }
// );
// // export async function forwardMessageAsCopy(client: any, chat: any, messages: any) {
// //   try {
// //     await client.connect();
// //     const source = await client.getInputEntity(BigInt(chat));
// //     const batchSize = 50;
// //     for (let i = 0; i < messages.length; i += batchSize) {
// //       const batchMessages = messages.slice(i, i + batchSize);
// //       for (const message of batchMessages) {
// //         console.log(message.id);
// //         if (message.id > myVar.COPY_FROM) {
// //           console.log(message);
// //           if (message.hasOwnProperty("message") && message.message) {
// //             console.log(message.message);
// //             message.entity = null;
// //             let modifiedMessage = message.message.replace(
// //               /(@[\w\d_]+)|(https?:\/\/[\S]+)/g,
// //               function (match: any, p1: any, p2: any) {
// //                 if (p1) {
// //                   return "";
// //                 } else {
// //                   return "";
// //                 }
// //               }
// //             );
// //             message.message = modifiedMessage;
// //             await client.sendMessage(source, { message });
// //             await delay(2000, 10000);
// //           }
// //         }
// //       }
// //       console.log(
// //         `Forwarded ${Math.min(batchSize, messages.length - i)} messages as copy to ${chat}`
// //       );
// //     }
// //     console.log("All messages forwarded as copy!");
// //   } catch (error) {
// //     console.error("Error forwarding messages as copy:", error);
// //     throw error;
// //   }
// // }
// function delay(min: any, max: any) {
//   const delayTime = Math.floor(Math.random() * (max - min + 1) + min);
//   return new Promise((resolve) => setTimeout(resolve, delayTime));
// }
// export async function editCaption(chat: any, msgIds: number[], join: string) {
//   const client = bhai;
//   await client.connect();
//   const source = await client.getInputEntity(parseInt(chat));
//   for (const msgId of msgIds) {
//     let success = false;
//     while (!success) {
//       try {
//         const getMsg = await getMessageFromId(client, chat, msgId);
//         const oldCap: string = getMsg[0].message;
//         var newCap: string = processCaption(oldCap, join);
//         await client.invoke(
//           new Api.messages.EditMessage({
//             peer: source,
//             id: msgId,
//             message: newCap,
//           })
//         );
//         success = true;
//         await new Promise((resolve) => setTimeout(resolve, 400));
//       } catch (error) {
//         success = false;
//         console.error(`Error editing caption for message with ID ${msgId}:`, error);
//       }
//     }
//   }
//   // await client.disconnect();
// }
// export async function getMessageFromId(client: any, chat: any, messageId: any) {
//   const source = await client.getInputEntity(BigInt(chat));
//   const message = await client.getMessages(source, { ids: [messageId] });
//   console.log(message);
//   return message;
// }
// export async function sendMessage(chat: string, message: any) {
//   try {
//     await bhai.connect();
//     await bhai.sendMessage(chat, { message, parseMode: "md" });
//     // await bhai.disconnect();
//   } catch (error) {
//     console.error("Error sending message with Markdown:", error);
//     // await bhai.disconnect();
//   }
// }
// export async function getAllMessages(chat: number) {
//   try {
//     await bhai.connect();
//     const source = await bhai.getInputEntity(chat);
//     // let allMessageIds: any[] = [];
//     let offsetId = myVar.COPY_FROM;
//     const messages = await bhai.getMessages(source, {
//       limit: 3000,
//       offsetId: offsetId,
//       reverse: true,
//     });
//     return messages;
//   } catch (error) {
//     console.error("Error getting all message IDs:", error);
//     throw error;
//   }
// }
// import { Api, TelegramClient } from "telegram/index.js";
// import { StringSession } from "telegram/sessions/index.js";
// import { myVar } from "../myVar.js";
// import { TotalList } from "telegram/Helpers";
// const apiIdBHAIString: string = process.env.API_ID_LUFFY || "";
// const apiHashBHAI: string = process.env.API_HASH_LUFFY || "";
// const sessionBHAI: string = process.env.SESSION_LUFFY || "";
// export const bhai = new TelegramClient(
//   new StringSession(sessionBHAI),
//   parseInt(apiIdBHAIString),
//   apiHashBHAI,
//   { connectionRetries: 5 }
// );
// // // export async function forwardMessageAsCopy(client: any, chat: any, messages: any) {
// // //   try {
// // //     await client.connect();
// // //     const source = await client.getInputEntity(BigInt(chat));
// // //     const batchSize = 50;
// // //     for (let i = 0; i < messages.length; i += batchSize) {
// // //       const batchMessages = messages.slice(i, i + batchSize);
// // //       for (const message of batchMessages) {
// // //         console.log(message.id);
// // //         if (message.id > myVar.COPY_FROM) {
// // //           console.log(message);
// // //           if (message.hasOwnProperty("message") && message.message) {
// // //             console.log(message.message);
// // //             message.entity = null;
// // //             let modifiedMessage = message.message.replace(
// // //               /(@[\w\d_]+)|(https?:\/\/[\S]+)/g,
// // //               function (match: any, p1: any, p2: any) {
// // //                 if (p1) {
// // //                   return "";
// // //                 } else {
// // //                   return "";
// // //                 }
// // //               }
// // //             );
// // //             message.message = modifiedMessage;
// // //             await client.sendMessage(source, { message });
// // //             await delay(2000, 10000);
// // //           }
// // //         }
// // //       }
// // //       console.log(
// // //         `Forwarded ${Math.min(batchSize, messages.length - i)} messages as copy to ${chat}`
// // //       );
// // //     }
// // //     console.log("All messages forwarded as copy!");
// // //   } catch (error) {
// // //     console.error("Error forwarding messages as copy:", error);
// // //     throw error;
// // //   }
// // // }
// // function delay(min: any, max: any) {
// //   const delayTime = Math.floor(Math.random() * (max - min + 1) + min);
// //   return new Promise((resolve) => setTimeout(resolve, delayTime));
// // }
// export async function editCaption(chat: any, msgIds: number[], join: string) {
//   const client = bhai;
//   await client.connect();
//   const source = await client.getInputEntity(parseInt(chat));
//   for (const msgId of msgIds) {
//     let success = false;
//     while (!success) {
//       try {
//         const getMsg = await getMessageFromId(client, chat, msgId);
//         var newCap: string = "";
//         const oldCap: string = getMsg[0].message;
//         const stringWithSpaces: string = oldCap.replace(/\./g, " ").replace(/_/g, " ");
//         const withoutLinks: string = stringWithSpaces.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
//         const withoutAtWords: string = withoutLinks.replace(/@\w+\s?/g, "");
//         const indexOfSize: number = withoutAtWords.indexOf("🔘 SIZE");
//         if (indexOfSize !== -1) {
//           newCap = withoutAtWords.substring(0, indexOfSize);
//         } else {
//           newCap = withoutAtWords;
//         }
//         newCap = newCap + `\n JOIN: @${join}\n for more drama movies!!`;
//         await client.invoke(
//           new Api.messages.EditMessage({
//             peer: source,
//             id: msgId,
//             message: newCap,
//           })
//         );
//         success = true;
//         await new Promise((resolve) => setTimeout(resolve, 400));
//       } catch (error) {
//         success = false;
//         console.error(`Error editing caption for message with ID ${msgId}:`, error);
//       }
//     }
//   }
//   await client.disconnect();
// }
// export async function getMessageFromId(client: any, chat: any, messageId: any) {
//   const source = await client.getInputEntity(BigInt(chat));
//   const message = await client.getMessages(source, { ids: [messageId] });
//   console.log(message);
//   return message;
// }
// export async function sendMessage(chat: string, message: any) {
//   try {
//     await bhai.connect();
//     await bhai.sendMessage(chat, { message, parseMode: "md" });
//     await bhai.disconnect();
//   } catch (error) {
//     console.error("Error sending message with Markdown:", error);
//     await bhai.disconnect();
//   }
// }
// export async function getAllMessages(chat: number) {
//   try {
//     await bhai.connect();
//     const source = await bhai.getInputEntity(chat);
//     // let allMessageIds: any[] = [];
//     let offsetId = myVar.COPY_FROM;
//     const messages = await bhai.getMessages(source, {
//       limit: 1210,
//       offsetId: offsetId,
//       reverse: true,
//     });
//     return messages;
//   } catch (error) {
//     console.error("Error getting all message IDs:", error);
//     throw error;
//   }
// }
