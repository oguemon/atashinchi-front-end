import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class EpisodeNames extends EventEmitter {
    private episodes: EpisodeNameInfo[] = [];

    constructor() {
        super();
    }

    public getAll(): EpisodeNameInfo[] {
        return this.episodes;
    }

    public handleActions(action): void {
        switch (action.type) {
            case 'FETCH_ALL_EPISODE_NAMES':
                this.episodes = action.episodes;
                this.emit(action.type);
                break;
            default:
        }
    }
}

const episodenames = new EpisodeNames();

dispatcher.register(episodenames.handleActions.bind(episodenames));

export default episodenames;
