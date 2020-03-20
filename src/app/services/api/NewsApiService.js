// Libs
import axios from "axios";

const API_KEY = '427374fba2eb4ec7a7a913fde6721cf1'; // env var

function fetchFeedTop(queryOptions = {}) {
    const defaultPayload = {
        category: 'sports',
        country: 'ru',
    };

    return axios.get('http://newsapi.org/v2//top-headlines', {
        params: { ...defaultPayload, ...queryOptions },
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': API_KEY,
        },
        responseType: 'json',
    })
}

export default {
    fetchFeedTop,
}