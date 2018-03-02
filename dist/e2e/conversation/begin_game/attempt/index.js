"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = require("superagent");
class Attempt {
    constructor(conversation) {
        this.sessionId = conversation.getSessionId();
    }
    makeGuess(guess) {
        return new Promise((resolve, reject) => {
            superagent_1.post(`https://api.dialogflow.com/v1/query?v=20170712`)
                .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
                .set('Content-Type', 'application/json')
                .send({
                "contexts": [],
                "lang": "en",
                "query": `${guess}`,
                "sessionId": `${this.sessionId}`,
                "timezone": "America/New_York"
            })
                .end((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.body);
            });
        });
    }
    getAnswer() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let guess = 0; guess < 5; guess++) {
                const result = yield this.makeGuess(guess);
                if (result.result.fulfillment.speech === `You got it!  Do you want to play again?`) {
                    return guess;
                }
            }
            throw new Error('No right answer found');
        });
    }
}
exports.Attempt = Attempt;
//# sourceMappingURL=index.js.map