// React Core
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    cardBookmarkRequested as cardBookmarkAction,
    cardDeleteRequested as cardDeleteAction,
} from '../redux/actions/cards';
// Selectors
import {
    isCardBookmarked as isCardBookmarkedSelector,
    isCardProcessing as isCardProcessingSelector,
} from '../selectors/card';
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
    const isProcessing = useSelector(state => isCardProcessingSelector(state, id));

    const handleBookmark = () => {
        dispatch(cardBookmarkAction(id))
    };

    const handleDelete = () => {
        dispatch(cardDeleteAction(id))
    };

    return (
        <Card
            id={id}
            title={title}
            text={text}
            isBookmarked={isBookmarked}
            isProcessing={isProcessing}
            handleBookmark={handleBookmark}
            handleDelete={handleDelete}
        />
    )
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default CardContainer;