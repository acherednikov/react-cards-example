// React Core
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
// Libs
// import isEmpty from 'lodash/isEmpty';
// Components
import List from '../../components/List';
import SideMenuFeatured from '../menus/MenuFeatured';
import SideMenuAdvanced from '../menus/MenuAdvanced';
import CardContainer from '../../containers/cards/CardContainer';


const propTypes = {
    cardsData: PropTypes.array,
    fetchError: PropTypes.object,
    isLoading: PropTypes.bool,
    totalResults: PropTypes.number,
    fetchData: PropTypes.func,
};
const defaultProps = {
    cardsData: [],
    fetchError: null,
    isLoading: false,
    totalResults: null,
    fetchData: undefined,
};

const Cards = ({
                   cardsData,
                   fetchError,
                   isLoading,
                   totalResults,
                   fetchData,
               }) => {
    const scrollContainer = useRef(null);

    const handleInfiniteScroll = (page) => {
        fetchData(page)
    };

    const renderFilters = () => {
        const enabled = !isLoading;
        return (
            <>
                <SideMenuFeatured enabled={enabled}/>
                <SideMenuAdvanced enabled={enabled}/>
            </>
        )
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

    return (
        <Route exact path={["/", "/featured", "/search"]}>
            <div className="uk-flex uk-grid">
                <div className="uk-width-1-4@m uk-flex uk-flex-center" style={{ paddingTop: '40px' }}>
                </div>
                <div className="scroller uk-width-expand@m uk-flex uk-flex-wrap uk-flex-middle uk-flex-center" ref={scrollContainer}>
                    <List
                        scrollContainer={scrollContainer}
                        data={cardsData}
                        fetchError={fetchError}
                        isLoading={isLoading}
                        totalResults={totalResults}
                        headerRenderer={renderFilters}
                        cellRenderer={renderCard}
                        onPageEndReached={handleInfiniteScroll}
                    />
                </div>
                <div className="uk-width-1-4@m"></div>
            </div>
        </Route>
    )
};

Cards.propTypes = propTypes;
Cards.defaultProps = defaultProps;

export default Cards;