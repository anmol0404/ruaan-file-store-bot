var isValidUrl = function (string) {
    try {
        new URL(string);
        return true;
    }
    catch (_) {
        return false;
    }
};
export { isValidUrl };
