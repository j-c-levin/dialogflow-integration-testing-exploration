"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = require("superagent");
const begin_game_1 = require("./begin_game");
class Conversation {
    constructor() {
        this.sessionId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }
    start() {
        return new Promise((resolve, reject) => {
            superagent_1.post(`https://api.dialogflow.com/v1/query?v=20170712`)
                .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
                .set('Content-Type', 'application/json')
                .send({
                "contexts": [],
                "lang": "en",
                "query": "hello",
                "sessionId": `${this.sessionId}`,
                "timezone": "America/New_York"
            })
                .end((err) => {
                if (err) {
                    reject(err);
                }
                const game = new begin_game_1.BeginGame();
                resolve(game);
            });
        });
    }
    getSessionId() {
        return this.sessionId;
    }
}
exports.Conversation = Conversation;
//# sourceMappingURL=index.js.map