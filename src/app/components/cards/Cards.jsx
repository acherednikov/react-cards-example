// React Core
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  useHistory,
} from 'react-router-dom';
// Libs
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
// Components
// import NavigationBar from '../../components/navigation/NavigationBar';
import List from '../../components/List';
import RadioGroup from '../filters/RadioGroup';
import CardContainer from '../../containers/cards/CardContainer';
// Hooks
import useQueryParam from '../../hooks/useQueryParam';
// Services
import NavigationService from '../../services/NavigationService';
// Config
import {
    TOPICS,
    SORT,
} from '../../config/Constants';


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
    fetchData: () => {},
};

const Cards = ({
                cardsData,
                fetchError,
                isLoading,
                totalResults,
                fetchData,
               }) => {
    const history = useHistory();
    const topic = useQueryParam('topic', 'general');
    const sort = useQueryParam('sort', 'publishedAt');
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
        <Route exact path={["/", "/featured", "/search"]}>
            <div
                className="bg"
                ref={scrollContainer}
            >
                <div className="uk-grid">
                    <div className="uk-width-1-4@m uk-flex uk-flex-center">
                        <Route exact path={["/", "/featured"]}>
                            <RadioGroup
                                filtersName="Topics"
                                filtersData={TOPICS}
                                activeRadio={topic}
                                enabled={!isEmpty(cardsData)}
                                handleChange={(name) => NavigationService.navigate(history, 'featured', {topic: name})}
                            />
                         </Route>
                         <Route exact path="/search">
                            <RadioGroup
                                filtersName="Sort"
                                filtersData={SORT}
                                activeRadio={sort}
                                enabled={!isEmpty(cardsData)}
                                handleChange={(name) => NavigationService.navigate(history, 'search', {sort: name})}
                            />
                         </Route>
                    </div>
                    <div className="uk-width-expand@m">
                        <div className="cards-container uk-flex uk-flex-wrap uk-flex-middle uk-flex-center">
                        <List
                            scrollContainer={scrollContainer}
                            data={cardsData}
                            fetchError={fetchError}
                            isLoading={isLoading}
                            totalResults={totalResults}
                            cellRenderer={renderCard}
                            onPageEndReached={handleInfiniteScroll}
                        />
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