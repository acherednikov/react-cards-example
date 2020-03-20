// Libs
import axios from "axios";


function fetchFeedTop(queryOptions = {}) {
    const defaultPayload = {
        category: 'general',
        country: 'ru',
    };

    return axios.get('http://newsapi.org/v2/top-headlines', {
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
}