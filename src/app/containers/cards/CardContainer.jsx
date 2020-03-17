// React Core
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    cardBookmarkRequested as cardBookmarkAction,
    cardDeleteRequested as cardDeleteAction,
    cardRestoreRequested as cardRestoreAction,
} from '../../redux/actions/cards';
// Selectors
import {
    isCardProcessing as isCardProcessingSelector,
    isCardBookmarked as isCardBookmarkedSelector,
    isCardDeleted as isCardDeletedSelector,
} from '../../selectors/card';
// Components
import Card from '../../components/cards/Card';

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

    const isProcessing = useSelector(state => isCardProcessingSelector(state, id));
    const isBookmarked = useSelector(state => isCardBookmarkedSelector(state, id));
    const isDeleted = useSelector(state => isCardDeletedSelector(state, id));

    const handleBookmark = () => {
        dispatch(cardBookmarkAction(id))
    };

    const handleDelete = () => {
        dispatch(cardDeleteAction(id))
    };

    const handleRestore = () => {
        dispatch(cardRestoreAction(id))
    };

    return (
        <Card
            id={id}
            title={title}
            text={text}
            isProcessing={isProcessing}
            isBookmarked={isBookmarked}
            isDeleted={isDeleted}
            handleBookmark={handleBookmark}
            handleDelete={handleDelete}
            handleRestore={handleRestore}
        />
    )
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default CardContainer;