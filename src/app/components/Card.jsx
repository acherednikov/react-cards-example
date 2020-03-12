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
    isBookmarked: PropTypes.bool,
    handleBookmark: PropTypes.func,
};
const defaultProps = {
    isBookmarked: false,
    handleBookmark: () => {},
};

const Card = ({
                  title,
                  text,
                  isBookmarked,
                  handleBookmark,
              }) => {

    return (
        <CardBootstrap className="card-wrapper">
            <CardBootstrap.Body>
                <CardBootstrap.Title>{title}</CardBootstrap.Title>
                {/*<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>*/}
                <CardBootstrap.Text>
                    {text}
                </CardBootstrap.Text>

                <Button
                    variant="danger"
                >
                    Delete
                </Button>

                <Button
                    variant={isBookmarked ? 'success' : 'primary'}
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