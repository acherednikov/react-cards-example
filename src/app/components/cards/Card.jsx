// React Core
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Libs
import Button from 'react-bootstrap/Button';
import { Card as CardBootstrap } from 'react-bootstrap';
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
            <div className="card-wrapper">
                <CardBootstrap.Body className="card-content">
                    <div className="card-title">
                        <h5>
                            {title}
                        </h5>
                    </div>
                    <p className="card-text">
                        {text}
                    </p>
                    <div className="card-controls-wrapper">
                        {
                            !isDeleted &&
                            <Button
                                variant="danger"
                                style={{ marginRight: 5 }}
                                disabled={isProcessing}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        }
                        {
                            isDeleted &&
                            <Button
                                variant="warning"
                                style={{ marginRight: 5 }}
                                disabled={isProcessing}
                                onClick={restoreRequested}
                            >
                                Restore
                            </Button>
                        }
                        <Button
                            variant={isBookmarked ? 'success' : 'primary'}
                            disabled={isProcessing}
                            onClick={handleBookmark}
                        >
                            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                        </Button>
                    </div>
                </CardBootstrap.Body>
            </div>
        </>
    )

};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;