// React Core
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    cardBookmarkRequested as cardBookmarkAction,
    cardDeleteRequested as cardDeleteAction,
    cardRestoreRequested as cardRestoreAction,
    purgeCardError as purgeCardErrorAction,
} from '../../redux/actions/cards';
// Selectors
import {
    isCardProcessing as isCardProcessingSelector,
    isCardBookmarked as isCardBookmarkedSelector,
    isCardDeleted as isCardDeletedSelector,
    cardActionErrors as cardActionErrorsSelector,
} from '../../selectors/card';
// Libs
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
// Components
import Card from '../../components/cards/Card';

const propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string,

};
const defaultProps = {
    url: null,
};

const CardContainer = ({
                  id,
                  title,
                  description,
                  author,
                  source,
                  publishedAt,
                  url,
                  urlToImage,
              }) => {
    const dispatch = useDispatch();

    const isProcessing = useSelector(state => isCardProcessingSelector(state, id));
    const isBookmarked = useSelector(state => isCardBookmarkedSelector(state, id));
    const isDeleted = useSelector(state => isCardDeletedSelector(state, id));
    const errors = useSelector(state => cardActionErrorsSelector(state, id));

    useEffect(() => {
        if (!isEmpty(errors)) {
            errors.forEach((error) => {
                toast(error.error.message, {
                    onOpen: () => dispatch(purgeCardErrorAction(id)),
                })
            })
        }
    }, [errors, dispatch]);

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
            description={description}
            author={author}
            source={source}
            publishedAt={publishedAt}
            url={url}
            urlToImage={urlToImage}
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