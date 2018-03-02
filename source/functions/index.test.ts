import { welcome, begin, guess } from './index';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { spy } from 'sinon';

describe('welcome', () => {
    it('greets a user', () => {
        const askSpy = spy();
        const args = {
            ask: askSpy
        };
        welcome(args);
        expect(askSpy.getCall(0).args[0]).to.equal(`Greetings!  Would you like to play higher or lower?`);
    });
});

describe('begin', () => {
    it('begins the game', () => {
        const askSpy = spy();
        const args = {
            ask: askSpy,
            data: {}
        };
        begin(args);
        expect(askSpy.getCall(0).args[0]).to.equal(`I'm thinking of a number between zero and five, have a guess.`);
    });
    it('sets a chosen number', () => {
        const args = {
            ask: () => { },
            data: {
                chosenNumber: -1
            }
        };
        begin(args);
        expect(args.data.chosenNumber).to.not.equal(-1);
    });
});

describe('guess', () => {
    it('says higher', () => {
        const askSpy = spy();
        const args = {
            ask: askSpy,
            data: {
                chosenNumber: 3
            },
            getContext: () => { return { parameters: { number: [1] } }; }
        };
        guess(args);
        expect(askSpy.getCall(0).args[0]).to.equal(`Higher!`);
    });
    it('says lower', () => {
        const askSpy = spy();
        const args = {
            ask: askSpy,
            data: {
                chosenNumber: 3
            },
            getContext: () => { return { parameters: { number: [5] } }; }
        };
        guess(args);
        expect(askSpy.getCall(0).args[0]).to.equal(`Lower!`);
    });
    it('ends on a correct guess', () => {
        const askSpy = spy();
        const args = {
            ask: askSpy,
            data: {
                chosenNumber: 3
            },
            getContext: () => { return { parameters: { number: [3] } }; },
            setContext: () => { }
        };
        guess(args);
        expect(askSpy.getCall(0).args[0]).to.equal(`You got it!  Do you want to play again?`);
    });
    it('resets game context on end', () => {
        const contextSpy = spy();
        const args = {
            ask: () => { },
            data: {
                chosenNumber: 3
            },
            getContext: () => { return { parameters: { number: [3] } }; },
            setContext: contextSpy
        };
        guess(args);
        expect(contextSpy.calledWithExactly('game', 0)).to.be.true;
    });
    it('resets game-followup context on end', () => {
        const contextSpy = spy();
        const args = {
            ask: () => { },
            data: {
                chosenNumber: 3
            },
            getContext: () => { return { parameters: { number: [3] } }; },
            setContext: contextSpy
        };
        guess(args);
        expect(contextSpy.calledWithExactly('Game-followup', 0)).to.be.true;
    });
    it('resets greeting context on end', () => {
        const contextSpy = spy();
        const args = {
            ask: () => { },
            data: {
                chosenNumber: 3
            },
            getContext: () => { return { parameters: { number: [3] } }; },
            setContext: contextSpy
        };
        guess(args);
        expect(contextSpy.calledWithExactly('greeting', 5)).to.be.true;
    });
});