import { Die } from './Die';

export type TokenId = number;
export type GameState = {
	gameOver: boolean;
	tokenPositions: Record<TokenId, number>;
	winningToken?: TokenId;
};
export type Turn = {
	numSpacesToMove: number;
	tokenId: TokenId;
};

export class SnakesAndLaddersGame {
	public tokenPositions: Record<TokenId, number> = {};

	constructor() {}

	public doTurn(turn: Turn): GameState {
		return this.getGameState();
	}

	public addToken(): number {
		return 0;
	}

	public getGameState(): GameState {
		return {
			gameOver: false,
			tokenPositions: this.tokenPositions,
		};
	}

	public getDie(): Die {
		return new Die(0);
	}
}
