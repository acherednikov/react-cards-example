// ENDPOTINS
export const ENDPOINT_FEED_FEATURED = 'http://newsapi.org/v2/top-headlines';
export const ENDPOINT_FEED_EVERYTHING = 'http://newsapi.org/v2/everything';

// CONTENT
export const COUNTRIES = [
    { value: 'ru', label: 'Россия' },
    { value: 'us', label: 'Unisted States' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Deutschland' },
    { value: 'it', label: 'Italia' },
    { value: 'se', label: 'Sverige' },
    { value: 'jp', label: 'Nippon 日本' },
    { value: 'es', label: 'España' },
]

// export const LANGUAGES_COUNTRIES = {
//     ru: ['ru'] ,
//     en: ['us', 'gb'],
//     pt: ['pt', 'br'],
//     fr: ['fr'],
//     de: ['de'],
//     it: ['it'],
//     ja: ['jp'],
//     es: ['es'],
//     sv: ['se'],
// }

export const TOPICS = [
    { name: 'general', icon: 'world' },
    { name: 'health', icon: 'heart' },
    { name: 'science', icon: 'database' },
    { name: 'technology', icon: 'print' },
    { name: 'entertainment', icon: 'happy' },
    { name: 'business', icon: 'info' },
    { name: 'sports', icon: 'play-circle' },
]

export const SORT = [
    { name: 'relevancy', icon: null },
    { name: 'popularity', icon: null },
    { name: 'publishedAt', icon: null },
]
