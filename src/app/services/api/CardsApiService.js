// Libs
import axios from "../../__mock__/axios";

function fetchCards() {
    return axios.get('/cards')
}

function bookmarkCard(cardId) {
    return axios.post('/cards')
}

export default {
    fetchCards,
    bookmarkCard,
}