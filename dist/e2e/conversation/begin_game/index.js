"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./attempt/index");
const superagent_1 = require("superagent");
class BeginGame {
    begin(conversation) {
        return new Promise((resolve, reject) => {
            superagent_1.post(`https://api.dialogflow.com/v1/query?v=20170712`)
                .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
                .set('Content-Type', 'application/json')
                .send({
                "contexts": [],
                "lang": "en",
                "query": "yes",
                "sessionId": `${conversation.getSessionId()}`,
                "timezone": "America/New_York"
            })
                .end((err) => {
                if (err) {
                    reject(err);
                }
                resolve(new index_1.Attempt(conversation));
            });
        });
    }
}
exports.BeginGame = BeginGame;
//# sourceMappingURL=index.js.map