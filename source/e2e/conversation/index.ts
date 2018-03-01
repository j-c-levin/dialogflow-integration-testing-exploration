import { post } from 'superagent';
import { BeginGame } from './begin_game';

export class Conversation {
    private sessionId: Number;
    constructor() {
        this.sessionId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }
    start(): Promise<BeginGame> {
        return new Promise((resolve, reject) => {
            post(`https://api.dialogflow.com/v1/query?v=20170712`)
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
                    const game = new BeginGame();
                    resolve(game);
                });
        });
    }
    getSessionId(): Number {
        return this.sessionId;
    }
}