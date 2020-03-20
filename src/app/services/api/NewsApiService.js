// Libs
import axios from "axios";

const API_KEY = ''; // env var

function fetchFeedTop(queryOptions = {
    category: 'sports',
    country: 'ru',
}) {
    return axios.get('http://newsapi.org/v2//top-headlines', {
        params: queryOptions,
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