var NativeStorageError = require('./NativeStorageError');

function LocalStorageHandle(success, error, intent, operation, [reference, variable]) {
    if (operation.startsWith('put') || operation.startsWith('set')) {
        try {
            var varAsString = JSON.stringify(variable);
            if (reference === null) {
                error(new NativeStorageError(NativeStorageError.NULL_REFERENCE, "JS", ""));
                return;
            }
            localStorage.setItem(reference, varAsString);
            success(varAsString);
        } catch (err) {
            error(new NativeStorageError(NativeStorageError.JSON_ERROR, "JS", err));
        }
    }
    else if (operation.startsWith('get')) {
        var item = {};
        item = localStorage.getItem(reference);
        if (item === null) {
            error(NativeStorageError.ITEM_NOT_FOUND);
            return;
        }
        try {
            var obj = JSON.parse(item);
            //console.log("LocalStorage Reading: "+obj);
            success(obj);
        } catch (err) {
            error(new NativeStorageError(NativeStorageError.JSON_ERROR, "JS", err));
        }
    }
}
module.exports = LocalStorageHandle;