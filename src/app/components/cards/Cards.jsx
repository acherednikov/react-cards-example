// React Core
import React from 'react';
import PropTypes from 'prop-types';
// Libs
import isEmpty from 'lodash/isEmpty';
// Components
// import List from '../../components/List';
import CardContainer from '../../containers/cards/CardContainer';

const propTypes = {
    cardsData: PropTypes.array,
    isLoading: PropTypes.bool,
    fetchData: PropTypes.func,
};
const defaultProps = {
    cardsData: [],
    isLoading: true,
    fetchData: () => {},
};

const Cards = ({
                   cardsData,
                   isLoading,
                   fetchData,
               }) => {

    const handleInfiniteScroll = (page) => {
        fetchData({ page })
    }

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

    const cardsRenderer = cardsData.map(renderCard);

    return (
        <div
            className="bg "
        >
            <div class="uk-grid" uk-grid>
                <div class="uk-width-1-4@m">
                    <div className="filters-container uk-margin-left uk-grid-small uk-child-width-auto uk-grid">
                        <label><input className="uk-checkbox" type="checkbox" checked/> US</label>
                        <label><input className="uk-checkbox" type="checkbox"/> Russia</label>
                    </div>
                </div>
                <div class="uk-width-expand@m">
                    <div className="cards-container uk-flex uk-flex-wrap uk-flex-middle uk-flex-center">
                    {
                        !isLoading &&
                        <div>
                            {cardsRenderer}
                        </div>
                    }
                    {/* <List
                        data={cardsData}
                        isLoading={isLoading}
                        onPageEndReached={fetchData}
                    >
                        {cardsRenderer}
                    </List> */}
                    {
                        isLoading &&
                        <div className="uk-flex" uk-spinner="ratio: 2"/>
                    }
                    {
                        (isEmpty(cardsRenderer) && !isLoading) &&
                        <p className="uk-flex uk-text-lead">No cards were found 😔 ...</p>
                    }
                    </div>
                </div>
                <div class="uk-width-1-4@m"></div>
            </div>
        </div>
    )
};

Cards.propTypes = propTypes;
Cards.defaultProps = defaultProps;

export default Cards;