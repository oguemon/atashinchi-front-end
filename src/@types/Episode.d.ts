type EpisodeInfo = {
    series: number,
    id: number,
    title: string,
    onair_date: string, // 日付形式が求められる
    onair_no: string,
    outline: string,
    video: VideoInfo,
    comic: ComicInfo[],
    detail?: {
        notes: string,
        amzn_no: number,
        youtube_id: string,
        characters: string[],
        related_episode: RelatedEpisode[],
    }
};

type ComicInfo = {
    issue: number,
    no: number,
    date: string, // 日付形式が求められる
};

type RelatedEpisode = {
    series: number,
    id: number,
    name: string,
    outline: string,
    note: string,
};

type VideoInfo = {
    collection: number,
    volume: number,
};

type EpisodeNameInfo = {
    series: number,
    id: number,
    title: string,
};
