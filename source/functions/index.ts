export const welcome = (app: any): void => {
    const message = `Greetings!  Would you like to play higher or lower?`;
    app.ask(message);
};

export const begin = (app: any): void => {
    const maxNumber = 5;
    const chosenNumber = Math.floor(Math.random() * maxNumber);
    app.data.chosenNumber = chosenNumber;
    const message = `I'm thinking of a number between zero and five, have a guess.`;
    app.ask(message);
};

export const guess = (app: any): void => {
    const guess = app.getContext('game').parameters['number'][0];
    const answer = app.data.chosenNumber;
    if (guess === answer) {
        // End the game and reset the context to the greeting
        const message = `You got it!  Do you want to play again?`;
        app.setContext('game', 0);
        app.setContext('Game-followup', 0);
        app.setContext('greeting', 5);
        app.ask(message);
    } else {
        const message = (Number(guess) > answer) ? `Lower!` : `Higher!`;
        app.ask(message);
    }
};