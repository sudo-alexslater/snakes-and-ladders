import { DefineStepFunction, defineFeature, loadFeature } from 'jest-cucumber';
import { SnakesAndLaddersGame, TokenId } from '../../src/games/SnakesAndLaddersGame';

const feature = loadFeature('./tests/features/gameWin.feature');

defineFeature(feature, (test) => {
	let game: SnakesAndLaddersGame;
	let tokenId: TokenId;

	const givenGameStart = (given: DefineStepFunction) => {
		given('the game is started', () => {
			game = new SnakesAndLaddersGame();
			tokenId = game.addToken();
		});
	};
	const givenTokenLocation = (given: DefineStepFunction) => {
		given(/^the token is on square "(.*)"$/, (tokenPosition) => {
			game.tokenPositions[tokenId] = parseInt(tokenPosition);
		});
	};
	const whenTokenIsMovedTo = (when: DefineStepFunction) => {
		when(/^the token is moved "(.*)" spaces$/, (spaces) => {
			game.doTurn({
				numSpacesToMove: parseInt(spaces),
				tokenId,
			});
		});
	};
	const thenTokenShouldBeAt = (then: DefineStepFunction) => {
		then(/^the token should be on square "(.*)"$/, (square) => {
			const state = game.getGameState();
			expect(state.tokenPositions[tokenId]).toBe(parseInt(square));
		});
	};
	const thenPlayerShouldHaveWon = (then: DefineStepFunction) => {
		then(/^the player should have won the game$/, () => {
			const state = game.getGameState();
			expect(state.gameOver).toBe(true);
		});
	};
	const thenPlayerShouldNotHaveWon = (then: DefineStepFunction) => {
		then(/^the player should not have won the game$/, () => {
			const state = game.getGameState();
			expect(state.gameOver).toBe(false);
		});
	};

	test('Token is moved to winning square', ({ given, when, then, and }) => {
		givenGameStart(when);

		givenTokenLocation(given);

		whenTokenIsMovedTo(when);

		thenTokenShouldBeAt(then);

		thenPlayerShouldHaveWon(and);
	});

	test('Token is not moved to a winning square', ({ given, when, then, and }) => {
		givenGameStart(when);

		givenTokenLocation(given);

		whenTokenIsMovedTo(when);

		thenTokenShouldBeAt(then);

		thenPlayerShouldNotHaveWon(and);
	});
});
