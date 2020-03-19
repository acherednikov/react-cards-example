// React Core
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Libs
// Components
import ModalConfirm from '../ModalConfirm';


const propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isProcessing: PropTypes.bool,
    isBookmarked: PropTypes.bool,
    isDeleted: PropTypes.bool,
    handleBookmark: PropTypes.func,
    handleDelete: PropTypes.func,
    handleRestore: PropTypes.func,
};
const defaultProps = {
    isProcessing: false,
    isBookmarked: false,
    isDeleted: false,
    handleBookmark: () => {},
    handleDelete: () => {},
    handleRestore: () => {},
};

const Card = ({
                  title,
                  text,
                  isProcessing,
                  isBookmarked,
                  isDeleted,
                  handleBookmark,
                  handleDelete,
                  handleRestore,
              }) => {

    const [showRestoreModal, toggleRestoreModal] = useState(false);

    const restoreRequested = () => {
        toggleRestoreModal(true)
    };

    const restoreConfirmed = () => {
        handleRestore();
        toggleRestoreModal(false)
    };

    const restoreCanceled = () => {
        toggleRestoreModal(false)
    };

    return (
        <>
            <ModalConfirm
                title="Card Restore"
                message="Are you want to restore this card?"
                show={showRestoreModal}
                onConfirm={restoreConfirmed}
                onClose={restoreCanceled}
            />
            <div className="uk-card uk-card-default uk-margin-small-bottom uk-width-1-1">
                <div className="uk-card-header">
                    <div className="uk-grid-small uk-flex-middle uk-grid" uk-grid="">
                        <div className="uk-width-auto uk-first-column">
                            {/*<img className="uk-border-circle" width="40" height="40" src="images/avatar.jpg"/>*/}
                        </div>
                        <div className="uk-width-expand">
                            <h3 className="uk-card-title uk-margin-remove-bottom flex-grow-1">{title}</h3>
                            {/*<p className="uk-text-meta uk-margin-remove-top">*/}
                            {/*    <time dateTime="2016-04-01T19:00">April 01, 2016</time>*/}
                            {/*</p>*/}
                        </div>
                        <a onClick={handleBookmark}>
                            <span uk-icon="heart"/>
                        </a>
                    </div>
                </div>
                <div className="uk-card-body">
                    <p>{text}</p>
                </div>
                <div className="uk-card-footer">
                    {
                        !isDeleted &&
                        <button
                            // variant="danger"
                            className="uk-button uk-button-danger"
                            style={{ marginRight: 5 }}
                            disabled={isProcessing}
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    }
                    {
                        isDeleted &&
                        <button
                            // variant="warning"
                            className="uk-button uk-button-secondary"
                            style={{ marginRight: 5 }}
                            disabled={isProcessing}
                            onClick={restoreRequested}
                        >
                            Restore
                        </button>
                    }
                    {
                        !isDeleted &&
                        <button
                            // variant={isBookmarked ? 'success' : 'primary'}
                            className={isBookmarked ? 'uk-button uk-button-primary' : 'uk-button uk-button-default'}
                            disabled={isProcessing}
                            onClick={handleBookmark}
                        >
                            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                        </button>
                    }
                </div>
            </div>
        </>
    )

};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;