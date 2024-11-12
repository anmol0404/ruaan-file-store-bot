// keyboardExamples.ts
import { Markup } from "telegraf";
import * as list from "./lists.js";
import env from "../../../services/env.js";
import { editButtonTitle } from "../../caption/editCaption.js";
export function oneTimeGenreKeyboard() {
    return Markup.keyboard(list.genresList).oneTime().resize();
}
export function oneTimeSeasonKeyboard() {
    return Markup.keyboard(list.seasonList).oneTime().resize();
}
export function oneTimeLangKeyboard() {
    return Markup.keyboard(list.langList).oneTime().resize();
}
export function oneTimeSubKeyboard() {
    return Markup.keyboard(list.subList).oneTime().resize();
}
export function oneTimeRatingKeyboard() {
    return Markup.keyboard(list.imdbRatingList).oneTime().resize();
}
export function oneTimeQualityKeyboard() {
    return Markup.keyboard(list.qualityList).oneTime().resize();
}
export function oneTimeDoneKeyboard() {
    return Markup.keyboard([["Done"]])
        .oneTime()
        .resize();
}
export var makeButtons = function (item, next, prev, sendAll, type, totalPage, currentPage) {
    return {
        inline_keyboard: createBatchOfButtons(item, next, prev, sendAll, totalPage, currentPage),
    };
};
function createBatchOfButtons(items, next, prev, sendAll, totalPage, currentPage) {
    var buttonsBatch = [];
    var nextButton = { text: "Next \u00BB", callback_data: next };
    var pageButton = { text: "".concat(currentPage + 1, "/").concat(totalPage), callback_data: "page" };
    var prevButton = { text: "\u00AB Back", callback_data: prev };
    var adjustQuality = { text: "\uD83D\uDC47 Filter By Quality \uD83D\uDC47", callback_data: "adjustquality" };
    var quality480 = { text: "480p", callback_data: "480p" };
    var quality540 = { text: "540p", callback_data: "540p" };
    var quality720 = { text: "720p", callback_data: "720p" };
    var quality1080 = { text: "1080p", callback_data: "1080p" };
    var sendAllButton = { text: "\uD83D\uDC46Send All via PM\uD83D\uDC46", callback_data: sendAll };
    // const hTD: any = { text: "How to download", url: "https://t.me/Infinite_tips/40" };
    buttonsBatch.push([adjustQuality]);
    buttonsBatch.push([quality480, quality540, quality720, quality1080]);
    items.forEach(function (item) {
        var link;
        link = "https://t.me/".concat(env.botUserName, "?start=").concat(item.shareId, "-aio");
        var button = {
            text: convertToTinySubscript(editButtonTitle(item.caption)),
            url: link,
        };
        buttonsBatch.push([button]);
    });
    buttonsBatch.push([sendAllButton]);
    buttonsBatch.push([prevButton, pageButton, nextButton]);
    return buttonsBatch;
}
export var makeCollectionButton = function (link) {
    return {
        inline_keyboard: [
            [{ text: "DOWNLOAD", url: link }],
            [
                {
                    text: "How To Download",
                    url: "".concat(env.howToDownload ? env.howToDownload : "https://t.me/Infinite_tips/17"),
                },
            ],
            [{ text: "❣️❣️ Join Back-UP ❣️❣️", url: "".concat(env.backup) }],
        ],
    };
};
export var makeAdminButtons = function (link, next, prev) {
    return {
        inline_keyboard: [
            [
                { text: "⬅️ Prev", callback_data: prev },
                { text: "Get This", url: link },
                { text: "Next ➡️", callback_data: next },
            ],
            [
                { text: "Delete This", callback_data: "delete" },
                { text: "Edit This", callback_data: "edit" },
            ],
        ],
    };
};
export var editAnimeButtons = function () {
    return {
        inline_keyboard: [
            [
                { text: "Edit anime Name", callback_data: "name" },
                { text: "Edit anime Name", callback_data: "genres" },
            ],
            [
                { text: "Edit anime Season", callback_data: "season" },
                { text: "Edit anime quality", callback_data: "quality" },
            ],
            [
                { text: "Edit anime Total Eps", callback_data: "totaleps" },
                { text: "Edit anime language", callback_data: "language" },
            ],
            [
                { text: "Edit anime Subtitle", callback_data: "subtitle" },
                { text: "Edit anime Poster", callback_data: "poster" },
            ],
            [{ text: "Edit anime Genres", callback_data: "genres" }],
            [{ text: "Add Next Episodes Of this anime", callback_data: "add" }],
        ],
    };
};
export var editMovieButton = function () {
    return {
        inline_keyboard: [
            [
                { text: "Edit Movie Name", callback_data: "name" },
                { text: "Edit Movie Year", callback_data: "year" },
            ],
            [
                { text: "Edit anime quality", callback_data: "quality" },
                { text: "Edit anime language", callback_data: "language" },
            ],
            [
                { text: "Edit anime Subtitle", callback_data: "subtitle" },
                { text: "Edit anime Rating", callback_data: "rating" },
            ],
            [
                { text: "Edit anime Poster", callback_data: "poster" },
                { text: "Edit anime Synopsis", callback_data: "synopsis" },
            ],
            [{ text: "Edit anime Genres", callback_data: "genres" }],
            [{ text: "Add Next Episodes Of this anime", callback_data: "add" }],
        ],
    };
};
export var editAIOButtons = function () {
    return {
        inline_keyboard: [
            [{ text: "Edit The Caption", callback_data: "caption" }],
            [{ text: "Add Next Episodes Of this Drama", callback_data: "add" }],
        ],
    };
};
export var editDramaButtons = function () {
    return {
        inline_keyboard: [
            [
                { text: "Edit Drama Name", callback_data: "name" },
                { text: "Edit Drama Year", callback_data: "year" },
            ],
            [
                { text: "Edit Drama Season", callback_data: "season" },
                { text: "Edit Drama quality", callback_data: "quality" },
            ],
            [
                { text: "Edit Drama Total Eps", callback_data: "totaleps" },
                { text: "Edit Drama language", callback_data: "language" },
            ],
            [
                { text: "Edit Drama Subtitle", callback_data: "subtitle" },
                { text: "Edit Drama Rating", callback_data: "rating" },
            ],
            [
                { text: "Edit Drama Poster", callback_data: "poster" },
                { text: "Edit Drama Synopsis", callback_data: "synopsis" },
            ],
            [{ text: "Edit Drama Genres", callback_data: "genres" }],
            [{ text: "Add Next Episodes Of this Drama", callback_data: "add" }],
        ],
    };
};
export function customButtonsKeyboard() {
    return Markup.keyboard([
        [" ", "😎 Popular"],
        ["☸ Setting", "📞 Feedback"],
        ["📢 Ads", "⭐️ Rate us", "👥 Share"],
    ])
        .oneTime()
        .resize();
}
export function specialButtonsKeyboard() {
    return Markup.keyboard([
        Markup.button.contactRequest("Send contact"),
        Markup.button.locationRequest("Send location"),
    ]).resize();
}
export function pyramidKeyboard() {
    return Markup.keyboard(["one", "two", "three", "four", "five", "six"], {
        wrap: function (btn, index, currentRow) { return currentRow.length >= (index + 1) / 2; },
    });
}
export function simpleHTMLKeyboard() {
    return Markup.keyboard(["Coke", "Pepsi"]);
}
export function inlineHTMLKeyboard() {
    return Markup.inlineKeyboard([
        Markup.button.callback("Coke", "Coke"),
        Markup.button.callback("Pepsi", "Pepsi"),
    ]);
}
export function randomInlineKeyboard() {
    return Markup.inlineKeyboard([
        Markup.button.callback("Coke", "Coke"),
        Markup.button.callback("Dr Pepper", "Dr Pepper", Math.random() > 0.5),
        Markup.button.callback("Pepsi", "Pepsi"),
    ]);
}
export function captionInlineKeyboard() {
    return Markup.inlineKeyboard([
        Markup.button.callback("Plain", "plain"),
        Markup.button.callback("Italic", "italic"),
    ]);
}
export function wrapKeyboard(columns) {
    return Markup.keyboard(["one", "two", "three", "four", "five", "six"], {
        columns: columns,
    });
}
function convertToTinySubscript(inputText) {
    var subscriptMapping = {
        // Letters
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
    return capitalizeFirstLetter(tinySubscriptText.replace(/[()\[\]\+\-]/g, " ").trim());
}
function capitalizeFirstLetter(text) {
    return text
        .split(" ")
        .map(function (word) {
        if (/^[a-zA-Z]/.test(word.charAt(0))) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    })
        .join(" ");
}
