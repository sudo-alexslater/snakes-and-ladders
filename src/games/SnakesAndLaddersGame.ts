import { Die } from '../elements/Die';

export type TokenId = string;
export type GameState = {
	// Whether the game is completed. Presently, game over is only possible when a player wins
	gameOver: boolean;
	// Positions of all the tokens at this point in the game
	tokenPositions: Record<TokenId, number>;
	// If defined, is equal to the token that has won
	winningToken?: TokenId;
};
export type Turn = {
	// How many spaces to move the token this turn
	numSpacesToMove: number;
	// Which token to move this turn
	tokenId: TokenId;
};

export class SnakesAndLaddersGame {
	public tokenPositions: Record<TokenId, number> = {};

	constructor() {}

	/**
	 * @param turn - Defines the state of the turn you wish to make
	 * @returns - the state of the game after the turn is executed
	 */
	public doTurn({ numSpacesToMove, tokenId }: Turn): GameState {
		const newTokenPosition = this.tokenPositions[tokenId] + numSpacesToMove;
		if (this.isValidPosition(newTokenPosition)) {
			this.tokenPositions[tokenId] = newTokenPosition;
		}
		return this.getGameState();
	}

	/**
	 * Add a token into the game
	 * @returns the id of the token that has been added
	 */
	public addToken(): TokenId {
		const countOfTokens = Object.values(this.tokenPositions).length;
		const newTokenId = `Token ${countOfTokens + 1}`;
		this.tokenPositions[newTokenId] = 1;
		return newTokenId;
	}

	/**
	 * @returns the current state of the game
	 */
	public getGameState(): GameState {
		const winningToken = this.getWinningToken();
		// if there is a winning token, this game is complete
		let gameOver = !!winningToken;

		return {
			gameOver,
			tokenPositions: this.tokenPositions,
			winningToken,
		};
	}

	/**
	 * @returns the winning token at the games current state, or undefined if there is none
	 */
	public getWinningToken(): TokenId | undefined {
		const winner = Object.keys(this.tokenPositions).find((id) => this.tokenPositions[id] === 100);
		return winner;
	}

	/**
	 * @returns boolean indicating whether the position being queried is valid
	 */
	public isValidPosition(position: number): boolean {
		return position >= 1 && position <= 100;
	}

	/**
	 * @returns a die configured for this game
	 */
	public getGameDie(): Die {
		return new Die(6);
	}
}
