import { BeginGame } from './conversation/begin_game/index';
import { Conversation } from './conversation/index';
import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';

async function test() {
    describe('critical path: playing the game', function () {
        let conversation: Conversation, start: BeginGame;
        beforeEach(async () => {
            conversation = new Conversation();
            start = await conversation.start();
        });
        it('finds the right answer', async function () {
            const game = await start.begin(conversation);
            const rightAnswer = await game.getAnswer(conversation);
            expect(rightAnswer).to.not.be.undefined;
        });
        it('says higher', async function () {
            const game = await start.begin(conversation);
            const wrongAnswer = await game.makeGuess({ guess: -1, conversation });
            expect(wrongAnswer.result.fulfillment.speech).to.equal('Higher!');
        });
        it('says lower', async function () {
            const game = await start.begin(conversation);
            const wrongAnswer = await game.makeGuess({ guess: 6, conversation });
            expect(wrongAnswer.result.fulfillment.speech).to.equal('Lower!');
        });
    });
}

test();