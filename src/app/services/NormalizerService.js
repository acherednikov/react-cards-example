import { normalize, schema } from 'normalizr';

function normalizeCards(cardsData) {
    const cards = { cards: cardsData };
    const card = new schema.Entity('cards');
    return normalize(cards, { cards: [card] }).entities.cards
}

export default {
    normalizeCards,
};
