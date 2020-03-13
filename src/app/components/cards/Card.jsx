// React Core
import React from 'react';
import PropTypes from 'prop-types';
// Libs
import Button from 'react-bootstrap/Button';
import { Card as CardBootstrap } from 'react-bootstrap';
// Components

import 'bootstrap/dist/css/bootstrap.min.css';

const propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isProcessing: PropTypes.bool,
    isBookmarked: PropTypes.bool,
    isDeleted: PropTypes.bool,
    handleBookmark: PropTypes.func,
    handleDelete: PropTypes.func,
};
const defaultProps = {
    isProcessing: false,
    isBookmarked: false,
    isDeleted: false,
    handleBookmark: () => {},
    handleDelete: () => {},
};

const Card = ({
                  title,
                  text,
                  isProcessing,
                  isBookmarked,
                  isDeleted,
                  handleBookmark,
                  handleDelete,
              }) => {

    return (
        <CardBootstrap className="card-wrapper">
            <CardBootstrap.Body>
                <CardBootstrap.Title>{title}</CardBootstrap.Title>
                {/*<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>*/}
                <CardBootstrap.Text
                    className="card-text"
                >
                    {text}
                </CardBootstrap.Text>
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
                <Button
                    variant={isBookmarked ? 'success' : 'primary'}
                    disabled={isProcessing}
                    onClick={handleBookmark}
                >
                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
            </CardBootstrap.Body>
        </CardBootstrap>
    )

};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;