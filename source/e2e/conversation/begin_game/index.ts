import { Conversation } from './../index';
import { Attempt } from './attempt/index';
import { post } from "superagent";

export class BeginGame {
    begin(conversation: Conversation): Promise<Attempt> {
        return new Promise((resolve, reject) => {
            post(`https://api.dialogflow.com/v1/query?v=20170712`)
                .set('Authorization', 'Bearer 0f9d4beed3fc4e95b627d7a1270e1685')
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
                    resolve(new Attempt());
                });
        });
    }
}