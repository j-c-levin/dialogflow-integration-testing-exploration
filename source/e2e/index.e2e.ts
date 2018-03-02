import { Conversation } from './conversation/index';
import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { Attempt } from './conversation/begin_game/attempt';
import * as dotenv from 'dotenv';
dotenv.config();

describe('critical path: playing the game', function () {
    let conversation: Conversation, attempt: Attempt;
    beforeEach(async () => {
        conversation = new Conversation();
        const game = await conversation.start();
        attempt = await game.begin(conversation);
    });
    it('finds the right answer', async function () {
        const rightAnswer = await attempt.getAnswer();
        expect(rightAnswer).to.not.be.undefined;
    });
    it('says higher', async function () {
        const wrongAnswer = await attempt.makeGuess(-1);
        expect(wrongAnswer.result.fulfillment.speech).to.equal('Higher!');
    });
    it('says lower', async function () {
        const wrongAnswer = await attempt.makeGuess(6);
        expect(wrongAnswer.result.fulfillment.speech).to.equal('Lower!');
    });
});