export type ReviewType = {
    'id': number;
    'user': {
    'id': number;
    'isPro': boolean;
    'name': string;
    'avatarUrl': string;
    };
    'rating': number;
    'comment': string;
    'date': string;
};
