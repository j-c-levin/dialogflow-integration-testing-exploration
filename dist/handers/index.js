"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../functions/index");
const ActionsOnGoogle = require("actions-on-google");
const DialogFlowApp = ActionsOnGoogle.DialogflowApp;
const getUserId = (app) => {
    // Used if the user is testing on dialogflow
    if (app.getUser() === null) {
        return 'testing_user';
    }
    const userId = (app.getUser().userId !== null || typeof app.getUser().userId === 'undefined') ? app.getUser().userId : 'dialog_flow_user';
    return userId;
};
const actionMap = new Map();
actionMap.set('input.welcome', index_1.welcome);
actionMap.set('input.begin', index_1.begin);
actionMap.set('input.guess', index_1.guess);
exports.dialogApp = (request, response) => {
    const app = new DialogFlowApp({ request, response });
    console.log('handling intent:', request.body.result.action, 'userId:', getUserId(app));
    app.handleRequest(actionMap);
};
//# sourceMappingURL=index.js.map