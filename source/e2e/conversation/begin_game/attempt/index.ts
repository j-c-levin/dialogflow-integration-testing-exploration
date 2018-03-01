import { Conversation } from './../../index';
import { post } from "superagent";

export class Attempt {
    private sessionId: Number;
    constructor(conversation: Conversation) {
        this.sessionId = conversation.getSessionId();
    }
    makeGuess(guess: Number): Promise<any> {
        return new Promise((resolve, reject) => {
            post(`https://api.dialogflow.com/v1/query?v=20170712`)
                .set('Authorization', 'Bearer 0f9d4beed3fc4e95b627d7a1270e1685')
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
    async getAnswer(): Promise<any> {
        for (let guess = 0; guess < 5; guess++) {
            const result = await this.makeGuess(guess);
            if (result.result.fulfillment.speech === `You got it!  Do you want to play again?`) {
                return guess;
            }
        }
        throw new Error('No right answer found');
    }
}