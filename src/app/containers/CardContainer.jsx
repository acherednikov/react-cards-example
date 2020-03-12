// React Core
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    cardBookmarkRequested as cardBookmarkAction,
} from '../redux/actions/cards';
// Selectors
import { isCardBookmarkedSelector } from '../selectors/card';
// Components
import Card from '../components/Card';

const propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
const defaultProps = {};

const CardContainer = ({
                  id,
                  title,
                  text,
              }) => {
    const dispatch = useDispatch();

    const isBookmarked = useSelector(state => isCardBookmarkedSelector(state, id));
    const isBookmarking = useSelector(state => state.cards.bookmarkingOnCard === id);

    const handleBookmark = () => {
        dispatch(cardBookmarkAction(id))
    };

    return (
        <Card
            id={id}
            title={title}
            text={text}
            isBookmarked={isBookmarked}
            isBookmarking={isBookmarking}
            handleBookmark={handleBookmark}
        />
    )
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default CardContainer;