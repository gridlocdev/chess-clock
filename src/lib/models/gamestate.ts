export type GameStateType = 'active' | 'paused' | 'reset' | 'ended';

export class GameState {
	public type: GameStateType;

	constructor(state: GameStateType) {
		this.type = state;
	}

	set(state: GameStateType) {
		this.type = state;
	}

	get(): GameStateType {
		return this.type;
	}
}
