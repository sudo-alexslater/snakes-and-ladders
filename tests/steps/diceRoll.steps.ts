import { DefineStepFunction, defineFeature, loadFeature } from 'jest-cucumber';
import { Die } from '../../src/elements/Die';
import { SnakesAndLaddersGame, TokenId } from '../../src/games/SnakesAndLaddersGame';

const feature = loadFeature('./tests/features/diceRoll.feature');

defineFeature(feature, (test) => {
	let game: SnakesAndLaddersGame;
	let die: Die;
	let tokenId: TokenId;
	let initialTokenPosition: number;
	let diceRoll: number;

	// reusable code
	const givenGameStart = (given: DefineStepFunction) => {
		given('the game is started', () => {
			game = new SnakesAndLaddersGame();
			tokenId = game.addToken();
			die = game.getGameDie();

			const state = game.getGameState();
			initialTokenPosition = state.tokenPositions[tokenId];
		});
	};
	const whenPlayerRolls = (when: DefineStepFunction) => {
		when(/^the player rolls a "(.*)"$/, (roll) => {
			if (roll === 'die') {
				diceRoll = die.roll();
			} else {
				diceRoll = parseInt(roll);
			}
		});
	};
	const whenTokenMoved = (when: DefineStepFunction) => {
		when(/^the player moves their token$/, () => {
			game.doTurn({
				numSpacesToMove: diceRoll,
				tokenId,
			});
		});
	};
	const thenTokenShouldMove = (when: DefineStepFunction) => {
		when(/^the token should move "(.*)" spaces$/, (spaces) => {
			const expectedPosition = initialTokenPosition + parseInt(spaces);
			const state = game.getGameState();
			expect(state.tokenPositions[tokenId]).toBe(expectedPosition);
		});
	};
	const thenDiceRollShouldBe = (when: DefineStepFunction) => {
		when(/^the dice roll should be between "(.*)" and "(.*)" inclusive$/, (min, max) => {
			expect(diceRoll).toBeGreaterThanOrEqual(parseInt(min));
			expect(diceRoll).toBeLessThanOrEqual(parseInt(max));
		});
	};

	test('Dice is rolled', ({ given, when, then }) => {
		givenGameStart(given);
		whenPlayerRolls(when);
		thenDiceRollShouldBe(then);
	});

	test('Dice roll decides the movement of the token', ({ given, when, and, then }) => {
		givenGameStart(given);
		whenPlayerRolls(when);
		whenTokenMoved(and);
		thenTokenShouldMove(then);
	});
});
