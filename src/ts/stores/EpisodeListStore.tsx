import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class EpisodeList extends EventEmitter {
    private episodes: EpisodeInfo[] = [];

    constructor() {
        super();
    }

    public getOne(): EpisodeInfo | null {
        if (this.episodes.length === 0) {
            return null;
        } else {
            return this.episodes[0];
        }
    }

    public getAll(): EpisodeInfo[] {
        return this.episodes;
    }

    public handleActions(action): void {
        switch (action.type) {
            case 'SEARCH_EPISODES':
            case 'SEARCH_EPISODES_NEXT':
            case 'FETCH_ALL_EPISODES':
                this.episodes = action.episodes;
                this.emit(action.type);
                break;
            default:
        }
    }
}

const episodelist = new EpisodeList();

dispatcher.register(episodelist.handleActions.bind(episodelist));

export default episodelist;
