// React Core
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Route
} from "react-router-dom";
// Libs
import isEmpty from 'lodash/isEmpty';
// Components
import List from '../../components/List';
import Subscriptions from '../../components/subscriptions/Subscriptions';
import CardContainer from '../../containers/cards/CardContainer';


const propTypes = {
    cardsData: PropTypes.array,
    isLoading: PropTypes.bool,
    fetchData: PropTypes.func,
};
const defaultProps = {
    cardsData: [],
    isLoading: false,
    fetchData: () => {},
};

const Cards = ({
                   cardsData,
                   isLoading,
                   fetchData,
               }) => {

    // const scrollContainer = useRef(null).current;
    const scrollContainer = useRef(null);

    const handleInfiniteScroll = (page) => {
        fetchData(page)
    };

    const renderCard = ({ title, description, author, source, publishedAt, url, urlToImage, }) => {
        return (
            <CardContainer
                key={title}
                description={description}
                title={title}
                author={author}
                source={source}
                publishedAt={publishedAt}
                url={url}
                urlToImage={urlToImage}
            />
        )
    };

    return (
        <Route exact path={["/", "/cards"]}>
            <div
                className="bg"
                ref={scrollContainer}
            >
                <div className="uk-grid">
                    <div className="uk-width-1-4@m">
                        <Subscriptions />
                    </div>
                    <div className="uk-width-expand@m">
                        <div className="cards-container uk-flex uk-flex-wrap uk-flex-middle uk-flex-center">
                        <List
                            scrollContainer={scrollContainer}
                            data={cardsData}
                            isLoading={isLoading}
                            cellRenderer={renderCard}
                            onPageEndReached={handleInfiniteScroll}
                        />
                        {
                            (isEmpty(cardsData) && !isLoading) &&
                            <p className="uk-flex uk-text-lead">
                                <span>No cards were found 😔 ...</span>
                            </p>
                        }
                        </div>
                    </div>
                    <div className="uk-width-1-4@m"></div>
                </div>
            </div>
        </Route>
    )
};

Cards.propTypes = propTypes;
Cards.defaultProps = defaultProps;

export default Cards;