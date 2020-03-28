// React Core
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// Libs
import isEmpty from 'lodash/isEmpty';


const propTypes = {
    scrollContainer: PropTypes.object.isRequired,
    data: PropTypes.array,
    fetchError: PropTypes.object,
    pageSize: PropTypes.number,
    isLoading: PropTypes.bool,
    totalResults: PropTypes.number,
    cellRenderer: PropTypes.func,
    onPageEndReached: PropTypes.func,
};
const defaultProps = {
    data: [],
    fetchError: null,
    pageSize: 20,
    isLoading: true,
    totalResults: null,
    cellRenderer: () => {},
    headerRenderer: undefined,
    onPageEndReached: () => {},
};

// TODO back to top
const List = ({
                  data,
                  fetchError,
                  pageSize,
                  isLoading,
                  totalResults,
                  scrollContainer,
                  headerRenderer,
                  cellRenderer,
                  onPageEndReached,
              }) => {
    const [page, setPage] = useState(0);

    const memoizedHandleScroll = useCallback(
        () => handleScroll(isLoading, page, scrollContainer, onPageEndReached),
        [isLoading, page, scrollContainer, onPageEndReached],
    );

    //TODO TypeError: scrollContainer.current is null
    useEffect(() => {
        const scroller = scrollContainer.current;

        if (!!scroller) {
            scroller.addEventListener('scroll', memoizedHandleScroll)
        }
        return () => {
            if (!!scroller) scroller.removeEventListener('scroll', memoizedHandleScroll)
        }
    }, [scrollContainer, memoizedHandleScroll]);

    useEffect(() => {
        if (page === 0 && fetchError === null) {
            console.log('-> list * initial load');
            setPage(1);
            onPageEndReached(1)
        }
    }, [page, onPageEndReached]);

    useEffect(() => {
        const scroller = scrollContainer.current;
        if (page === 1 && data.length === 0 && scroller.scrollTop > 0) {
            console.log('-> list * top scroll');
            scroller.scrollTo(0, 0)
        }
    }, [data, page, scrollContainer]);

    useEffect(() => {
        if (!isLoading) {
            setPage((page) => data.length / pageSize | 0)
        }
    }, [isLoading, data, pageSize, setPage]);

    function handleScroll(isLoading, page, scrollContainer, onPageEndReached) {
        const scroller = scrollContainer.current;
        if (isLoading || !!fetchError) return;
        if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight) {
            onPageEndReached(page + 1)
        }
    }

    const listRenderer = data.map(cellRenderer);

    return (
        <>
            {
                <div className="uk-width-1-1" style={{ alignSelf: 'start' }}>
                 { headerRenderer() }
                </div>
            }
            {
                listRenderer
            }
            {
                isLoading &&
                <div className="uk-width-1-1" style={{ alignItems: 'center' }}>
                    <div className="uk-flex" uk-spinner="ratio: 2" style={{ color: 'white' }}/>
                </div>
            }
            {
                (totalResults === data.length && totalResults > 0) &&
                <p className="uk-text-large uk-text-bold uk-text-warning">
                    You have reached the end of feed
                    <span> &#129296;</span>
                </p>
            }
            {
                (isEmpty(data) && !isLoading) &&
                <p className="uk-text-lead" style={{ color: 'white' }}>
                    No cards were found 😔 ... 
                </p>
            }
            {
                //TODO add refresher
                !!fetchError &&
                <p className="uk-flex uk-text-lead" style={{ color: 'white' }}>
                    {fetchError.error}
                </p>
            }
        </>
    )
};

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;