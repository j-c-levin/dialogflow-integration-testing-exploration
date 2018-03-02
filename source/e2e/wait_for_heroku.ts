import { get } from 'superagent';
import * as dotenv from 'dotenv';
dotenv.config();

function begin() {
    console.log('Giving heroku time to deploy');
    setTimeout(() => {
        console.log('Begining to ping');
        waitForHeroku();
    });
}

async function waitForHeroku() {
    try {
        const response = await pingAlive();
        console.log(`Heroku responded: ${JSON.stringify(response)}`);
    } catch (e) {
        console.log(`Failed to ping: ${e}, retrying in 5 seconds`);
        setTimeout(() => {
            waitForHeroku();
        }, 5000);
    }
}

function pingAlive() {
    return new Promise((resolve, reject) => {
        const url = `${process.env.HEROKU_URL}/alive`;
        console.log(`pinging ${url}`);
        get(url)
            .end((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
}

begin();