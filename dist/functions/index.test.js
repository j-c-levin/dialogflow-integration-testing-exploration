"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
mocha_1.describe('welcome', () => {
    mocha_1.it('greets a user', () => {
        const askSpy = sinon_1.spy();
        const args = {
            ask: askSpy
        };
        index_1.welcome(args);
        chai_1.expect(askSpy.getCall(0).args[0]).to.equal(`Greetings!  Would you like to play higher or lower?`);
    });
});
mocha_1.describe('begin', () => {
    mocha_1.it('begins the game', () => {
        const askSpy = sinon_1.spy();
        const args = {
            ask: askSpy,
            data: {}
        };
        index_1.begin(args);
        chai_1.expect(askSpy.getCall(0).args[0]).to.equal(`I'm thinking of a number between zero and five, have a guess.`);
    });
    mocha_1.it('sets a chosen number', () => {
        const args = {
            ask: () => { },
            data: {
                chosenNumber: -1
            }
        };
        index_1.begin(args);
        chai_1.expect(args.data.chosenNumber).to.not.equal(-1);
    });
});
mocha_1.describe('guess', () => {
    mocha_1.it('says higher', () => {
        const askSpy = sinon_1.spy();
        const args = {
            ask: askSpy,
            data: {
                chosenNumber: 3
            },
            getContext: () => { return { parameters: { number: [1] } }; }
        };
        index_1.guess(args);
        chai_1.expect(askSpy.getCall(0).args[0]).to.equal(`Higher!`);
    });
    mocha_1.it('says lower', () => {
        const askSpy = sinon_1.spy();
        const args = {
            ask: askSpy,
            data: {
                chosenNumber: 3
            },
            getContext: () => { return { parameters: { number: [5] } }; }
        };
        index_1.guess(args);
        chai_1.expect(askSpy.getCall(0).args[0]).to.equal(`Lower!`);
    });
    mocha_1.it('ends on a correct guess', () => {
        const askSpy = sinon_1.spy();
        const args = {
            ask: askSpy,
            data: {
                chosenNumber: 3
            },
            getContext: () => { return { parameters: { number: [3] } }; },
            setContext: () => { }
        };
        index_1.guess(args);
        chai_1.expect(askSpy.getCall(0).args[0]).to.equal(`You got it!  Do you want to play again?`);
    });
    mocha_1.it('resets game context on end', () => {
        const contextSpy = sinon_1.spy();
        const args = {
            ask: () => { },
            data: {
                chosenNumber: 3
            },
            getContext: () => { return { parameters: { number: [3] } }; },
            setContext: contextSpy
        };
        index_1.guess(args);
        chai_1.expect(contextSpy.calledWithExactly('game', 0)).to.be.true;
    });
    mocha_1.it('resets game-followup context on end', () => {
        const contextSpy = sinon_1.spy();
        const args = {
            ask: () => { },
            data: {
                chosenNumber: 3
            },
            getContext: () => { return { parameters: { number: [3] } }; },
            setContext: contextSpy
        };
        index_1.guess(args);
        chai_1.expect(contextSpy.calledWithExactly('Game-followup', 0)).to.be.true;
    });
    mocha_1.it('resets greeting context on end', () => {
        const contextSpy = sinon_1.spy();
        const args = {
            ask: () => { },
            data: {
                chosenNumber: 3
            },
            getContext: () => { return { parameters: { number: [3] } }; },
            setContext: contextSpy
        };
        index_1.guess(args);
        chai_1.expect(contextSpy.calledWithExactly('greeting', 5)).to.be.true;
    });
});
//# sourceMappingURL=index.test.js.map