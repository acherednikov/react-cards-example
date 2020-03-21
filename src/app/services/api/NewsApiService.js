// Libs
import axios from 'axios';
// Config
import {
    ENDPOINT_FEED_FEATURED,
    ENDPOINT_FEED_EVERYTHING,
} from '../../config/Constants';


function fetchFeedTop(queryOptions = {}) {
    const defaultPayload = {
        category: 'general',
        country: 'ru',
    };

    return axios.get(ENDPOINT_FEED_FEATURED, {
        params: { ...defaultPayload, ...queryOptions },
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.REACT_APP_NEWS_API_KEY,
        },
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
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.REACT_APP_NEWS_API_KEY,
        },
        responseType: 'json',
    })
}

export default {
    fetchFeedTop,
    fetchEverything,
}