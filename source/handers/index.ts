import { welcome, begin, guess } from './../functions/index';
import * as ActionsOnGoogle from 'actions-on-google';

const DialogFlowApp = ActionsOnGoogle.DialogflowApp;

const getUserId = (app: any): string => {
    // Used if the user is testing on dialogflow
    if (app.getUser() === null) { // change this to app
        return 'testing_user';
    }
    const userId = (app.getUser().userId !== null || typeof app.getUser().userId === 'undefined') ? app.getUser().userId : 'dialog_flow_user';
    return userId;
};

const actionMap = new Map();
actionMap.set('input.welcome', welcome);
actionMap.set('input.begin', begin);
actionMap.set('input.guess', guess);

export const dialogApp = (request, response) => {
    const app = new DialogFlowApp({ request, response });
    console.log('handling intent:', request.body.result.action, 'userId:', getUserId(app));
    app.handleRequest(actionMap);
};