import { DefineStepFunction, defineFeature, loadFeature } from 'jest-cucumber';
import { SnakesAndLaddersGame, TokenId } from '../../src/games/SnakesAndLaddersGame';

const feature = loadFeature('./tests/features/moveToken.feature');

defineFeature(feature, (test) => {
	let game: SnakesAndLaddersGame;
	let tokenId: TokenId;

	// reusable code
	const givenGameStart = (given: DefineStepFunction) => {
		given('the game is started', () => {
			game = new SnakesAndLaddersGame();
			tokenId = game.addToken();
		});
	};
	const whenTokenIsMovedTo = (when: DefineStepFunction) => {
		when(/^the token is moved "(.*)" spaces$/, (spaces) => {
			game.doTurn({
				numSpacesToMove: parseInt(spaces),
				tokenId: tokenId,
			});
		});
	};
	const thenTokenShouldBeAt = (when: DefineStepFunction) => {
		when(/^the token should be on square "(.*)"$/, (square) => {
			const state = game.getGameState();
			expect(state.tokenPositions[tokenId]).toBe(parseInt(square));
		});
	};

	test('Token is placed on game start', ({ given, when, then }) => {
		givenGameStart(given);
		when('the token is placed on the board', () => {});
		thenTokenShouldBeAt(then);
	});

	test('Token is moved once', ({ given, when, then }) => {
		givenGameStart(given);
		whenTokenIsMovedTo(when);
		thenTokenShouldBeAt(then);
	});

	test('Token is moved twice', ({ given, when, and, then }) => {
		givenGameStart(given);
		whenTokenIsMovedTo(when);
		whenTokenIsMovedTo(and);
		thenTokenShouldBeAt(then);
	});
});
