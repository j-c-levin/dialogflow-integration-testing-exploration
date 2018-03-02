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
const dotenv = require("dotenv");
dotenv.config();
function waitForHeroku() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield pingAlive();
            console.log(`Heroku responded: ${response}`);
        }
        catch (e) {
            console.log(`Failed to ping: ${e}, retrying in 5 seconds`);
            setTimeout(() => {
                waitForHeroku();
            }, 5000);
        }
    });
}
function pingAlive() {
    return new Promise((resolve, reject) => {
        superagent_1.get(`${process.env.HEROKU_URL}/alive`)
            .end((err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}
waitForHeroku();
//# sourceMappingURL=wait_for_heroku.js.map