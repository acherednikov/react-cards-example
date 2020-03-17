// Libs
import axios from "../../__mock__/axios";

function fetchCards(queryOptions) {
    return axios.get('/cards', queryOptions)
}

function bookmarkCard(cardId) {
    return axios.post(`cards/${cardId}`)
}

function deleteCard(cardId) {
    return axios.delete(`cards/${cardId}`)
}

function restoreCard(cardId) {
    return axios.patch(`cards/${cardId}`)
}

export default {
    fetchCards,
    bookmarkCard,
    deleteCard,
    restoreCard,
}