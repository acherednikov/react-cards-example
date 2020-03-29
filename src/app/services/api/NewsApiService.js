// Libs
import axios from 'axios';
// Config
import {
    ENDPOINT_FEED_FEATURED,
    ENDPOINT_FEED_EVERYTHING,
} from '../../config/Endpoints';


const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Api-Key': process.env.REACT_APP_NEWS_API_KEY,
}

function fetchFeedTop(queryOptions = {}) {
    const defaultPayload = {
        category: 'general',
        country: 'ru',
    };

    return axios.get(ENDPOINT_FEED_FEATURED, {
        params: { ...defaultPayload, ...queryOptions },
        headers: defaultHeaders,
        responseType: 'json',
    })
}

function fetchEverything(queryOptions = {}) {
    const defaultPayload = {
        q: '',
        language: 'ru',
    };

    return axios.get(ENDPOINT_FEED_EVERYTHING, {
        params: { ...defaultPayload, ...queryOptions },
        headers: defaultHeaders,
        responseType: 'json',
    })
}

export default {
    fetchFeedTop,
    fetchEverything,
}