import startHandler from "./start.js";
import reqAIOHandler from "./reqAIO.js";
import addAIOHandler from "./addAIO.js";
import reqOGHandler from "./reqOg.js";
import editAIOHandler from "./editAIO.js";
import addToPremiumHandler from "./addToPremium.js";
import premiumHandler from "./premium.js";
import broadcastHandler from "./broadcast.js";
import { deleteTokenHandler } from "./deleteToken.js";
export default {
    startHandler: startHandler,
    reqAIOHandler: reqAIOHandler,
    addAIOHandler: addAIOHandler,
    editAIOHandler: editAIOHandler,
    addToPremiumHandler: addToPremiumHandler,
    premiumHandler: premiumHandler,
    reqOGHandler: reqOGHandler,
    broadcastHandler: broadcastHandler,
    deleteTokenHandler: deleteTokenHandler,
};
