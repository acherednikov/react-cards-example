// React Core
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    cardTitleBookmark as cardTitleBookmarkAction,
    cardDeleteRequested as cardDeleteAction,
    cardRestoreRequested as cardRestoreAction,
} from '../../redux/actions/cards';
// Selectors
import {
    isCardBookmarked as isCardBookmarkedSelector,
} from '../../selectors/card';
// Libs
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

    // const isProcessing = useSelector(state => isCardProcessingSelector(state, id));
    const isBookmarked = useSelector(state => isCardBookmarkedSelector(state, title));
    // const isDeleted = useSelector(state => isCardDeletedSelector(state, id));
    // const errors = useSelector(state => cardActionErrorsSelector(state, id));

    // useEffect(() => {
    //     if (!isEmpty(errors)) {
    //         errors.forEach((error) => {
    //             toast(error.error.message, {
    //                 onOpen: () => dispatch(purgeCardErrorAction(id)),
    //             })
    //         })
    //     }
    // }, [errors, dispatch]);

    const handleBookmark = () => {
        dispatch(cardTitleBookmarkAction(title))
        // dispatch(cardBookmarkAction(id))
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
            // isProcessing={isProcessing}
            isBookmarked={isBookmarked}
            // isDeleted={isDeleted}
            handleBookmark={handleBookmark}
            handleDelete={handleDelete}
            handleRestore={handleRestore}
        />
    )
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default CardContainer;