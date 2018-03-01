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
const index_1 = require("./conversation/index");
const mocha_1 = require("mocha");
const chai_1 = require("chai");
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        mocha_1.describe('critical path: playing the game', function () {
            let conversation, start;
            mocha_1.beforeEach(() => __awaiter(this, void 0, void 0, function* () {
                conversation = new index_1.Conversation();
                start = yield conversation.start();
            }));
            mocha_1.it('finds the right answer', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const game = yield start.begin(conversation);
                    const rightAnswer = yield game.getAnswer(conversation);
                    chai_1.expect(rightAnswer).to.not.be.undefined;
                });
            });
            mocha_1.it('says higher', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const game = yield start.begin(conversation);
                    const wrongAnswer = yield game.makeGuess({ guess: -1, conversation });
                    chai_1.expect(wrongAnswer.result.fulfillment.speech).to.equal('Higher!');
                });
            });
            mocha_1.it('says lower', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const game = yield start.begin(conversation);
                    const wrongAnswer = yield game.makeGuess({ guess: 6, conversation });
                    chai_1.expect(wrongAnswer.result.fulfillment.speech).to.equal('Lower!');
                });
            });
        });
    });
}
test();
//# sourceMappingURL=index.e2e.js.map