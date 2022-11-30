// Dispatchのtypeのリストを定義する
const dispatch_type_names = [
    'SEARCH_EPISODES',
    'SEARCH_EPISODES_NEXT',
    'FETCH_ALL_EPISODES',
    'FETCH_ALL_EPISODE_NAMES',
] as const;

export type DispatchTypeNames = typeof dispatch_type_names[number];
