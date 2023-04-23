export class Die {
	constructor(public sides: number) {}

	/**
	 * Roll random number between 1 (inclusive) and number of sides (inclusive)
	 */
	public roll(): number {
		return Math.floor(Math.random() * this.sides) + 1;
	}
}
