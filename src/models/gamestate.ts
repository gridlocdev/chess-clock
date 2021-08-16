export default class GameState {
    public type: "active" | "paused" | "reset" | "ended";

    constructor(state: GameState["type"]) {
        this.type = state
    }
    
    set(state: GameState["type"]) {
        this.type = state
    }

    get(): string {
        return this.type
    }
}