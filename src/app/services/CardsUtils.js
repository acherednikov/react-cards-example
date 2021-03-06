import { concat, filter, includes, pull, xor } from 'lodash';
import NormalizerService from './NormalizerService';


function collectionNormalized(cards) {
    return NormalizerService.normalizeCards(cards)
}

function collectionFilteredByIds(cards, cardIds, reverse = false) {
    return filter(cards, (card) => {
        return reverse ? !includes(cardIds, card.id) : includes(cardIds, card.id)
    })
}

function idConcat(cardIds, cardId) {
    return concat(cardIds, cardId)
}

function idToggle(cardIds, cardId) {
    return xor(cardIds, [cardId])
}

function idRemove(cardIds, cardId) {
    return pull(cardIds, cardId)
}

export default {
    collectionNormalized,
    collectionFilteredByIds,
    idConcat,
    idToggle,
    idRemove,
}