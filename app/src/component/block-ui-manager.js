class BlockUIManager {
    _defaultBlockUI = null;
    _defaultPopupNotifiTime = null;
    _defaultPopupNotifiApp = null;

    // Part code for Popup load && return from API
    register(_ref) {
        if (!this._defaultBlockUI) {
            this._defaultBlockUI = _ref;
        }
    }
    unregister(_ref) {
        if (!!this._defaultBlockUI && this._defaultBlockUI._id === _ref._id) {
            this._defaultBlockUI = null;
        }
    }
    getDefault() {
        return this._defaultBlockUI;
    }
    //--------------------------------***************-----------------------------//

     // Part code for Popup Showtime

    registerPopupNotifiTime(_ref) {
        if (!this._defaultPopupNotifiTime) {
            this._defaultPopupNotifiTime = _ref;
        }
    }
    unregisterPopupNotifiTime(_ref) {
        if (!!this._defaultPopupNotifiTime && this._defaultPopupNotifiTime._id === _ref._id) {
            this._defaultPopupNotifiTime = null;
        }
    }
    getDefaultPopupNotifiTime() {
        return this._defaultPopupNotifiTime;
    }

    //--------------------------------***************-----------------------------//

    // Part code for Popup Notifi App

    registerPopupNotifiApp(_ref) {
        if (!this._defaultPopupNotifiApp) {
            this._defaultPopupNotifiApp = _ref;
        }
    }
    unregisterPopupNotifiApp(_ref) {
        if (!!this._defaultPopupNotifiApp && this._defaultPopupNotifiApp._id === _ref._id) {
            this._defaultPopupNotifiApp = null;
        }
    }
    getDefaultPopupNotifiApp() {
        return this._defaultPopupNotifiApp;
    }
    //--------------------------------***************-----------------------------//


    //--------------------------------***************-----------------------------//

    // Part code for PopUpValidate App

    registerPopUpValidate(_ref) {
        if (!this._defaultPopUpValidate) {
            this._defaultPopUpValidate = _ref;
        }
    }
    unregisterPopUpValidate(_ref) {
        if (!!this._defaultPopUpValidate && this._defaultPopUpValidate._id === _ref._id) {
            this._defaultPopUpValidate = null;
        }
    }
    getDefaultPopUpValidate() {
        return this._defaultPopUpValidate;
    }
    //--------------------------------***************-----------------------------//

}

export default new BlockUIManager();