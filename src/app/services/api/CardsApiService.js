// Libs
import axios from "../../__mock__/axios";

function fetchCards() {
    return axios.get('/cards')
    .then(cardsResponse => {
        return cardsResponse
    })
    .catch(error => {
        throw error
    })
}

export default {
    fetchCards,
}