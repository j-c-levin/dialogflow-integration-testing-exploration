import { get } from 'superagent';
import * as dotenv from 'dotenv';
dotenv.config();

async function waitForHeroku() {
    try {
        const response = await pingAlive();
        console.log(`Heroku responded: ${response}`);
    } catch (e) {
        console.log(`Failed to ping: ${e}, retrying in 5 seconds`);
        setTimeout(() => {
            waitForHeroku();
        }, 5000);
    }
}

function pingAlive() {
    return new Promise((resolve, reject) => {
        get(`${process.env.HEROKU_URL}/alive`)
            .end((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
}

waitForHeroku();